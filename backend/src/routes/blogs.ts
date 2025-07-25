import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@krrish_5/medium-common";
import { z } from 'zod'
import { zValidator } from "@hono/zod-validator";
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

const BlogSchema = z.object({
  content: z.string()
})


blogRoute.use('/*', async(c, next) =>{

    const jwt = c.req.header('Authorization');
   
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
    const payloadId = payload.id
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payloadId as string)
    await next();
   
})

blogRoute.post('/', zValidator('json', BlogSchema), async (c) => {
    try {
        const {content} = await c.req.json();
        console.log("insdie post")
        console.log("contetnbackend",content)
      
     if (!content || content.trim().length === 0) {
        c.status(400);
        return c.json({ message: "Content cannot be empty" });
        }
        const userId = c.get("userId");

        const titleMatch = content.match(/<h1.*?>(.*?)<\/h1>/i)
        console.log('titleMatch', titleMatch)
        const title = titleMatch ? titleMatch[1] : 'Untitled Post'
        console.log(title,"title")

        
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const post = await prisma.post.create({
            data: {
                
                title: title,
                content: content,
                authorId: userId,
            
            }
        });

        
        return c.json({
            id: post.id,
            title: title,
            content:content,
            
        }, 201);
    } catch (error) {
        console.error('Blog creation error:', error);
        return c.json({ error: 'Failed to create blog post' }, 500);
    }
})

blogRoute.put('/', async (c) => {
    const body = await c.req.json();
    const updateBlog =  updateBlogInput.safeParse(body)
    if(!updateBlog.success){
        c.status(411)
        return c.json({
            "message":"Invalid input fields"
        })
    }
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

    const blogs = await prisma.post.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            },
            updatedAt:true
        }
    });

    return c.json({
        blogs
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
                id : String(id)
                
            },
            select:{
                id: true,
                title:true,
                content :true,
                author:{
                    select:{
                        name:true
                    }
                },
                updatedAt:true
            }
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

