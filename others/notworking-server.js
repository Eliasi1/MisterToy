const cookieParser = require('cookie-parser')
const express = require('express') 
const toyService = require('./api/toy/toy.service.js')
const cors = require('cors')
const path = require('path')
const {log} = require('./middlewares/logger.middleware.js')


const app = express()
const http = require('http').createServer(app)

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

const authRoutes = require('./api/auth/auth.routes.js')
const userRoutes = require('./api/user/user.routes.js')
const toyRoutes = require('./api/toy/toy.routes')

// routes
app.use('api/auth', authRoutes)
app.use('api/user', userRoutes)
app.use('api/toy', toyRoutes)

// basic routing in express

// app.get('/**', (req,res) =>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// } )

const port = process.env.PORT || 3030

http.listen(port, () => console.log('server is ready at port: ', port))
