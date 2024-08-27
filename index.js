const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const {connection} = require('./config/db')
const ProdRoute = require('./routes/product')
const AuthRoute = require('./routes/auth');

dotenv.config();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
const PORT = process.env.PORT;
app.use('/api/auth',AuthRoute)
app.use('/api/prod',ProdRoute)


connection();
app.listen(PORT,()=> {
        console.log(`App is listening on ${PORT} PORT`);
})
