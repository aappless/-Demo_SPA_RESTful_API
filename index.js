const express = require('express');

/*  use a pure javascript database : nedb
    https://github.com/louischatriot/nedb
    chinese intro :https://www.w3cschool.cn/nedbintro/
*/
const nedb = require('nedb');
const app = express();

app.use(express.json());

/*
var $users = [
    { id: 1, name: 'Maruko' },
    { id: 2, name: 'Kenda' },
    { id: 3, name: 'Kaori' }
]



app.get('/', function (req, res) {
    res.send('Hello World!');
});
*/

//prepare database
users=new nedb({
    filename:'users.db',
    autoload: true
});

app.get('/api/users', (req, res) => {
    //list all users
    users.find({},($err,$data)=> res.send($data));
    
});
app.get('/api/users/:id', (req, res) => {
    
    let $user = users.find({_id:req.params.id});
    res.send($user);
});

app.post('/api/users', (req, res) => {
    
    let $user=req.body;

    $user._id=Date.now().toString(36), //dirty trick : use time(ms) with base36 endoding
    
    users.insert($user,($err)=>{
        if ($err){
            res.send({
                ok:false,
                err:$err
            });
        }else{
            res.send({
                id:$user._id,
                ok:true
            });
            
        }
    });
    

});

app.put('/api/users/:id', (req, res) => {
    let $id=req.params.id;
    let $data=req.body;
    user.update({_id:$id},{$set:$data},($err,$numReplaced)=>{
        if ($err){
            res.send({
                ok:false,
                err:$err
            });
        }else{
            res.send({
                id:$id,
                numReplaced:$numReplaced,
                ok:true
            });
            
        }
    });
    
});

app.delete('/api/users/:id',(req,res)=>{
    let $id=req.params.id;
    users.remove({_id:$id},($err,$numReplaced)=>{
        if ($err){
            res.send({
                ok:false,
                err:$err
            });
        }else{
            res.send({
                id:$id,
                ok:true
            });
            
        }
    });
    
});
app.use(express.static('public'));

const $port = process.env.PORT || 8033;
app.listen($port, function () {
    console.log(`Example app listening on ${$port}`);
});
