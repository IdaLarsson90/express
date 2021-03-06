// const nedb = require('nedb-promise');
// const database = new nedb({filename: 'database.db', autoload: true});

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
    const resObj = {
        success:true,
        cart: cart,
    } 
    
   
    if( productSerial.hasOwnProperty('serial')){ 

        let filteredCart = cart.filter((product) => {                
           return productSerial.serial === product.serial 
        })

        for (let i = 0; i < productsArr.length; i++) {
           
            if (productSerial.serial === productsArr[i].serial && filteredCart.length < 1) {
                cart.push(productsArr[i])
                resObj.message = "Product added"
                break;
            }   else if (productSerial.serial !== productsArr[i].serial){
                resObj.message = "Product does not exist"

            }   else if (filteredCart.length > 0) {
                resObj.message = "product already in cart"
                break;
            }
            
        }
            
        response.json(resObj)
    }
    else {
        const resObj = {
            success:false,
            message: 'Invalid body'
        }
        response.status(400).json(resObj)
    }
});

app.get('/api/cart', (request, response) => {
    const resObj = {
        cart: cart
    }
    response.json(resObj)
})

app.delete('/api/cart', (request, response) => {
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