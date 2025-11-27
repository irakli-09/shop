export interface Env {
  DB: D1Database;
  ADMIN_ENCRYPTED_YWID: string;
}

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

async function parseJson<T = any>(req: Request): Promise<T> {
  try {
    return await req.json();
  } catch {
    return {} as T;
  }
}

function getUserId(req: Request) {
  return req.headers.get('X-Encrypted-Yw-ID') || 'anonymous';
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === 'GET' && url.pathname === '/health') {
      return json({ ok: true });
    }

    // Presign upload for R2
    if (req.method === 'POST' && url.pathname === '/api/upload/presign') {
      const body = await parseJson<{ filename?: string; contentType?: string }>(req);
      const userId = getUserId(req);
      const filename = body.filename || 'upload.png';
      const key = `uploads/${userId}/${Date.now()}-${filename}`;
      const contentType = body.contentType || 'image/png';

      const presignRes = await fetch('https://storage.youware.me/presign/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, contentType })
      });

      if (!presignRes.ok) {
        return json({ error: 'presign_failed' }, { status: 500 });
      }
      const presign = await presignRes.json();
      return json({ ...presign, file_key: key });
    }

    // Presign download for R2
    if (req.method === 'POST' && url.pathname === '/api/download-url') {
      const body = await parseJson<{ key: string }>(req);
      const presignRes = await fetch('https://storage.youware.me/presign/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: body.key })
      });
      if (!presignRes.ok) {
        return json({ error: 'download_presign_failed' }, { status: 500 });
      }
      const presign = await presignRes.json();
      return json(presign);
    }

    // Submit form data
    if (req.method === 'POST' && url.pathname === '/api/submit') {
      const body = await parseJson<{
        name: string;
        email: string;
        title: string;
        description: string;
        image_keys: string[];
      }>(req);

      const createdAt = new Date().toISOString();
      const stmt = env.DB.prepare(
        'INSERT INTO submissions (name, email, title, description, image_keys, created_at) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        body.name || '',
        body.email || '',
        body.title || '',
        body.description || '',
        JSON.stringify(body.image_keys || []),
        createdAt
      );

      try {
        await stmt.run();
      } catch (e: any) {
        return json({ error: e.message || 'db_error' }, { status: 500 });
      }

      return json({ ok: true });
    }

    // Admin: list submissions
    if (req.method === 'GET' && url.pathname === '/api/submissions') {
      const encId = getUserId(req);
      if (encId !== env.ADMIN_ENCRYPTED_YWID) {
        return json({ error: 'forbidden' }, { status: 403 });
      }
      const { results } = await env.DB.prepare('SELECT * FROM submissions ORDER BY id DESC').all();
      return json({ data: results });
    }

    // Admin: approve with price
    if (req.method === 'POST' && url.pathname === '/api/submissions/approve') {
      const encId = getUserId(req);
      if (encId !== env.ADMIN_ENCRYPTED_YWID) {
        return json({ error: 'forbidden' }, { status: 403 });
      }
      const body = await parseJson<{ id: number; price: number }>(req);
      const stmt = env.DB.prepare('UPDATE submissions SET status = ?, approved_price = ? WHERE id = ?')
        .bind('approved', body.price, body.id);
      try {
        await stmt.run();
        return json({ ok: true });
      } catch (e: any) {
        return json({ error: e.message || 'db_error' }, { status: 500 });
      }
    }

    return json({ error: 'not_found' }, { status: 404 });
  }
};
