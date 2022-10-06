function login(){
    
let usuario = document.getElementById('nombre').value;
let clave = document.getElementById('clave').value;

    if (usuario!="" && clave!=""){
       location.href ='home.html';
       localStorage.setItem('dato', usuario);
    } else {
        alert('Usuario y clave son requeridos');
    }
}


document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click', ()=>{
        login();
    });
})

