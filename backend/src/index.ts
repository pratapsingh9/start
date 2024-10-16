// src/index.ts
import { Hono } from 'hono'

const app = new Hono()
app.get('/',(c) => {
  return c.json({
    status:"Working"
  },200)
})
// Route to handle code execution
app.post('/execute', async (c) => {
  try {
    const { code } = await c.req.json()

    // Execute the received JavaScript code
    let result = ''
    const originalConsoleLog = console.log
    console.log = (msg) => {
      result += msg + '\n'
    }
    eval(code)

    console.log = originalConsoleLog

    return c.json({ output: result })
  } catch (err:any) {
    return c.json({ error: 'Error executing code', details: err.message }, 500)
  }
})

export default app
