const express = require("express")
const dotenv = require('dotenv')
const app = express()
const logger = require('morgan'); 
const PORT = process.env.PORT || 3000
var cors = require('cors')


app.use(cors())
app.use(express.json()) // deal with json data
app.use(express.urlencoded({ extended: true }))
dotenv.config();
app.use(logger('dev'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});


app.get('/', (req, res) => {
    res.send('<h1>Front Page</h1>');
});

/**
 * @author Mohammed Sinan
 * @commect Used to route's
 */

const userRoutes = require('./app/routers/user.router')

app.use("/User", userRoutes)
 

app.listen(PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})
