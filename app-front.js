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
    
    //imprimir();
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

