import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from '@sajaldbansal/medium-module';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "Signup inputs are incorrect" });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ error: "Signin inputs are incorrect" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });

    } catch (error) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})

userRouter.post('/insert', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const users = [];
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

        for (let i = 0; i < 5; i++) {
            const user = await prisma.user.create({
                data: {
                    email: `user${i}@example.com`,
                    password: 'password123',
                    name: names[i]
                }
            });
            users.push(user);
        }

        return c.json({
            message: "Bulk users created successfully",
            count: users.length,
            users: users.map(u => ({ id: u.id, email: u.email, name: u.name }))
        });

    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while creating bulk users" });
    }
})