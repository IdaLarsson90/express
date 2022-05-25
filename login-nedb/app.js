const express = require('express');
const app = express();
const PORT = 8000;

const { createAccount, compareCredentials, checkIfAccountExist } = require('./model/db')

app.use(express.json())

app.post('/api/login', async (request, response) => {
    const credentials = request.body;
    const result = await compareCredentials(credentials);
    console.log('Login: ', result)

    const resobj = {
        success:false
    }
    if (result.length > 0) {
        resobj.success = true
    }

    response.json(resobj)
});

app.post('/api/signup', async (request, response)=> {
    const credentials = request.body;
    console.log('credentials to add: ', credentials);
    const accountExists = await checkIfAccountExist(credentials);
    const resObj = {
        success: false
    }

    if (accountExists.length > 0 ) {
        resObj.message = 'Account already exists'
    } else {
        const result = await createAccount(credentials);
        if(result) {
            resObj.success = true
        }   
    }    
    response.json(resObj)
});

app.listen(PORT, () =>{
    console.log(`Server started on port: ${PORT}`)
})