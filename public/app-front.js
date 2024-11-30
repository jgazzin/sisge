import { arq } from "./assets/js/arquitectura.js";

document.addEventListener("DOMContentLoaded", iniciar);

// globales
let app ={
    'usuario': '',
    'nivel': '',
    'nivel_anterior': 0,
    'key': ''
}

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
            UX__nivel0()
            break;
        case 1:
            UX__nivel1()
            break;
        case 2:
            UX__nivel2()
            break;
        case 3:
            UX__nivel3()
            break;
        case 4:
            UX__nivel4()
            break;
        case 5:
            UX__nivel5()
            break;
        case 6:
            UX__nivel6()
            break;
        case 7:
            UX__nivel7()
            break;
        case 8:
            UX__nivel8()
            break;
        case 9:
            UX__nivel9()
            break;

        default:
            break;
    }
}

// -------------------- EVENTOS GLOBALES
const $head = document.querySelector('.headline .head h2');
const $body = document.querySelector('.body');
const $userIcon = document.querySelector('.nav_user');
const $home = document.querySelector('.bottom_nav .home');

$userIcon.addEventListener('click', function(){
    app.key = 'perfil';
    UX__nivel6()
})

$home.addEventListener('click', function(){
    iniciar();
})


// -------------------- FUNCIONES UX

const UX__nivel0 = function() {
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
            UX__nivel9()
        })
    })

}

const UX__nivel1 = function (){
    console.log(app.nivel);
    const $$log = document.querySelectorAll('.log i');
    $$log.forEach(log =>{ log.classList.toggle('hidden');})
    obtener_user_nombre();

    $body.innerHTML = '';
    $head.textContent = arq[app.nivel].nombre;

    const options = arq[app.nivel].op;
    options.forEach(option =>{
        const container = document.createElement('div');
        container.classList.add('container');
        container.setAttribute('data-key', option)
        container.innerHTML += `
        <div class="head"">
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

    // eventos
    logout.addEventListener('click', function(){
        localStorage.removeItem('usuario');
        iniciar();
    })

    document.querySelectorAll('.container').forEach(option =>{   
        option.addEventListener('click', ()=>{          
        app.key = option.getAttribute('data-key');
        console.log(app.key);
        })

    })

}

function UX__nivel2(){
    console.log(app.nivel);  
}

function UX__nivel3(){
    console.log(app.nivel);  
}

function UX__nivel4(){
    console.log(app.nivel);  
}

function UX__nivel5(){
    console.log(app.nivel);  
}

function UX__nivel6(){
    console.log(app.key);
}

function UX__nivel7(){
    console.log(app.nivel);  
}

function UX__nivel8(){
    console.log(app.nivel);  
}

const UX__nivel9 = function(){
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

    // funciones del nivel
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
}


//--------------------- FUNCIONES CONSULTAS SQL

function obtener_user_nombre() {
    console.log(`obtener nombre`);
    const $user = document.querySelector('.nav_user');

    if(!isNaN(app.usuario)){
        $user.querySelector('h3').textContent = 'Bienvenido!';
        $user.querySelector('h3').nextElementSibling.classList.add('hidden');
        return;
    } else {
        $user.querySelector('h3').textContent = app.usuario;
        $user.querySelector('h3').nextElementSibling.classList.remove('hidden');
    } 
}

function crear_usuario(info){
    console.log(`crear usuario`);
    console.log(info);
    localStorage.setItem('usuario', info.password);
    iniciar()   
}

async function verificar_user(data){
    // verificar user desde login

    const respons = await fetch('/usuarios');
    const usuarios = await respons.json();
    const user_find = usuarios.find(user => user.email === data.email);
    if(user_find){
        if(user_find.password === data.password){
            localStorage.setItem('usuario', user_find.id);
            spinner()
            setTimeout(()=>{
                iniciar()
            }, 2000)
        } else {
            alerta_input('Contraseña incorrecta', 'password');
        }
    } else {
        alerta_input('El usuario no existe. Registre uno nuevo.', 'email');
    }


}

// -------------------- FUNCIONES GLOBALES

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

function spinner(){
    $body.innerHTML = '';
    const loader = document.createElement('div');
    loader.classList.add('loader');
    $body.appendChild(loader);
}