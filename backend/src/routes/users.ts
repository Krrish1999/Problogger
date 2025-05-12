import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@krrish_5/medium-common'


export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET : string
    }
}>();

userRouter.post('/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
        const body = await c.req.json()
        const signup =  signupInput.safeParse(body)
        if(!signup.success){
            c.status(411)
            return c.json({
                "message":"Invalid creds not matching with input fields"
            })
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            }
        });
        // Generate JWT token
        const payload = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
        }

        const token = await sign(payload, c.env.JWT_SECRET)

        return c.json({ 
            message: 'User created successfully',
            jwt: token
        }, 201)
    } catch(e) {
      return c.json({
        message: "User already exists"
       }, 400)
    }

})

userRouter.post('/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await  c.req.json()
  const signin =  signinInput.safeParse(body)
  if(!signin.success){
        c.status(411)
        return c.json({
            "message":"Invalid email format"
        })
    }

  const user = await prisma.user.findFirst({
    where: {
      email: body.email
    }

  });

  if (!user) {
    return c.json({ error: "User does not exist" }, 400)
 
  }
  const isPasswordValid = user.password === body.password
  if (!isPasswordValid) {
    return c.json({ error: "Invalid password" }, 400)
  }
  const payload = {
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
  }

  const token = await sign(payload, c.env.JWT_SECRET)
    return c.json({ 
    message: 'User Signin successfully',
    jwt: token
   },201)
 
})
