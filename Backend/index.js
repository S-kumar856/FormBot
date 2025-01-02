const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route.js');
const folderRoutes = require('./routes/folder.route.js')
const formRoutes = require('./routes/form.route.js')
const cors = require('cors');
dotenv.config();

// enable cors
app.use(cors())

// Define the port from environment or default to 3000
const PORT = process.env.PORT || 3000;


// middelwares & routers
app.use(express.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Route middleware for user authentication (register/login)
app.use('/api/user', userRoute);

// Route middleware for folder-related operations
app.use('/api/folders', folderRoutes);
app.use('/api/forms', formRoutes);


app.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(err);
    })
    console.log(`Server is running on port ${PORT}`);
});

