//Invocamos a express
const express = require('express');
const app = express();

//seteamos urlencoded  para capturar los datos de formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Invocando a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Establecer el motor de plantillas ejs
app.set('view engine', 'ejs');

//Ivocamos a bcryptjs
const bcryptjs = require('bcryptjs');

//variables de session
const session =require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
})); 

//8-Invocamos el modulo de conexion de la DB
const connection = require('./database/db');

//Estableciendo las rutas
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/register', (req, res)=>{
    res.render('register')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

//9 Registracion
app.post('/register', (req, res)=>{ //passwordHaash
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;
    const numero = req.body.numero;
    let passwordHaash = bcryptjs.hash(contraseña, 8); //await
    connection.query('INSERT INTO users SET ?', {nombre:nombre, correo:correo, contraseña:passwordHaash, numero:numero}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
           res.render('register',{
            alert:true,
            alertTitle: "Registration",
            alertMessage:"¡Successful Registration!",
            alertIcon: "success",
            showConfirnButton:false,
            timer:1500,
            ruta:""
           })
        }
    })
})

//10 registracion
app.post('/auth', async (req, res)=>{
    const correo = req.body.correo;
    const contraseña =req.body.contraseña;
    let passwordHaash = bcryptjs.hash(contraseña, 8);
    if(correo && contraseña){
        connection.query('SELECT * FROM users WHERE correo = ?',[correo],async (error, results) =>{
            if(results.length == 0 || !(await bcryptjs.compare(contraseña, results[0].contraseña))){
                res.send('Correo o Contraseña Incorrecta');
            }else{
                res.send('Login Correcto');
            }
        })
    }
})


app.listen(3000, (req, res) => {
    console.log('Servidor 3000')
})