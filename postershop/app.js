// const nedb = require('nedb-promise');
// const database = new nedb({filename: 'database.db', autoload: true});

const { response, request } = require('express');
const express = require('express');
const app = express();
const PORT = 8000;

let productsArr = require('./products.json')
let cart = []

app.use(express.json());

app.get('/api/products', (request, response) => {
    const resObj = {
        products: productsArr
    }
    response.json(resObj)
})

app.post('/api/cart', (request, response) => {
    const productSerial = request.body;
    if( productSerial.hasOwnProperty('serial')) {
        addProduct = productsArr.filter((product)=>{
            if(product.serial == Number(productSerial.serial)) {
                cart.push(product)
            }
            return;
        })
        const resObj = {
            success:true,
            cart: cart
        }
        response.json(resObj)
    } else {
        const resObj = {
            success:false,
            message: 'Invalid body'
        }
        response.status(400).json(resObj)
    }
})

app.get('/api/cart', (request, response) => {
    const resObj = {
        cart: cart
    }
    response.json(resObj)
})

app.delete('/api/cart', (request, response) => {
    //Ta bort Number()
    const productSerial = request.body;
    const productId = productSerial.serial;

    if( productSerial.hasOwnProperty('serial')) {
        cart = cart.filter((product) =>{
            return product.serial !== productId
        })
        const resObj = {
            success:true,
            cart: cart
        }
        response.json(resObj)
    } else {
        const resObj = {
            success:false,
            message: 'Invalid body'
        }
        response.status(400).json(resObj)
    }
}) 

app.use((request, response) => {
    const resObj = {
        message: 'no endpoint found'
    }

    response.status(404).json(resObj);
})

app.listen(PORT, ()=> {
    console.log(`Server started on port: ${PORT}`)
});