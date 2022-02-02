const express = require('express');
const dotenv = require('dotenv');
//const morgan = require('morgan');
//const path = require('path');
const path = require('path');
const exphbs = require('express-handlebars');
const bodY_parser = require('body-parser');
require('./server/model/database');
const router = require('./server/controller/pcontroller');
const bodyparser = require('body-parser');
const app = new express();

dotenv.config({ path: 'env' });
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/' }))
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
//app.set('view engine', hbs);
/*app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));*/

let PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render("home");
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

app.use('/patient', router);
