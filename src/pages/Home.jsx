import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching restaurants:", err);
        setLoading(false);
      });
  }, []);

  const filtered = restaurants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-surface)]">
          Find the <span className="text-green-800">Cheaper</span> Bite.
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto font-medium">
          Compare total cart prices between Zomato and Swiggy before you order. Save money on every meal.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full bg-[var(--color-surface)] border border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 text-[var(--color-text-inverse)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all shadow-xl"
          placeholder="Search for restaurants or cuisines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-800" /> 
          Popular Near You
        </h2>
        
        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-[var(--color-surface)] animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map(restaurant => (
              <Link 
                key={restaurant.id} 
                to={`/restaurant/${restaurant.id}`}
                className="group flex gap-4 bg-[var(--color-surface)] text-[var(--color-text-inverse)] p-4 rounded-2xl hover:bg-[var(--color-surface-hover)] border border-transparent transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1 py-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">{restaurant.name}</h3>
                    <p className="text-sm text-[var(--color-text-inverse-secondary)]">{restaurant.cuisine}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
