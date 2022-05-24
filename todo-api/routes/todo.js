const { Router } = require('express');
const router = Router();

let todos = []

router.get('/', (request, response)=> {
    const resObj = {
        todos:todos
    }
    response.json(resObj)
})

router.post('/', (request, response)=> {
    const todo = request.body;
    
    if (todo.hasOwnProperty('todo') && todo.hasOwnProperty('id')&& todo.hasOwnProperty('done')) {
        todos.push(todo);
        todo.id = todos.length;
        todo.createdAt = Date();

        const resObj = {
        success: true,
        todos: todos 
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

router.delete('/:id', (request, response)=> {
    const id = request.params.id;
    
    todos = todos.filter((todo)=> {
        return todo.id !== Number(id) 
    });
    
    const resObj = {
        success: true,
        todos: todos
    }
    response.json(resObj)
})

module.exports = router;