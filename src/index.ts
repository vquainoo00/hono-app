import { Hono } from 'hono';
import { roomRoutes } from './routes/rooms';
import { hotelRoutes } from './routes/hotels';



// Define the types for Cloudflare environment bindings
type Bindings = {
  DB: D1Database;
};

// Initialize Hono app with Cloudflare environment bindings
const app = new Hono<{ Bindings: Bindings }>();

// Define routes
app.route('/rooms', roomRoutes);
app.route('/hotels', hotelRoutes);

// Export the app for Cloudflare Workers
export default {
  fetch: app.fetch.bind(app)
};
