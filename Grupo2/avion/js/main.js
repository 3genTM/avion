var valido = true;
var pasajesArray;
var pasajeStorage = localStorage.getItem('pasajes').Pasajes;

if (pasajeStorage==null) {
  pasajesArray=[]
  console.log(pasajesArray)
}else{
  pasajesArray = pasajeStorage

  console.log(pasajesArray)
}

function validar(){

  var origen=$("#origen option:selected").val();
  var destino=$("#destino").find("option:selected").val();
  var fecha = $('#fecha').val();
  var cantidad = $("#cant").val();
  var asiento = $("input[name=asiento]:checked").val();


      if (origen == -1 ) {
        alert('Completar origen');
        valido = false;

      }

      if (destino == -1) {
        alert('Completar destino');
        valido = false;
      }

      if (!fecha) {
        alert("Elegir fecha");
        valido = false;
      }

      if (cantidad <= 0 || cantidad == "") {
        alert('Completar cantidad');
        valido = false;
      }

      if (!asiento) {
          alert("Seleccionar asiento");
          valido = false;
        }

}


$("button").on("click", function(e){
  e.preventDefault();
  validar();

if (valido == true){

    var pasaje = {
     origen: $("#origen option:selected").val(),
     destino : $("#destino").find("option:selected").val(),
     fecha: $('#fecha').val(),
     cantidad : $("#cant").val(),
    asiento : $("input[name=asiento]:checked").val()

      }

      pasajesArray.push(pasaje);
      pasajeJson={
        'Pasajes':pasajesArray
      }

      localStorage.setItem('pasajes', JSON.stringify(pasajeJson));

    }
    console.log(pasajeStorage);
});
