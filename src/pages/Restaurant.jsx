import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ArrowLeft, Plus, Minus, ShoppingBag, Info } from 'lucide-react';

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { items, addItem, removeItem, setRestaurant: setStoreRestaurant, getCartTotal } = useCartStore();

  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching restaurant:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddItem = (item) => {
    if (items.length === 0) {
      setStoreRestaurant(restaurant.id, restaurant.platforms);
    }
    addItem(item);
  };

  const getItemQuantity = (itemId) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-48 bg-[var(--color-surface)] rounded-2xl"></div>
    <div className="h-8 w-1/3 bg-[var(--color-surface)] rounded"></div>
  </div>;

  if (!restaurant) return <div>Restaurant not found</div>;

  const cartTotal = getCartTotal();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-green-900 transition-colors font-medium"
      >
        <ArrowLeft size={16} /> Back to search
      </button>

      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">{restaurant.name}</h1>
          <p className="text-gray-200 mt-1">{restaurant.cuisine}</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="text-2xl font-bold border-b border-green-800/20 pb-2">Menu</h2>
        <div className="grid gap-4">
          {restaurant.menu.map(item => {
            const quantity = getItemQuantity(item.id);
            return (
              <div key={item.id} className="flex gap-4 p-4 bg-[var(--color-surface)] text-[var(--color-text-inverse)] rounded-2xl border border-transparent shadow-md">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="font-semibold text-green-400">₹{item.price}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-inverse-secondary)] line-clamp-2">{item.description}</p>
                  
                  <div className="pt-2">
                    {quantity === 0 ? (
                      <button 
                        onClick={() => handleAddItem(item)}
                        className="px-4 py-1.5 rounded-lg bg-green-500/20 text-green-400 font-medium hover:bg-green-500/30 transition-colors border border-green-500/30 text-sm"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-[var(--color-background)] text-[var(--color-text-primary)] w-fit rounded-lg border border-transparent p-1">
                        <button onClick={() => removeItem(item.id)} className="p-1 hover:text-green-700 transition-colors"><Minus size={16} /></button>
                        <span className="font-medium w-4 text-center">{quantity}</span>
                        <button onClick={() => handleAddItem(item)} className="p-1 hover:text-green-700 transition-colors"><Plus size={16} /></button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-transparent shadow-[0_-10px_30px_rgba(0,0,0,0.2)] z-50 transition-transform text-[var(--color-text-inverse)]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-[var(--color-text-inverse-secondary)]">{totalItems} item{totalItems > 1 ? 's' : ''} added</span>
              <span className="font-bold text-xl">₹{cartTotal} <span className="text-xs font-normal text-[var(--color-text-inverse-secondary)]">+ fees</span></span>
            </div>
            <Link 
              to="/compare" 
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Compare Prices <ShoppingBag size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
