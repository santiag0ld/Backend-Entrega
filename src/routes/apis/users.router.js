const { Router } = require('express');
const router = Router();

router
    .get('/', async (req,res)=>{
        try{
            const users = await userService.getUsers()
            res.send({
                status: 'success',
                payload: users
            })
        } catch (error) {
            console.log(error)
        }
    })
    .get('/:uid', (req,res)=>{
        res.send('users')
    })
    .post('/', (req,res)=>{
        res.send('users')
    })
    .put('/:uid', (req,res)=>{
        res.send('users')
    })
    .delete('/uid', (req,res)=>{
        res.send('users')
    })

module.exports = router
