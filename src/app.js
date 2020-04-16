const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// definição de path para o express config
const diretorioPublico = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setando os handlebars eng e as localizacoes da views
// mudando o default da view para a pasta templates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// setando diretorio estatico para o servidor
app.use(express.static(diretorioPublico))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Clima App',
        name: 'Thiago Santos'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Sobre mim',
        name: 'Thiago Santos'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Ajuda',
        helpText: 'Caso tenha algum problema por favor informar',
        name: 'Thiago Santos'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sol',
        latitude: 2323,
        longitude: -3434,
        location: 'Rio de Janeiro'
    }) 
})



app.listen(3000, ()=>{
    console.log('Server está no ar na porta 3000')
})