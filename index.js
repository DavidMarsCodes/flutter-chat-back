const express = require('express');
const path = require('path');
require('dotenv').config();

var fs = require('fs');
var data = fs.readFileSync('./aws/keys.json', 'utf8');
var keys = JSON.parse(data);


// DB Config
require('./database/config').dbConnection();
process.env.TZ = 'America/Santiago';

// App de Express
const app = express();

// Lectura y parseo del Body

var fileupload = require("express-fileupload");
app.use(fileupload());


var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "70mb", extended: true, parameterLimit: 70000 }));
app.use(cors());
app.options('*', cors());
var aws = require('aws-sdk');

aws.config.update({
    region: 'us-east-2',
    accessKeyId: keys.AWSAccessKeyId,
    secretAccessKey: keys.AWSSecretKey
})


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));



// Mis Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/room', require('./routes/rooms'));
app.use('/api/plant', require('./routes/plants'));
app.use('/api/air', require('./routes/airs'));
app.use('/api/light', require('./routes/lights'));
app.use('/api/visit', require('./routes/visits'));
app.use('/api/google', require('./routes/google-auth'));
app.use('/api/apple', require('./routes/apple-auth'));

app.use('/api/search', require('./routes/search'));

app.use('/api/aws', require('./routes/aws'));
app.use('/api/subscription', require('./routes/subscribe'));
app.use('/api/notification', require('./routes/notifications'));

app.use('/api/catalogo', require('./routes/catalogo'));
app.use('/api/product', require('./routes/products'));

app.use('/api/favorite', require('./routes/favorite'));

app.use('/api/plant_product', require('./routes/plant_product'));



app.use('/api/dispensary', require('./routes/dispensary'));






server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


