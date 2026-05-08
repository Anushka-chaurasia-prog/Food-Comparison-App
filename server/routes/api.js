import express from 'express';
import { restaurants } from '../data/mockData.js';

const router = express.Router();

// Get all restaurants (without full menu for lighter payload, though here we just return all)
router.get('/restaurants', (req, res) => {
  const restaurantList = restaurants.map(r => ({
    id: r.id,
    name: r.name,
    image: r.image,
    cuisine: r.cuisine,
    rating: r.rating,
  }));
  res.json(restaurantList);
});

// Get a single restaurant by ID (includes menu and platform fees)
router.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

export default router;
