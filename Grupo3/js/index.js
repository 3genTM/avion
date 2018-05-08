function validarForm (){
 var obligatorio = $(".Obligatorio");
 var error = $('.error');
 var valido = true;

 for(var i=0;i<obligatorio.length; i++){
  //VALIDAR SELECTS ORIGEN Y DESTINO
   if (obligatorio[i].tagName == "SELECT") {
      if (obligatorio[i].value < 0) {
        error[i].innerHTML= 'Campo Obligatorio';
        valido = false;
      }
    }

  if (obligatorio[i].tagName == 'INPUT'){
    if(obligatorio[i].value.length == 0){
      error[i].innerHTML= 'Campo Obligatorio';
      valido = false;
    }
  }
  }

  if (valido == true) {
  crearObjeto();
}
}



function crearObjeto(){
  var pasaje = {
    origen: $('#origen').val(),
    destino: $('#destino').val(),
    fecha: $('#fecha').val(),
    cantidad: $('#cantidad').val(),
    ubicacion: $('.ubicacion:checked').val()
  }

  var pasajeJSON = JSON.stringify(pasaje);
  console.log(pasajeJSON)

                       
 $.ajax({
          url: "http://mariabelenalegre.com/adApi/avion/checkPasaje.php",
          type: "post",
          data: pasajeJSON,
          success: function (response) {
                                                     
            if(response == 1){
                                                 
                   alert("Ok");
            }else{
                    alert("Error");
            }        
          },
          error: function(response) {
                  console.log("error");
          }
        }); 
}

$('#comprar').on("click" , (e)=>{
  validarForm();
})
