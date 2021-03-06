const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title:'Weather',
        name: 'Kais'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About',
        name: 'Kais'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title:'Help',
        name: 'Kais'
    })
})
    
app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const data = geocode(req.query.address,(error, {latitude, longitude, location} = {}) =>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) =>
        {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'404',
        name: 'Kais',
        errorMessage:'404 - Help article is not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title:'404',
        name: 'Kais',
        errorMessage:'404 - Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up and running on port '+ port)
})