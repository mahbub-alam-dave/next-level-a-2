import express, { Request, Response } from 'express'
import config from "./config/config.js"
import initDB from './config/db.js'

const app = express()
const port = config.port
app.use(express.json())

// initializing db
initDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
