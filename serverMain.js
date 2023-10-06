const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const createPath = require('./helpers/create-path')
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const postApiRoutes = require('./routes/api-post-routes');


const app = express();

app.set('view engine', 'ejs');

const PORT = 5500;
const db = 'mongodb+srv://Katia:postsMongoBase@cluster0.qeurteg.mongodb.net/node_server?retryWrites=true&w=majority&appName=AtlasApp';


mongoose
 .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((res) => console.log('connected to db'))
 .catch((error) => console.log(error))



app.listen(PORT, (error) => {
    error? console.log(error) : console.log(`Listening port ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extend:false }))

app.use(express.static('styles'));

app.use(methodOverride('_method'));
 
app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
})



app.get('/about-us', (req, res) => {
    const title = 'Contacts';
    res.render(createPath('contacts'), { title });
})

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req,res) => {
    const title = 'Error page';
    res
    .status(404)
    .render(createPath('error'), { title });
})

