const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const path = require('path')
const productRouter = require('./routers/products')
const billRouter = require('./routers/bills')
const recordRouter = require('./routers/records')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

/////ROUTERS
app.get('', (req, res) => {
    res.render('index', {
        title: 'Register'
    })
})
app.use(productRouter)
app.use(billRouter)
//app.use(recordRouter)
//app.user(statisticsRouter)
//App.use(aboutRouter)
//app.use(helpRouter)

/////
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})