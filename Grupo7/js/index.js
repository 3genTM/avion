$("#comprar").on("click", function(e) {
  e.preventDefault();
  let origen = $("#origen").val();
  let destino = $("#destino").val();
  let dia = $("#dia").val();
  let cant = $("#cant").val();
  let radio = $(".validar-radio")
    .filter(":checked")
    .val();

  if (!origen || !destino || dia.length == 0 || cant.length == 0 || !radio) {
    $("#errores").html(" *Todos los campos son requeridos.");
  } else {
    $("#errores").html(" ");
    $("#info-enviada").html(" Informacion enviada correctamente.");
    guardarDatos();
  }
});

function guardarDatos() {
  var jsonInfo;
  var info;

  //localStorage.clear(); //limpia

  var datosGuardados = localStorage.getItem("info");

  if (datosGuardados == null) {
    info = [];
  } else {
    info = JSON.parse(datosGuardados).info;
  }

  let data = {
    origen: $("#origen").val(),
    destino: $("#destino").val(),
    dia: $("#dia").val(),
    cant: $("#cant").val(),
    radio: $(".validar-radio")
      .filter(":checked")
      .val()
  };

  info.push(data);
  console.log(info);

  jsonInfo = {
    info: info,
    total: info.length
  };

  let dataStr = JSON.stringify(jsonInfo);
  localStorage.setItem("info", dataStr);

  $.ajax({
    url: "http://mariabelenalegre.com/adApi/avion/checkPasaje.php",
    type: "post",
    data: jsonInfo,
    success: function(response) {
      if (response) {
        alert("Ya puedes imprimir tu pasaje.");
      } else {
        alert("Error");
      }
    },
    error: function(response) {
      console.log("Error, vuelva a intentarlo.");
    }
  });

  //borrar datos
  var input = $("input");
  $.each(input, function(indice, elemento) {
    if (elemento.type != "button") {
      $(elemento).val("");
    }
  });
}
