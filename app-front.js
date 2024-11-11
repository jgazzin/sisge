import { arq } from "./assets/js/arquitectura.js";

document.addEventListener("DOMContentLoaded", iniciar);

// FUNCIONES
function iniciar(){
    const usuario = localStorage.getItem('usuario');
    
    if(usuario){
        sessionStorage.setItem('nivel', JSON.stringify(1));
    } else {
        sessionStorage.setItem('nivel', JSON.stringify(0));
    }
    
    imprimir();
}

function imprimir(){
    const nivel = sessionStorage.getItem('nivel');
    console.log(nivel);
    
    switch (nivel) {
        case '0':
            impimirLogueo();
            break;
        case '1':
            impimirPanel();
            break;
        case '2':
            impimirPoryectos();
            break;
        case '3':
            impimirObra();
            break;
        case '4':
            impimirItems();
            break;
        case '5':
            impimirDetalle();
            break;
    
        default:
            break;
    }
}

function imprimirHead(nivel){
    const $nivel = document.querySelector('.nombre_nivel');
    
    if(!isNaN(nivel)){
        $nivel.innerHTML = arq[nivel].nombre;
        if(nivel == 0){
            $nivel.previousElementSibling.classList.add('ocultar');
        }
        if(nivel == 5){
            $nivel.nextElementSibling.classList.add('ocultar');
        }
    } else {
        $nivel.nextElementSibling.classList.add('ocultar');
        $nivel.innerHTML = nivel;
    }
}

function imprimirBody(nivel){
    const $body = document.querySelector('.body');
    const options = arq[nivel].options;

    $body.innerHTML = '';
    options.forEach(op =>{
        const op_container = document.createElement('div');
        op_container.classList.add('op_container');
        op_container.setAttribute('data-option', op);
        op_container.innerHTML = `
            <h4 class="option">
                ${op}
            </h4>
            <div class="next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                  </svg>
            </div>`
        $body.appendChild(op_container);
    })

}

function impimirLogueo(){
    const nivel = sessionStorage.getItem('nivel');
    imprimirHead(nivel);
    imprimirBody(nivel);

    // eventos
    const $$options = document.querySelectorAll('.op_container');
    $$options.forEach(op =>{
        op.addEventListener('click', ()=>{
            if(op.getAttribute('data-option') == 'ingresar'){
                imprimirIngresar()
            }
            if(op.getAttribute('data-option') == 'registrarse'){
                imprimirRegistrarse()
            }
        })
    })
}

function imprimirIngresar(){
    const $body = document.querySelector('.body');
    $body.innerHTML = `
            <form action="" id="login" novalidate>
            <label for="user">User</label>
            <input type="user" id="user" name="user" placeholder="Nombre de usuario" required>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <button type="submit" class="btn">Ingresar</button>
            <p class="ir_registro">Registrar usuario nuevo</p>
        </form>`;

    // eventos
    const $$submit = document.querySelector('#login .btn');
    $$submit.addEventListener('click', (e)=>{
        e.preventDefault();
        const form = new FormData(document.querySelector('#login'));
        const data_user = {
            user: form.get('user'),
            password: form.get('password')
        };
        console.log(data_user);
        
        if(Object.values(data_user).includes('')){
            alert('Los campos deben estar completos','error');
        } else {
            verificarUsuario(data_user);
        }
    })
}

function imprimirRegistrarse(){    
    console.log('registro');
    const $body = document.querySelector('.body');
    $body.innerHTML = ``;
    
}

function impimirPanel(){
    console.log('panel');
    const $body = document.querySelector('.body');
    $body.innerHTML = ``;
    
}

function impimirPoryectos(){

}
function impimirObra(){

}
function impimirItems(){

}
function impimirDetalle(){

}

function verificarUsuario(data){

    // consulta BD
    const demo = {
        'user': 'juli',
        'password': '123456'
    }

    if(data.user === demo.user){
        if(data.password === demo.password){
            sessionStorage.setItem('nivel', 0);
            //localStorage.setItem('usuario', data.user);
            imprimir();
        } else {
            alert('Contraseña incorrecta','error');
        }
    } else {
        alert('Usuario no existe. Registre uno nuevo','error');  
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

