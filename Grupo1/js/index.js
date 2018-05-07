var jsonTrip = {};
var savedTrips = JSON.parse(localStorage.getItem("jsonTrip"));
var myTrips = savedTrips ? savedTrips.trips : [];

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
  var test = item => item.checked;
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
  }
});
