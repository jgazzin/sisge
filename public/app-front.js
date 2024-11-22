import { arq } from "./assets/js/arquitectura.js";

document.addEventListener("DOMContentLoaded", iniciar);

// globales
let app ={
    'usuario': '',
    'nivel': '',
    'nivel_anterior': 0,
    'key': ''
}


// FUNCIONES
function iniciar(){  
    app.usuario = localStorage.getItem('usuario');
    if(app.usuario){
        app.nivel = 1;
    } else {
        app.nivel = 0;
    }
    
    UX();
}

function UX(){
    
    switch (app.nivel) {
        case 0:
            UX__option_nivel0()
            break;
        case 1:
            UX__option_nivel1()
            break;
        case 2:
            UX__items_nivel2()
            break;
        case 3:
            UX__option_nivel3()
            break;
        case 4:
            UX__option_nivel4()
            break;
        case 5:
            UX__option_nivel5()
            break;
        case 6:
            UX__info_nivel6()
            break;
        case 7:
            UX__info_nivel7()
            break;
        case 8:
            UX__ver_nivel8()
            break;
        case 9:
            UX__editar_nivel9()
            break;

        default:
            break;
    }
}

// EVENTOS GLOBALES
const $head = document.querySelector('.headline .head h2');
const $body = document.querySelector('.body');
const $userIcon = document.querySelector('.nav_user');
const $home = document.querySelector('.bottom_nav .home');

$userIcon.addEventListener('click', function(){
    app.key = 'perfil';
    UX__info_nivel6()
})

$home.addEventListener('click', function(){
    iniciar();
})
    
// FUNCINES UX NIVELES
function UX__option_nivel0(){
    console.log(app.nivel);
    
    const op = arq[app.nivel].op;
    const $user = document.querySelector('.nav_user');

    $head.textContent = arq[app.nivel].nombre;
    $user.querySelector('h3').textContent = 'bienvenido';
    $user.querySelector('h3').nextElementSibling.classList.add('hidden');

    $body.innerHTML = '';
    op.forEach(function(item){
        const container = document.createElement('div');
        container.classList.add('container');
        container.innerHTML = `
        <div class="head">
          <h2>${item}</h2>
          <i class="fa-solid fa-caret-right fa-2xl"></i>
        </div>
        `;
        $body.appendChild(container);
    });

    // eventos 
    const $option = document.querySelectorAll('.body .container');
    
    $option.forEach(option =>{;
        option.addEventListener('click', function(){ 
            app.nivel_anterior = app.nivel;
            app.key = option.querySelector('h2').textContent;
            app.nivel = 9;
            UX__editar_nivel9()
        })
    })

}

function UX__option_nivel1(){
    console.log(app.nivel);
    const $$log = document.querySelectorAll('.log i');
    $$log.forEach(log =>{ log.classList.toggle('hidden');})
    const $user = document.querySelector('.nav_user');
    obtener_user_nombre($user);
    $user.querySelector('h3').nextElementSibling.classList.remove('hidden');

    $body.innerHTML = '';
    $head.textContent = arq[app.nivel].nombre;

    const options = arq[app.nivel].op;
    options.forEach(option =>{
        const container = document.createElement('div');
        container.classList.add('container');
        container.innerHTML += `
        <div class="head">
          <h2>${option}</h2>
          <i class="fa-solid fa-caret-right fa-2xl"></i>
        </div>
        `;
        $body.appendChild(container);
        
    })
    const logout = document.createElement('div')
    logout.classList.add('botones');
    logout.innerHTML = `
        <p>Logout</p>`;
    $body.appendChild(logout);

    logout.addEventListener('click', function(){
        localStorage.removeItem('usuario');
        iniciar();
    })

}

function UX__items_nivel2(){
    console.log(app.nivel);  
}

function UX__items_nivel3(){
    console.log(app.nivel);  
}

function UX__items_nivel4(){
    console.log(app.nivel);  
}

function UX__items_nivel5(){
    console.log(app.nivel);  
}

function UX__info_nivel6(){
    console.log(app.key);
}

function UX__info_nivel7(){
    console.log(app.nivel);  
}

function UX__ver_nivel8(){
    console.log(app.nivel);  
}

function UX__editar_nivel9(){
    console.log(app.key);
    switch (app.key) {
        case 'registrar':
            UX__registro(app.key)
            break;
        case 'ingresar':
            UX__login(app.key)
            break;
        case 'info_user':
            UX__info_user()
            break;
    
        default:
            break;
    }  
}

// FUNCIONALIDADES UX
function UX__registro(key){
    $body.innerHTML = '';
    $head.textContent = key;

    const form = document.createElement('form');
    form.classList.add('log_container', key);
    form.innerHTML = `
        <div class="input">
          <label for="reg_emal">e-mail</label>
          <input type="email" id="reg_emal" name="email" placeholder="e-mail">
        </div>
        <div class="input">
          <label for="reg_password">contraseña</label>
          <div>
            <input type="password" id="reg_password" name="password" placeholder="contraseña">
            <span class="eye"><i class="fa-regular fa-eye fa-lg"></i></span>
          </div>
        </div>
        <div class="input">
          <label for="re_password">repetir contraseña</label>
          <input type="password" id="re_password" name="re_password" placeholder="contraseña">
        </div>
        <div class="botones">
          <button class="btn">Registrar</button>
          <p>O ingrese a una cuenta existente</p>
        </div>
        `;
    $body.appendChild(form);

    // eventos
    const $btn = form.querySelector('.btn');
    const $ingresar = form.querySelector('.botones p');
    const $eye = form.querySelector('.eye');

    $ingresar.addEventListener('click', function(){
        UX__login('ingresar')
    })

    $btn.addEventListener('click', (e)=>{
        e.preventDefault();
        const form_data = new FormData(form);
        const data = Object.fromEntries(form_data.entries());
        console.log(data);
        

        if(verificar_form(data)){
            crear_usuario(data)
        } 
    })

    $eye.addEventListener('click', (e)=>{
        togglePassword(e)
    })
}

