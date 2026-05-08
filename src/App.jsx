import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Comparison from './pages/Comparison';
import { ChefHat } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] flex flex-col">
        <header className="sticky top-0 z-50 bg-[var(--color-surface)] text-[var(--color-text-inverse)] shadow-lg">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-700 rounded-xl">
                <ChefHat size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Crave<span className="text-green-400">Compare</span></span>
            </Link>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/compare" element={<Comparison />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
