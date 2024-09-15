import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { roomRoutes } from './routes/rooms';
import { hotelRoutes } from './routes/hotels';
import { userRoutes } from './routes/users';
import { branchesRoutes } from './routes/branches';
import { bookingsRoutes } from './routes/bookings';
import { dashboardRoutes } from './routes/dashboard';




type Bindings = {
  DB: D1Database;
  hms: KVNamespace
};

// Initialize Hono app with Cloudflare environment bindings
const app = new Hono<{ Bindings: Bindings }>();
app.use(
  '*',
  cors({
    origin: '*',
    allowHeaders: ['*'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
)
// Define routes
app.route('/rooms', roomRoutes);
app.route('/hotels', hotelRoutes);
app.route('/users', userRoutes);
app.route('/branches', branchesRoutes);
app.route('/bookings', bookingsRoutes);
app.route('/dashboard', dashboardRoutes);




export default {
  fetch: app.fetch.bind(app)
};