function UX__login(key){
    $body.innerHTML = '';
    $head.textContent = key;

    const form = document.createElement('form');
    form.classList.add('log_container', key);
    form.innerHTML = `
        <div class="input">
          <label for="log_emal">e-mail</label>
          <input type="email" id="log_emal" name="email" placeholder="e-mail">
        </div>
        <div class="input">
          <label for="log_password">contraseña</label>
          <div>
            <input type="password" id="log_password" name="password" placeholder="contraseña">
            <span class="eye"><i class="fa-regular fa-eye fa-lg"></i></span>
          </div>
        </div>
        <div class="botones">
          <button class="btn">entrar</button>
          <p>O registre una cuenta nueva</p>
        </div>
    `;
    $body.appendChild(form);

    // eventos
    const $btn = form.querySelector('.btn');
    const $registro = form.querySelector('.botones p');
    const $eye = form.querySelector('.eye');

    $registro.addEventListener('click', function(){
        UX__registro('registrar')
    })

    $btn.addEventListener('click', (e)=>{
        e.preventDefault();
        const form_data = new FormData(form);
        const data = {
            email : form_data.get('email'),
            password : form_data.get('password')
        }
        console.log(data);
        
        if(verificar_form(data)){
            verificar_user(data)
        }
    })

    $eye.addEventListener('click', (e)=>{
        togglePassword(e)
    })

}

function UX__info_user(){
    console.log(app.nivel);  
}

// FUNCIONALIDADES GLOBALES

function verificar_form(data){

    if(document.querySelector('.msj_error')){
        while (document.querySelector('.msj_error')) {
            document.querySelector('.msj_error').remove();
        }
    
    }
    if(document.querySelector('.alerta')){
        document.querySelector('.alerta').remove();
    }

    if(Object.values(data).includes('')){
        alert('todos los campos son obligatorios', 'error');
        return;
    } else {
        if(!validarEmail(data.email)){
            alerta_input('email inválido', 'email');
        }
        if(validar_password(data.password)){

            if(data.re_password){
                if(!comparar_passwords(data.password, data.re_password)){      
                alerta_input('contraseñas no coinciden', 'password');
                }
            }
        } 
        if(!document.querySelector('.msj_error')){
            return true
        }          
    }
     
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validar_password(password){
    if(password.length < 6){
        alerta_input('la contraseña debe tener al menos 6 caracteres', 'password');
    } else {
        return true;
    }
}
function comparar_passwords(password, re_password){
    if(password !== re_password){
        return false;
    } else {
        return true;
    }
}

function alert(mensaje, error){
    if($body.querySelector('.alerta')){
        $body.querySelector('.alerta').remove();
    }
    const alerta = document.createElement('h4');
    alerta.classList.add('alerta', error);
    alerta.textContent = mensaje;
    $body.appendChild(alerta);

}

function alerta_input(mensaje, type){
    const $input = document.querySelector(`form input[type='${type}']`);
        
    const p = document.createElement('p');
    p.classList.add('msj_error');
    p.textContent = mensaje;
    $input.parentElement.appendChild(p);
    
}

function togglePassword(e){
    const $eye = e.target;
    if($eye.classList.contains('fa-solid')){
        $eye.classList.remove('fa-solid');
        $eye.classList.add('fa-regular');
    } else {
        $eye.classList.remove('fa-regular');
        $eye.classList.add('fa-solid');
    } 
    const $input = $eye.parentElement.parentElement.firstElementChild;
    $input.type = $input.type  === 'password' ? 'text' : 'password';
}

// FUNCIONES CONSULTAS SQL

async function crear_usuario(info){
    const data = {
        email: info.email,
        password: info.password
    }

    const response = await fetch('/usuarios')
    const usuarios = await response.json()
    const user = usuarios.filter(user => user.email === data.email);
  
    
    if(user.length > 0){
        alert('el usuario ya existe. Ir a Ingresar', 'error');
    } else {
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log(result.mensaje);
        localStorage.setItem('usuario', result.idUsuario);
        iniciar();    
    }
}

async function verificar_user(data){
    const response = await fetch('/usuarios');
    const usuarios = await response.json()
    const user = usuarios.filter(user => user.email === data.email);    

    if(user.length > 0){
        if(user[0].password == data.password){
            localStorage.setItem('usuario', user[0].id);
            iniciar()
        } else {
            alerta_input('Constraseña incorrecta', 'password')
        }
    } else {
        alert('el usuario no existe. registrese', 'error');
    }
    
}

async function obtener_user_nombre(container){
    const response = await fetch(`/perfiles`)
    const perfiles = await response.json()
    const perfil = perfiles.filter(perfil => perfil.id_user == app.usuario);
   
    if(perfil.length > 0){
        container.querySelector('h3').textContent = perfil[0].nombre;
    } else {
         container.querySelector('h3').textContent = 'Bienvenido!';
    }
}