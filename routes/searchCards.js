const express = require('express')
const cardRouter = express.Router()

cardRouter.get(`/`, (req, res) => {
    console.log("fired")   

})

module.exports = cardRouter
   

