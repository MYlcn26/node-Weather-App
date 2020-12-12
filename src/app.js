const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //heroku port || local port
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locaation
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Metehan',
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Metehan',
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Metehan',
        message:'This is the help message... '
    })
})

app.get('/weather',(req,res) =>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }

geocode(req.query.address, (error,{ lattitude, longitude, location} = {})=>{
    if (error){
        return res.send({ error })
    }

    forecast(location, (error, forecastData) => {
        if (error){
            return res.send({error})
        }
        
        res.send({
            forecast : forecastData,
            location,
            coordinates : 'Long='+longitude+' Lat=' + lattitude,
            address : req.query.address
        })
        })
    })


})
/*
app.get('/products',(req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        produtcs : []
    })
})
*/
app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title: 'Help Error',
        errorMessage : 'Help article not found'
    })
})
app.get('*',(req,res) =>{
    res.render('404error',{
        title: '404',
        errorMessage : '404  not found'
    })
})
/*
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})*/

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})