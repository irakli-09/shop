import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';

interface SubmissionItem {
  id: number;
  name: string;
  email: string;
  title: string;
  description: string;
  image_keys: string; // JSON array
  status: string;
  approved_price?: number | null;
}

export const AdminSubmissions = () => {
  const [items, setItems] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://backend.youware.com/api/submissions');
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        const data = await res.json();
        setItems(data.data || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function getImageUrl(key: string) {
    const res = await fetch('https://backend.youware.com/api/download-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    const data = await res.json();
    return data.url as string;
  }

  async function approve(id: number, price: number) {
    const res = await fetch('https://backend.youware.com/api/submissions/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, price })
    });
    if (!res.ok) {
      alert('Approve failed');
      return;
    }
    setItems(items.map(i => i.id === id ? { ...i, status: 'approved', approved_price: price } : i));
  }

  if (loading) return <div className="max-w-7xl mx-auto px-6 py-12">Loading...</div>;
  if (error) return <div className="max-w-7xl mx-auto px-6 py-12">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-light mb-8">Admin Submissions</h1>
      <div className="space-y-8">
        {items.map(item => {
          const keys = (() => { try { return JSON.parse(item.image_keys || '[]'); } catch { return []; } })() as string[];
          return (
            <div key={item.id} className="border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-500 mb-2">{item.description}</p>
                  <p className="text-sm text-gray-400 mb-4">By: {item.name} · {item.email}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {keys.map((key, idx) => (
                      <AdminImage key={idx} fileKey={key} />
                    ))}
                  </div>
                </div>
                <div className="md:col-span-1">
                  <p className="mb-2">Status: {item.status}</p>
                  <p className="mb-4">Approved Price: {item.approved_price ?? '-'} GEL</p>
                  <ApproveForm onApprove={(price) => approve(item.id, price)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function ApproveForm({ onApprove }: { onApprove: (price: number) => void }) {
  const [price, setPrice] = useState('');
  return (
    <div className="space-y-3">
      <input
        type="number"
        step="0.01"
        placeholder="Set price in GEL"
        className="w-full border border-gray-300 px-3 py-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button onClick={() => onApprove(Number(price) || 0)}>
        Approve
      </Button>
    </div>
  );
}

function AdminImage({ fileKey }: { fileKey: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://backend.youware.com/api/download-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: fileKey })
        });
        const data = await res.json();
        setUrl(data.url);
      } catch (e) {
        console.error('Failed to load image url', e);
      }
    })();
  }, [fileKey]);

  if (!url) return <div className="aspect-square bg-gray-100" />;
  return <img src={url} alt="submission" className="w-full h-full object-cover" />;
}
