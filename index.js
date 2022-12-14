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

// var contactList = [
//     {
//         name: 'Yash Bhardwaj',
//         phone: "7011808879"
//     },
//     {
//         name: "Pallav jain",
//         phone: "9873013365"
//     },
//     {
//         name: "Papa",
//         phone: "8860406090"
//     }
// ];

app.get('/',function(req, res){
    // return res.render('home',{
    //     title:"I am Flying",
    //     contact_list: contactList
    // });
    //fetching from db
    Contact.find({/*name: "NEW" to find the contact with name new*/},function(err,contacts/*all the contacts which we have find*/){
        if(err){
            console.log('Error in fetching Contacts');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list: contacts
        });
    });
});

app.get('/playground',function(req,res){
    return res.render('playground');
});

app.post('/create_contact',function(req,res){
    
    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('******',newContact);
        return res.redirect('back');
    })
});
//deleting contact using string param
app.get('/delete-contact',function(req,res){
    // let phone = req.params.phone;
    // let i=0;
    // for(let p of contactList){
    //     if(p.phone==phone){
    //         break;
    //     }i++;
    // }
    // console.log(i);
    // contactList.splice(i,1);
    // return res.redirect('back');

    //deleting from db using the unique id in db
    let id = req.query.id;
    console.log(id);
    //find the contact in db
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting from db");
            return;
        }
        console.log("Successfuly deleted from db");
        return res.redirect('back');
    })
})

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up and running at port no ${port}`);
    return;
});