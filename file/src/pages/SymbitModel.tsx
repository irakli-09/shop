import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Link } from 'react-router-dom';

export const SubmitModel = () => {
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length > 3) {
        alert('You can only upload up to 3 images');
        return;
      }
      setImages([...images, ...newImages]);
    }
  };

  async function presignAndUpload(file: File): Promise<string> {
    // Request presigned upload URL from backend
    const presignRes = await fetch('https://backend.youware.com/api/upload/presign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, contentType: file.type })
    });

    if (!presignRes.ok) {
      throw new Error('Failed to get upload URL');
    }

    const presignData = await presignRes.json();
    const uploadUrl: string = presignData.url || presignData.upload_url;
    const requiredHeaders: Record<string, string> = presignData.requiredHeaders || {};

    // MUST include requiredHeaders exactly; add Content-Type only if not provided
    const headers: Record<string, string> = { ...requiredHeaders };
    if (!('Content-Type' in headers)) {
      headers['Content-Type'] = file.type;
    }

    const putRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers,
      body: file,
    });

    if (!putRes.ok) {
      throw new Error('Upload failed');
    }

    // Return stored file key (path) to save in DB
    const fileKey: string = presignData.file_key || presignData.key;
    return fileKey;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const title = String(formData.get('title') || '');
    const description = String(formData.get('description') || '');

    try {
      setLoading(true);
      // Upload images first
      const imageKeys: string[] = [];
      for (const file of images) {
        const key = await presignAndUpload(file);
        imageKeys.push(key);
      }

      // Submit form payload to backend
      const submitRes = await fetch('https://backend.youware.com/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, title, description, image_keys: imageKeys })
      });

      if (!submitRes.ok) {
        const msg = await submitRes.text();
        throw new Error(msg || 'Submit failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      alert('Submission failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-light mb-6">Thank You</h1>
        <p className="text-gray-500 text-lg mb-12">
          Your submission has been received. We will review your model and get back to you shortly via email.
        </p>
        <Button to="/" variant="outline">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-light mb-4">Submit Your Model</h1>
        <p className="text-gray-500">
          Share your creation with us. Please provide details and up to 3 high-quality images.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            name="name"
            label="Full Name" 
            placeholder="John Doe" 
            required 
          />
          <Input 
            name="email"
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            required 
          />
        </div>

        <Input 
          name="title"
          label="Model Title" 
          placeholder="e.g. Modern Lounge Chair" 
          required 
        />

        <Textarea 
          name="description"
          label="Description" 
          placeholder="Tell us about your model, technical details, poly count, etc." 
          required 
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images (Max 3)
          </label>
          <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-black transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={images.length >= 3 || loading}
            />
            <div className="space-y-2">
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </div>
          </div>
          
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-gray-100">
                  <img 
                    src={URL.createObjectURL(img)} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                    disabled={loading}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full md:w-auto" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Model'}
          </Button>
        </div>
      </form>
    </div>
  );
};
