const cookieParser = require('cookie-parser')
const express = require('express') 
const toyService = require('./services/toy.service.js')
const cors = require('cors')

const app = express()

// App configuration
// app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json()) 

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// basic routing in express
app.listen(3030, () => console.log('Server ready at port 3030!'))
// /api/toy
app.get('/api/toy', (req,res) => {//destructruing and reassembeling parameters for later use: sort, page size, page idx
    // const {filterBy} = JSON.parse(req.query.params)
    // toyService.query(filterBy).then((toys)=>res.send(toys))
    toyService.query().then((toys)=>res.send(toys))
})
// /api/toy/save
app.post('/api/toy',(req,res) => {
    console.log("received a request to add toy: ", req.query)
    const toy = req.query
    return toyService.save(toy).then((toyToAdd)=>res.send(toyToAdd))
    // .catch(res.status(501))

})

app.put('/api/toy', (req,res) => {
    const toy = req.query
    toyService.save(toy).then((toyToAdd)=>res.send(`${toyToAdd._id} has been updated with ${toy}`))
})
// /api/toy/:toyId
app.get('/api/toy/:toyId', (req,res) => {
    const {toyId} = req.params
    toyService.getById(toyId).then((toy)=>{
        // res.cookie('visitCountIds',visitCountIds, {maxAge: COOKIE_AGE})
        res.send(toy)})
    

})
// /api/toy/:toyId
app.delete('/api/toy/:toyId', (req,res) => {
    console.log("received delete request for: ", req.params.toyId)
    toyService.remove(req.params.toyId).then((toy) => res.send(toy))
    .catch(err => console.log(err))

})