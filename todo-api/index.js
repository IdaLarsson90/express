const express = require('express');
const app = express();
const PORT = 7000;


const todoRouter = require('./routes/todo');

app.use(express.json());

app.use((request, response, next) => {
    console.log(`I en middleware innan  ${request.url} och metod: ${request.method}`)
    next();
})
app.use('/api/todo', todoRouter)
// app.use('/api/products', productsRouter)
// app.use('/api/cart', cartRouter);
// app.use('/api/order', orderRouter);
// app.use('/api/account', accountRouter);

app.use((request, response) => {
    const resObj = {
        message: 'no endpoint found'
    }
    response.status(404).json(resObj);
})

app.listen(PORT, ()=> {
    console.log(`Servern är startad på port: ${PORT}`);
})