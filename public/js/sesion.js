let cerrarr = document.querySelectorAll('.closee')[0];
let abrirr = document.querySelectorAll('.ingresa')[0];
let modall = document.querySelectorAll('.modall')[0];
let modalcc = document.querySelectorAll('.modal-containerr')[0];

abrirr.addEventListener('click', function(e){
  e.preventDefault();
  modalcc.style.opacity = "1";
  modalcc.style.visibility = "visible";
  modall.classList.toggle('modal-closee');

});

cerrarr.addEventListener('click', function(){
  modall.classList.toggle('modal-closee');

  setTimeout(function(){
    modalcc.style.opacity = "0";
    modalcc.style.visibility = "hidden";
  },850)
});

window.addEventListener('click', function(e){
  console.log(e.target)
  if(e.target == modalcc){
    modall.classList.toggle('modal-closee');
  
  setTimeout(function(){
    modalcc.style.opacity = "0";
    modalcc.style.visibility = "hidden";
  },850)
  }
  }) 




