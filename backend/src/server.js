const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const path = require('path')




const cors = require('cors');




const adminRoute = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoutes');
const instructorRoute = require('./routes/instructorRoutes')

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT'],
    credentials:true
}))

// require('../')

app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use(express.json());

app.use('/user', userRoute);

app.use('/admin',adminRoute)

app.use('/instructor',instructorRoute)




mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 4000, () => {
    console.log('Server running on port', process.env.PORT || 4000);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});
