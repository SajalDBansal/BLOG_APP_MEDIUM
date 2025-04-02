import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()

app.get('/', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate())
  return c.text('Root directory of Blog app')
})

app.post('/api/v1/user/signup', (c) => {
  return c.text('Signup endpoint')
})

app.post('/api/v1/user/signin', (c) => {
  return c.text('Signin endpoint')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Create blog post')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Update blog post')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Get single blog post')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Get multiple blog posts')
})


export default app
