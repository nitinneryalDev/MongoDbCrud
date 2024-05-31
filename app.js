const express = require('express');
const { read } = require('fs');
const app = express();
const path = require('path');
const userModel = require('./models/user')


// Setting up the JSON so that the form should work
// and setting up the vue engine for the EJS 

app.set('view engine' , 'ejs')
app.use(express.json());
app.use(express.urlencoded( {extended:true} ) );
app.use(express.static(path.join(__dirname , 'public' )))

app.get('/' , (req , res) => {
    res.render('index')
})


// app.get('/read' , (req , res) => {
//     res.render('read')
// })


app.get('/read', async( req , res ) => {
     let users  = await userModel.find();
        res.render('read' , {users } )
} )



app.get('/delete/:id', async( req , res ) => {
    let users  = await userModel.findOneAndDelete({_id: req.params.id});
       res.redirect('/read' )
} )


app.get('/edit/:userid', async( req , res ) => {
    let user = await userModel.findOne({_id: req.params.userid});
    res.render('edit' , {user} )
} )




app.post('/update/:userid', async( req , res ) => {
    let {imageUrl , name , email  }  = req.body;
     let user = await userModel.findOneAndUpdate({_id: req.params.userid} , {imageUrl , name , email} , {new:true } );
    res.redirect('/read' )
} )




app.post('/create' , async (req ,  res) =>  {
    let {name , email , imageUrl } = req.body;
    let createUser = await   userModel.create ( {
        name, email , imageUrl 
    });
    res.redirect('/read')
})


app.listen(3000)