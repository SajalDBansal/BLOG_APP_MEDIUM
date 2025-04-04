import { Hono } from 'hono'
import { blogRouter } from './routes/blog';
import { userRouter } from './routes/user';
import { cors } from 'hono/cors';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

app.use(cors());

app.get('/', (c) => {
  return c.text('Root directory of blog-app-medium backend server')
})

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app