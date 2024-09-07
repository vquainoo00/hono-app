import { Hono } from 'hono';
import { roomRoutes } from './routes/rooms';
import { hotelRoutes } from './routes/hotels';
import { userRoutes } from './routes/users';
import { branchesRoutes } from './routes/branches';
import { bookingsRoutes } from './routes/bookings';



type Bindings = {
  DB: D1Database;
  hms: KVNamespace
};

// Initialize Hono app with Cloudflare environment bindings
const app = new Hono<{ Bindings: Bindings }>();

// Define routes
app.route('/rooms', roomRoutes);
app.route('/hotels', hotelRoutes);
app.route('/users', userRoutes);
app.route('/branches', branchesRoutes);
app.route('/bookings', bookingsRoutes);



export default {
  fetch: app.fetch.bind(app)
};
