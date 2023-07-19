const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require("body-parser")
const path = require('path');
const indexRouter = require('./router/index');
const productRouter = require('./router/products');
const usersRouter = require('./router/users')
const session = require('express-session');
const flash = require("connect-flash");
connectDB();

const app = express();
app.use(flash())
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use('/', indexRouter);
app.use("/products", productRouter);
app.use("/users", usersRouter);

app.listen(8080, () => {
  console.log('Listening on port 8080.');
});
