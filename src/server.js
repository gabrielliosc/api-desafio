require('express-async-errors')
require('dotenv/config')

const AppError = require('./utils/AppError')

const express = require('express')

const routes = require('./routes')

const app = express();

app.use(express.json()) 

app.use(routes)

app.use(( error, response ) => {

    if( error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    
    return response.status(500).json({
        status: "error",
        message: error.message
    })
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`));