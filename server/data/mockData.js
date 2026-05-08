const restaurants = [
  {
    id: "r1",
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "American, Fast Food",
    rating: 4.2,
    platforms: {
      zomato: { deliveryFee: 40, platformFee: 10, eta: "30 mins", rating: 4.2 },
      swiggy: { deliveryFee: 55, platformFee: 8, eta: "25 mins", rating: 4.4 }
    },
    menu: [
      { id: "m1", name: "Whopper", description: "Signature flame-grilled beef patty topped with tomatoes, lettuce, mayo, ketchup, pickles, and sliced white onions.", price: 220, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: "m2", name: "Crispy Chicken", description: "Crispy chicken patty with lettuce and mayo in a sesame seed bun.", price: 150, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: "m3", name: "French Fries (M)", description: "Medium serving of classic crispy fries.", price: 90, image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  },
  {
    id: "r2",
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    cuisine: "Italian, Fast Food",
    rating: 4.5,
    platforms: {
      zomato: { deliveryFee: 60, platformFee: 15, eta: "40 mins", rating: 4.5 },
      swiggy: { deliveryFee: 30, platformFee: 12, eta: "35 mins", rating: 4.6 }
    },
    menu: [
      { id: "m4", name: "Margherita", description: "Classic delight with 100% real mozzarella cheese.", price: 250, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: "m5", name: "Farmhouse", description: "Delightful combination of onion, capsicum, tomato & grilled mushroom.", price: 400, image: "https://images.unsplash.com/photo-1604381538346-646e7f86f8ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: "m6", name: "Garlic Breadsticks", description: "Freshly baked garlic bread with cheese dip.", price: 120, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  },
  {
    id: "r3",
    name: "KFC",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // Using chicken image
    cuisine: "American, Fast Food",
    rating: 4.1,
    platforms: {
      zomato: { deliveryFee: 50, platformFee: 8, eta: "35 mins", rating: 4.1 },
      swiggy: { deliveryFee: 65, platformFee: 15, eta: "30 mins", rating: 4.0 }
    },
    menu: [
      { id: "m7", name: "Zinger Burger", description: "Signature chicken burger with a crispy fillet, fresh lettuce and creamy mayo.", price: 180, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: "m8", name: "Hot & Crispy Chicken", description: "2 pieces of signature hot and crispy chicken.", price: 230, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
    ]
  }
];

export { restaurants };
