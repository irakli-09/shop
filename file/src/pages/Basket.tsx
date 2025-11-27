import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export const Basket = () => {
  const { items, removeItem, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-light mb-6">Your Basket is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any models yet.</p>
        <Button to="/" variant="primary">
          Browse Models
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-light mb-12">Shopping Basket</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-gray-100 pb-8">
              <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow flex justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <span className="text-lg font-medium">{(item.price * item.quantity).toFixed(2)} GEL</span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 sticky top-24">
            <h2 className="text-xl font-medium mb-6">Summary</h2>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span>{total().toFixed(2)} GEL</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between mb-8 text-lg font-medium">
              <span>Total</span>
              <span>{total().toFixed(2)} GEL</span>
            </div>
            <Button className="w-full">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
