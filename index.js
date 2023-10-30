const app = require('express')()
const {productsRoutes, router, userRoutes} = require('./routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
    next()
})

app.use('/', router);
app.use('/users', userRoutes);
app.use('/products', productsRoutes);

app.listen(8001)