const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));

var contactList = [
    {
        name: 'Yash Bhardwaj',
        phone: "7011808879"
    },
    {
        name: "Pallav jain",
        phone: "9873013365"
    },
    {
        name: "Papa",
        phone: "8860406090"
    }
];

app.get('/',function(req, res){
    return res.render('home',{
        title:"I am Flying",
        contact_list: contactList
    });
});

app.get('/playground',function(req,res){
    return res.render('playground');
});

app.post('/create_contact',function(req,res){
    contactList.push(req.body);
    return res.redirect('back');
});
//deleting contact using string param
app.get('/delete-contact/:phone',function(req,res){
    let phone = req.params.phone;
    let i=0;
    for(let p of contactList){
        if(p.phone==phone){
            break;
        }i++;
    }
    console.log(i);
    contactList.splice(i,1);
    return res.redirect('back');
})

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up and running at port no ${port}`);
    return;
});