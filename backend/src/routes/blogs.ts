import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
interface JWTPayload {
    id: string;
    // add other JWT payload fields if needed
}

export const blogRoute = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET : string
    }
    Variables:{
        userId:string
    }
}>();

blogRoute.use('/*', async(c, next) =>{
    console.log("Middleware")
    const jwt = c.req.header('Authorization');
    console.log("jwt",jwt)
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
    const payloadId = payload.id
    console.log("payload",payload)
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payloadId as string)
    await next();
   
})

blogRoute.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const userId = c.get("userId");
        
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        
        return c.json({
            id: post.id,
            title: body.title,
            content: body.content,
            
        }, 201);
    } catch (error) {
        console.error('Blog creation error:', error);
        return c.json({ error: 'Failed to create blog post' }, 500);
    }
})

blogRoute.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    
    const post = await prisma.post.update({
        where:{
            id : body.id
            
        },
        data:{
            title: body.title,
            content: body.content
           
        }
    })
    return c.json({
        id: post.id,
        title: body.title,
        content: body.content

    },201)  
})

// Todo :add pagination
blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const post = await prisma.post.findMany();

    return c.json({
        post
    },200)
})


blogRoute.get('/:id', async(c) => {
    const id =  c.req.param("id")
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    
    try{
        const post = await prisma.post.findFirst({
            where:{
                id : id
            },
        
        })
        return c.json({
           post
        })    
    } catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching the data"
        })
    }
})

// Todo :add pagination
blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const post = await prisma.post.findMany();

    return c.json({
        post
    },200)
})

