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
            UX__info_nivel6(key)
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

function alert(mensaje, error){
    const $body = document.querySelector('.body');
    if($body.querySelector('.alerta')){
        $body.querySelector('.alerta').remove();
    }
    const alerta = document.createElement('h4');
    alerta.classList.add('alerta', error);
    alerta.textContent = mensaje;
    $body.appendChild(alerta);

}

// EVENTOS GLOBALES
const $head = document.querySelector('.headline .head h2');
const $body = document.querySelector('.body');
const $userIcon = document.querySelector('.nav_user');

$userIcon.addEventListener('click', function(){
    app.key = 'perfil';
    UX__info_nivel6()
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
            UX__editar_nivel9()
        })
    })

}

function UX__option_nivel1(){
    console.log(app.nivel);
    const $user = document.querySelector('.nav_user');
    $user.querySelector('h3').textContent = app.usuario;
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
    console.log(key);
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
          <label for="reg-emal">e-mail</label>
          <input type="email" id="reg-emal" name="emal" placeholder="e-mail">
        </div>
        <div class="input">
          <label for="reg-password">contraseña</label>
          <input type="password" id="reg-password" name="password" placeholder="contraseña">
        </div>
        <div class="input">
          <label for="re-password">repetir contraseña</label>
          <input type="password" id="re-password" name="re-password" placeholder="contraseña">
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

    $ingresar.addEventListener('click', function(){
        UX__login('ingresar')
    })

    $btn.addEventListener('click', (e)=>{
        e.preventDefault();
        const form_data = new FormData(form);
        const data = Object.fromEntries(form_data.entries());
        if(verificar_user(data)){
            localStorage.setItem('usuario', data.emal);
            iniciar();
        } else {
            alert('el usuario ya existe. ingrese', 'error');
        }
    })
}

function UX__login(key){
    $body.innerHTML = '';
    $head.textContent = key;

    const form = document.createElement('form');
    form.classList.add('log_container', key);
    form.innerHTML = `
    <div class="input">
        <label for="log-emal">e-mail</label>
        <input type="email" id="log-emal" name="emal" placeholder="e-mail">
    </div>
    <div class="input">
        <label for="log-password">contraseña</label>
        <input type="password" id="log-password" name="password" placeholder="contraseña">
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

    $registro.addEventListener('click', function(){
        UX__registro('registrar')
    })

    $btn.addEventListener('click', (e)=>{
        e.preventDefault();
        const form_data = new FormData(form);
        const data = Object.fromEntries(form_data.entries());
        if(verificar_user(data)){
            const $$log = document.querySelectorAll('.log i');
            $$log.forEach(log =>{
                log.classList.toggle('hidden');
            })
            localStorage.setItem('usuario', data.emal);
            iniciar();
        } else {
            alert('el usuario no existe. registrese', 'error');
        }
    })
}

function UX__info_user(){
    console.log(app.nivel);  
}

function verificar_user(data){
    console.log('verificar user');
    
    return true;
    
}

