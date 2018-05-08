// VALIDAR FORMULARIO
var obligatorio = $('.obligatorio');
var mjeFechaObligatorio=$('.mjeFechaObligatorio');
var mjeObligatorio=$('.mjeObligatorio');
var fechaObligatorio=$('#fecha');
var mjeRadioObligatorio=$('.mjeRadioObligatorio');


function validarFormulario(){
    var valido = true;

	console.log(obligatorio)

//valida obligatorios
$.each(obligatorio, function(i,e){
	if(e.value==-1){
		valido=false;
		
		mjeObligatorio[i].innerHTML="Campo obligatorio";
	}else { 
		mjeObligatorio[i].innerHTML="";

	}
});

//valida fecha
if (fechaObligatorio.val()=="") {
	valido=false;
	mjeFechaObligatorio.text('Campo obligatorio')
}else{
	mjeFechaObligatorio.text('');
}

// validar Radio Button
if ($('input[name="ubicacion"]').is(':checked'))  { //valida selección de ubicacion
	mjeRadioObligatorio.text('');    
}else{
	mjeRadioObligatorio.text('Campo obligatorio'); 
        valido=false;
}
    return valido;
}


$('#comprar').on('click',function(e){
	if (validarFormulario()){
		var form=$('#form');
		form.submit();
		console.log('envia reserva');
		window.alert("reservado");
	}
	
});

