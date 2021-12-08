const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'FOXtm2022',
    database : 'smart-brain'
  }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());

// const database = {
// 	users: [
//  {
//  	 id :'123',
//  	 name : "John",
//  	 email: "john@gmail.com",
//  	 password: "cookies",
//  	 entries : 0,
//  	 joined : new Date()
//  },
//  {
//  	 id :'124',
//  	 name : "Sally",
//  	 email:"Sally@gmail.com",
//  	 password : "bananas",
//  	 entries : 0,
//  	 joined : new Date()
//  }


// ]

// }

app.get('/', (req, res) => {
	res.send('Success');

})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register' , (req, res) => {register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => {image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res ) })


const DATABASE_URL = process.env.DATABASE_URL
app.listen(3001, () =>  {
	console.log(`server is listening on port ${DATABASE_URL}`);
});

console.log(3001);

