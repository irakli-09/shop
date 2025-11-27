import { models } from '../data/models';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const Home = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
          Curated 3D Models
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
          High-quality, optimized assets for your architectural visualization and game development needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {models.map((model) => (
          <div key={model.id} className="group relative">
            <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden relative">
              <img 
                src={model.image} 
                alt={model.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              
              {/* Basket Button Overlay */}
              <button
                onClick={() => addItem(model)}
                className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
                title="Add to Basket"
              >
                <ShoppingBag size={20} />
              </button>
            </div>
            
            <div className="flex justify-between items-center px-1">
              {/* Removed Title and Description as requested */}
              <span className="text-lg font-medium">
                {model.price.toFixed(2)} GEL
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-light mb-6">Are you a 3D Artist?</h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Join our curated marketplace. Submit your best work for review and reach a global audience of architects and designers.
        </p>
        <Link to="/submit" className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors">
          Submit Your Model
        </Link>
      </div>
    </div>
  );
};
