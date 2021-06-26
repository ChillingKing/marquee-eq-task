// Imports
const express = require('express')
const mongoose = require('mongoose')
const Company = require('./models/companyModel')
const app = express()
app.use(express.json())

// Mongoose Config
const db = 'mongodb://localhost/marquee-equity-assignment'
mongoose
    .connect(
        db, {
            useNewUrlParser: true,
            useCreateIndex: true,
        }
    )
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))

// Companies Route
app.post('/companies', (req, res) => {
    console.log(req.body)
    const newEntry = new Company({
        cin: req.query.cin,
        name: req.query.name
    })

    Company.create(newEntry)
        .then(dbEntry => {
            res.json(dbEntry)
        }).catch(err => console.error(err))
})

app.get('/companies', (req, res) => {
    Company.find()
        .then(dbEntry => res.json(dbEntry))
        .catch(err => console.error(err))
})

// Landing (Root) Route
app.get('/', (req, res) => {
    res.send({ hi: 'there' })
})

app.post('/', (req, res) => {
	let obj = {}
	console.log('body: ' + JSON.stringify(req.body))
	res.send(req.body)      
})

// Server Config
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server started on port ${port}.`))