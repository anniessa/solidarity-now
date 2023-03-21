const express = require('express');
const router = express.Router();  
require('dotenv').config();

router.post('/', (req,res) => {
    req.query.api_key = process.env.GOOGLE_APPLICATION_CREDENTIALS;
 
})

   

