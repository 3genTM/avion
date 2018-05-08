$("#comprar").on("click", function(e) {
  e.preventDefault();
  let origen = $("#origen").val();
  let destino = $("#destino").val();
  let dia = $("#dia").val();
  let cant = $("#cant").val();
  let radio = $(".validar-radio")
    .filter(":checked")
    .val();

  if (
    origen.length == 0 ||
    destino.length == 0 ||
    dia.length == 0 ||
    cant.length == 0 ||
    !radio
  ) {
    $("#errores").html(" *Todos los campos son requeridos.");
  } else {
    $("#errores").html(" ");
    $("#info-enviada").html(" Informacion enviada correctamente.");

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
  }
});

