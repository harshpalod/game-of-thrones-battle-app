const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//middleware route
const battleRouter = require('./routes/battles');
app.use('/list', battleRouter); //returns array of distinct locations
// app.us

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // If no API routes are hit, send the React app
  app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});