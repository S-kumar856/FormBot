const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route.js') ;
const cors = require('cors');
dotenv.config();
app.use(cors())

const port = process.env.PORT || 3000;


// middelwares & routers
app.use(express.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('/api/user', userRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(err);
    })
    console.log(`Server is running on port ${port}`);
});

