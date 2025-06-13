import { Hono } from 'hono'
import { userRouter } from './routes/users'
import { blogRoute } from './routes/blogs'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: string,

  }
}>()

app.use('/*',cors())
app.route('/api/v1/user', userRouter)

app.route('/api/v1/blog', blogRoute)


export default app
