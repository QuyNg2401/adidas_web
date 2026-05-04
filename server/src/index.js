import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import { apiRouter } from './routes/index.js'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/api', apiRouter)

const port = Number(process.env.PORT ?? 4000)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${port}`)
})

