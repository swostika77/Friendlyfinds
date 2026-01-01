# Friendly Finds - Database Documentation

## Setup
1. Install dependencies: `npm install mongoose bcrypt dotenv`
2. Create `.env` file with: `MONGODB_URI=your_connection_string`
3. Import and connect: 
```javascript
const connectDB = require('./db');
connectDB();
```

## Collections

### 1. Users
- email (unique)
- password (hashed)
- createdAt

### 2. Products
- title, description, price
- category: 'stationary' | 'furniture'
- condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor'
- images (array of URLs)
- sellerId (reference to User)
- status: 'pending' | 'approved' | 'rejected' | 'sold'
- createdAt

### 3. Orders
- buyerId (reference to User)
- sellerId (reference to User)
- productId (reference to Product)
- price
- status: 'completed' | 'cancelled' | 'pending'
- orderDate

---

## Available Functions

### Authentication (auth.js)
```javascript
const { signup, login } = require('./auth');

// Signup
await signup(email, password);

// Login
await login(email, password);
```

### Products (productFunctions.js)
```javascript
const { 
  addProduct, 
  getProductsByStatus, 
  getProductsByCategory,
  approveProduct,
  rejectProduct,
  getProductsBySeller,
  markProductAsSold 
} = require('./productFunctions');

// Add product (user wants to sell)
await addProduct(title, description, price, category, condition, images, sellerId);

// Get products by status (for admin or browsing)
await getProductsByStatus('pending');  // pending | approved | rejected | sold

// Get products by category
await getProductsByCategory('furniture', 'approved');

// Admin approve product
await approveProduct(productId);

// Admin reject product
await rejectProduct(productId);

// Get seller's products
await getProductsBySeller(sellerId);

// Mark as sold
await markProductAsSold(productId);
```

### Orders (orderFunctions.js)
```javascript
const { 
  createOrder, 
  getPurchaseHistory, 
  getSellingHistory,
  cancelOrder 
} = require('./orderFunctions');

// Create order (when someone buys)
await createOrder(buyerId, sellerId, productId, price);

// Get what user bought
await getPurchaseHistory(buyerId);

// Get what user sold
await getSellingHistory(sellerId);

// Cancel order
await cancelOrder(orderId);
```

---

## For Backend Developer

Use these functions in your API endpoints. Example:
```javascript
// In your Express routes
app.post('/api/products', async (req, res) => {
  const { title, description, price, category, condition, images, sellerId } = req.body;
  const result = await addProduct(title, description, price, category, condition, images, sellerId);
  res.json(result);
});
```

All functions return objects with:
- `success`: true/false
- `message`: description
- `data`: the actual data (user, product, order, etc.)

---

## Testing
Run `node testProducts.js` to test all functionality.