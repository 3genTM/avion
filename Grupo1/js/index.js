var jsonTrip = {};
var savedTrips = JSON.parse(localStorage.getItem("jsonTrip"));
var myTrips = savedTrips ? savedTrips.trips : []; // operador ternario equivale a:
// if (savedTrips) {
//   myTrips = savedTrips.trips;
// } else {
//   myTrips = []
// }

// Checking empty fields
function validate() {
  var result = true;
  if (!$('#origen').val()) {
    $('#errorOrigen').html('CAMPO OBLIGATORIO');
    result = false;
  };
  if (!$('#destino').val()) {
    $('#errorDestino').html('CAMPO OBLIGATORIO');
    result = false;
  };

  if (!$('#date').val()) {
    $('#errorDate').html('CAMPO OBLIGATORIO');
    result = false;
  }
  if (!$('#cantidad').val()) {
    $('#errorCantidad').html('CAMPO OBLIGATORIO');
    result = false;
  };

  if (!checkRadioBtn()) {
    result = false;
    $('#errorUbicación').html('CAMPO OBLIGATORIO');
  }
  return result
}

// Check Radio Buttons
function checkRadioBtn() {
  var test = item => item.checked; // Equivale a:
// function(item) {
  // return item.checked
// }
  var opciones = Array.from($('.selectSeat'));
  return opciones.some(test);
}

// Clean Form Function
function cleanAll (){
  var inputs = Array.from(document.getElementsByTagName('input'));
  var selects = Array.from(document.getElementsByTagName('select'));
  inputs.forEach(element => element.value = "")
  selects.forEach(element => element.value = "-1")
}

// Clean Errors Function
function cleanErrors() {
  var errors = Array.from(document.getElementsByClassName('error'));
  errors.forEach(element => element.textContent = "")
}

// Save my trip function
function saveTrip() {
  let newTrip = {
    origen: $("#origen option:selected").text(),
    destino: $("#destino option:selected").text(),
    fecha: $("#date").val(),
    cantidad: $("#cantidad").val(),
    ubicación: $(".selectSeat:checked").val()
  };
  myTrips.push(newTrip);
  jsonTrip = {
    "trips": myTrips,
    "total": myTrips.length
  };
  localStorage.setItem("jsonTrip", JSON.stringify(jsonTrip));
  console.log(jsonTrip)
};

//Main button action
$("#comprar").on("click",function() {
  event.preventDefault();
  cleanErrors();
  if (validate()) {
    saveTrip();
    cleanAll();
    let jsonTripString = JSON.stringify(jsonTrip);
    $.ajax({
      url: "http://mariabelenalegre.com/adApi/avion/checkPasaje.php",
      type: "post",
      data: jsonTripString,
      success: function (response) {
        console.log(response);
        if(response){
          let resultado = JSON.parse(response);
          console.log(resultado.mensaje);
          alert("Ok");
        }else{
          alert("Error"); // Si esta vacio
          console.log(response);
        }
      },
      error: function(response) {
        console.log("error");
      }
    });
    // $.ajax({
    //   url: "http://mariabelenalegre.com/adApi/avion/checkPasaje.php",
    //   type: "post",
    //   data: jsonTripString,
    //   success: function (response) {
    //     if (response == 1) {
    //       alert("Ok");
    //     } else {
    //       alert("Error");
    //     }
    //   },
    //   error: function(response) {
    //     console.log("error");
    //   }
    // });
  }
});
