const express = require('express')
const planRoutes = require('./src/plans/routes')
const requestDetailRoutes = require('./src/requestdetails/routes')
const requestRoutes = require('./src/requests/routes')
const userRoutes = require('./src/users/routes')
const app = express()
const port = 3000
const cors = require('cors');

app.use(express.json())
app.use(cors());


app.get("/", (req,res) => {
    res.send('hello world')
})

app.use('/api/v1/plans', planRoutes)

app.use('/api/v1/requestdetails', requestDetailRoutes)

app.use('/api/v1/requests', requestRoutes)

app.use('/api/v1/users', userRoutes)

app.listen(port, () => console.log(`app listening on port ${port}`))