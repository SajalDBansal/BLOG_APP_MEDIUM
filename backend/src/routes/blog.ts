import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
    if (!jwt.length) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
        c.status(403);
        return c.json({ error: "unauthorized, not logged in" });
    }
    c.set('userId', payload.id as string);
    await next();
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId");

    const body = await c.req.json();
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })

        return c.json({
            id: post.id
        })

    } catch (error) {
        c.status(403);
        return c.json({ error: "error while creating post" });
    }
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.text('updated post');

    } catch (error) {
        c.status(411);
        return c.json({ error: "Error while updating post" })
    }

})

// Todo : Add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        email: true,
                        id: true
                    }
                }
            }
        });
        return c.json(posts);

    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching all posts" });
    }
})

blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param("id");

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })

        return c.json(post);

    } catch (error) {
        c.status(401);
        return c.json({ error: "Error while finding post" })
    }

})

blogRouter.post('/insert', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = [];
        const titles = ['First Post', 'Hello World', 'My Journey', 'Tech Talk', 'Random Thoughts'];
        const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
        const userId = c.get("userId");

        for (let i = 0; i < 5; i++) {
            const post = await prisma.post.create({
                data: {
                    title: titles[i],
                    content: content,
                    authorId: userId,
                    published: true
                }
            });
            posts.push(post);
        }

        return c.json({
            message: "Bulk posts created successfully",
            count: posts.length,
            posts: posts.map(p => ({
                id: p.id,
                title: p.title,
                published: p.published
            }))
        });

    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while creating bulk posts" });
    }
})
