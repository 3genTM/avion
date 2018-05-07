	///////VARIABLES//////
	var name = $('input:radio[name=ubicacion]:checked');
	//console.log(name);
	var ticket = {

	};
	var pasajes = [];
	var valido = true;
	//////FUNCIONES//////

	function validarFormulario(){
		valido = true;
		var obligatorio = document.getElementsByClassName('obligatorio');
		var error = document.getElementsByClassName('error');
		//console.log(error)
		for (var i = 0; i< obligatorio.length; i++) {
			//Chequea los select
			if(obligatorio[i].value == "0"){
				error[i].innerHTML = "Campo obligatorio";
				valido = false;
			}else{
				error[i].innerHTML = "";
			}
			//Chequea los radio buttons
			var ventana = document.getElementById('ventana');
			var pasillo = document.getElementById('pasillo');
			if(ventana.checked || pasillo.checked) {
					error_ubicacion.innerHTML = "";
			}else {	
				error_ubicacion.innerHTML = "Seleccione una opción";
				valido = false;
			}
			//Chequeando fecha
			var fecha = document.getElementById("fecha").value;
			if(fecha==""){
				//console.log("WHY");
				var next = $("#fecha").next();
				//console.log(next);
				next.text("Seleccione una fecha");
				valido = false;
			}
		}
		if(valido==false){
			return;
		}else{
			armarJSON();
		}

	}
	//CREO EL OBJETO JSON

	function armarJSON() {
	ticket.origen = $("#origen :selected").text();
	ticket.destino = $("#destino :selected").text();
	ticket.cantidad = $("#cantidad :selected").text();
	ticket.fecha = $("#fecha").val();
	var ventana = $("#ventana");
	var pasillo = $("#pasillo");

	if(ventana.checked==true){
		ticket.ubicacion = "ventana";
	}else{
		ticket.ubicacion = "pasillo"
	}
	pasajes.push(ticket);
	var stringPasajes = JSON.stringify(pasajes);
	localStorage.setItem = ("pasajes", stringPasajes);
	console.log("ticket"+JSON.stringify(ticket));
	console.log("pasajes"+JSON.stringify(pasajes));

	$.ajax({
          url: "http://mariabelenalegre.com/adApi/avion/checkPasaje.php",
          type: "post",
          data: pasajes,
          success: function (response) {
                                                     
            if(response){
                                         
                   console.log("Ok");
            }else{
                    console.log("Error");
            }        
          },
          error: function(response) {
                  console.log("error");
          }
        }); 
	}	


	////LLAMADAS////////
	$("#boton").on('click', function(){
		validarFormulario();
		console.log(valido);
		if(valido==true){
		console.log("VAAAAALIDO");
		armarJSON();
		}else{
			console.log("probemos de nuevo");
		}

	})