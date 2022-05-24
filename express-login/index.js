const express = require('express');
const app = express();
const PORT = 8000;

const accountInfo = [ 
    {username: "glenn",
    password: "glenn123",
    email: "glenn_hysen@hotmail.com"}
]
let loginSuccess = { success:false }

app.use(express.json());

app.post('/api/login', (request, response) => {
    // response.send(JSON.stringify(accountInfo))
    
    const userInput = request.body;

    const foundUser = accountInfo.filter( accountInfo => userInput.username.toLowerCase() == accountInfo.username && userInput.password == accountInfo.password)
    
    if(foundUser.length > 0) {
        console.log(foundUser)
        loginSuccess.success = true;
    } else {
        loginSuccess.success = false;
    }
    console.log(loginSuccess)
    response.json(accountInfo);
})

let responseObject = {}

app.post('/api/signup', (request, response) => {
    let signupInfo = request.body;
    console.log("signup info", signupInfo)
    const foundUsername = accountInfo.filter(accountInfo => signupInfo.username == accountInfo.username)
    const foundEmail = accountInfo.filter(accountInfo => signupInfo.email == accountInfo.email)

    console.log("found username", foundUsername)
    if (foundUsername.length > 0) {
        responseObject.usernameExists = true
        console.log("responsObject", responseObject)
    } else {
        responseObject.usernameExists = false
    }

    if (foundEmail.length > 0) {
        responseObject.emailExists = true
    } else {
        responseObject.emailExists = false
    }

    if (responseObject.usernameExists == true || responseObject.emailExists == true) {
        responseObject.success = false
    } else {
        responseObject.success = true
    }

    if (responseObject.success == true) {
        console.log(signupInfo)
        accountInfo.push(signupInfo);
    } 

    response.json(responseObject);
})

app.listen(PORT, () =>{
    console.log(`Servern är startad på port: ${PORT} `)
});

//1:09:51