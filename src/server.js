import express from "express"
import cors from "cors"
import { routes } from "./routes.js"


const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)


app.get('/', (req, res) => {
    res.send('connected')
})

app.get('/estoque', (req, res) => {
    res.send("")
})


app.listen(8800, () => {
    console.log("Connection successful on port 8800")
})