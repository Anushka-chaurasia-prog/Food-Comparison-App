import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ArrowLeft, CheckCircle2, Clock, Star, ExternalLink, Plus, Minus } from 'lucide-react';

export default function Comparison() {
  const navigate = useNavigate();
  const { items, platforms, getCartTotal, addItem, removeItem } = useCartStore();

  if (items.length === 0 || !platforms) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-green-700 font-medium hover:underline">
          Go back to search
        </button>
      </div>
    );
  }

  const itemTotal = getCartTotal();

  const zomatoTotal = itemTotal + platforms.zomato.deliveryFee + platforms.zomato.platformFee;
  const swiggyTotal = itemTotal + platforms.swiggy.deliveryFee + platforms.swiggy.platformFee;

  const isZomatoCheaper = zomatoTotal <= swiggyTotal;
  const isSwiggyCheaper = swiggyTotal <= zomatoTotal;
  
  const difference = Math.abs(zomatoTotal - swiggyTotal);

  const PlatformCard = ({ name, data, total, isCheaper, colorClass, bgClass, buttonClass, link }) => (
    <div className={`relative p-6 rounded-3xl border-2 transition-all duration-300 ${isCheaper ? `border-${colorClass} shadow-[0_0_30px_rgba(0,0,0,0.3)] shadow-${colorClass}/20 bg-[var(--color-surface)]` : 'border-transparent bg-[var(--color-surface)] opacity-90 scale-95'}`}>
      {isCheaper && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${bgClass} text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg`}>
          <CheckCircle2 size={16} /> CHEAPEST
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6 mt-2">
        <h3 className={`text-2xl font-black ${isCheaper ? 'text-white' : 'text-[var(--color-text-inverse-secondary)]'}`}>{name}</h3>
        <div className="flex items-center gap-3 text-sm text-[var(--color-text-inverse-secondary)]">
          <span className="flex items-center gap-1"><Clock size={14} /> {data.eta}</span>
          <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {data.rating}</span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-[var(--color-text-inverse-secondary)]">
          <span>Item Total</span>
          <span>₹{itemTotal}</span>
        </div>
        <div className="flex justify-between text-[var(--color-text-inverse-secondary)]">
          <span>Delivery Fee</span>
          <span>₹{data.deliveryFee}</span>
        </div>
        <div className="flex justify-between text-[var(--color-text-inverse-secondary)]">
          <span>Platform Fee</span>
          <span>₹{data.platformFee}</span>
        </div>
        <div className="pt-3 border-t border-gray-700/50 flex justify-between items-end">
          <span className="font-semibold text-gray-300">Final Total</span>
          <span className={`text-3xl font-black ${isCheaper ? `text-${colorClass}` : 'text-white'}`}>₹{total}</span>
        </div>
      </div>

      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCheaper ? buttonClass : 'bg-[var(--color-surface-hover)] text-[var(--color-text-inverse-secondary)] hover:text-white'}`}
      >
        Order on {name} <ExternalLink size={18} />
      </a>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-green-900 transition-colors font-medium"
        >
          <ArrowLeft size={16} /> Back to menu
        </button>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold">Price Comparison</h1>
        <p className="text-[var(--color-text-secondary)]">
          You save <span className="text-green-800 font-black">₹{difference}</span> by choosing the cheaper option.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
        <PlatformCard 
          name="Zomato" 
          data={platforms.zomato} 
          total={zomatoTotal} 
          isCheaper={isZomatoCheaper}
          colorClass="red-500"
          bgClass="bg-red-500"
          buttonClass="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 hover:scale-105"
          link="https://www.zomato.com/"
        />
        <PlatformCard 
          name="Swiggy" 
          data={platforms.swiggy} 
          total={swiggyTotal} 
          isCheaper={isSwiggyCheaper}
          colorClass="orange-500"
          bgClass="bg-orange-500"
          buttonClass="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:scale-105"
          link="https://www.swiggy.com/"
        />
      </div>
      
      <div className="max-w-3xl mx-auto bg-[var(--color-surface)] text-[var(--color-text-inverse)] rounded-2xl p-6 shadow-lg mt-8">
         <h3 className="font-bold mb-4">Cart Items</h3>
         <div className="space-y-3">
           {items.map(item => (
             <div key={item.id} className="flex justify-between items-center text-sm bg-[var(--color-surface-hover)] p-3 rounded-xl">
               <div className="flex gap-3 items-center">
                 <div className="flex items-center gap-2 bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-lg p-0.5 shadow-sm">
                   <button onClick={() => removeItem(item.id)} className="p-1 hover:text-green-700 transition-colors rounded-md hover:bg-green-100"><Minus size={14} /></button>
                   <span className="font-medium w-4 text-center text-xs">{item.quantity}</span>
                   <button onClick={() => addItem(item)} className="p-1 hover:text-green-700 transition-colors rounded-md hover:bg-green-100"><Plus size={14} /></button>
                 </div>
                 <span className="font-medium">{item.name}</span>
               </div>
               <span className="font-bold">₹{item.price * item.quantity}</span>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
