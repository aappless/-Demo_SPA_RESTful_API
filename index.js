const express = require('express');
const app = express();

app.use(express.json());

var $users = [
    { id: 1, name: 'Maruko' },
    { id: 2, name: 'Kenda' },
    { id: 3, name: 'Kaori' }
]


app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/api/users', (req, res) => {
    res.send($users)
});
app.get('/api/users/:id', (req, res) => {

    const $user = $users.find(function (el) {
        return el.id === parseInt(req.params.id);
    })

    if (!$user) {
        res.status(404).send('此不到此用戶的id');
        return;
    }
    res.send($user);
});

app.post('/api/users', (req, res) => {

    if (!req.body.name || req.body.name.length<3) {
        res.status(400).send('Name是必填，並且至少3個字元');
        return;
    }

    const $user = {
        id: $users.length + 1,
        name: req.body.name
    };
    $users.push($user);
    res.send($user);

});

app.put('/api/users/:id', (req, res) => {
    //先找到對應的id
    const $user = $users.find(function (el) {
        return el.id === parseInt(req.params.id);
    })
    // not existing
    if (!$user) {
        res.status(404).send('此不到此用戶的id');
        return;
    }

    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name是必填，並且至少3個字元');
        return;
    }

    $user.name=req.body.name;
    res.send($user);
});

app.delete('/api/users/:id',(req,res)=>{
    const $user = $users.find(function (el) {
        return el.id === parseInt(req.params.id);
    })
    // not existing
    if (!$user) {
        res.status(404).send('此不到此用戶的id');
        return;
    }

    //delete
    const index=$users.indexOf($user);
    $users.splice(index,1);

    res.send($users);

});

const $port = process.env.PORT || 3000;
app.listen($port, function () {
    console.log(`Example app listening on ${$port}`);
});
