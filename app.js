const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const User = require('./models/user')

mongoose.connect('mongodb+srv://m001-student:Ibtisam@sandbox.xuwkkn8.mongodb.net/needacar?retryWrites=true&w=majority').then(() => {
    console.log('db connected')
}).catch(err => console.log(err))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/success', (req, res) => {
    res.sendFile('public/signup_success.html', { root: __dirname })
})

app.post('/sign_up', async (req, res) => {
    try {
        const response = new User(req.body)
        const data = await response.save()
        res.redirect('/success')

    } catch (error) {
        res.send(error)
    }
})

app.listen(5000, () => {
    console.log('Server Started at http://localhost:5000')
})