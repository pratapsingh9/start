import { Hono } from "hono";
import type { Context } from "hono";
const discussRouter = new Hono();

discussRouter.post('/')


discussRouter.post('/create',(c:Context)=> {
    return c.json({
        message:"create discuss"
    })
})