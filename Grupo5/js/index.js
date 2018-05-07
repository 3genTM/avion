// VALIDAR FORMULARIO
var obligatorio = $('.obligatorio');
var mjeFechaObligatorio=$('.mjeFechaObligatorio');
var mjeObligatorio=$('.mjeObligatorio');
var fechaObligatorio=$('#fecha');
var pasillo=$('#pasillo');
var ventana=$('#ventana');
var mjeRadioObligatorio=$('.mjeRadioObligatorio');


function validarFormulario(){
    var valido = true;
	console.log(obligatorio)

//valida obligatorios
$.each(obligatorio, function(i,e){
	console.log('no carga');
	if(e.value==-1){
		valido=false;
		
		mjeObligatorio[i].innerHTML="Campo obligatorio";
	}else { 
		mjeObligatorio[i].innerHTML="";

	}
});

//valida fecha
console.log(fechaObligatorio);
if (fechaObligatorio.val()=="") {
	console.log('entra fecha');
	valido=false;
	mjeFechaObligatorio.text('Campo obligatorio')
}else{
	mjeFechaObligatorio.text('');
}


// validar Radio Button
if (pasillo.checked==true) { //valida selección de ubicacion
    console.log("pasillo checked");
	mjeRadioObligatorio.text('');    
}else if (ventana.checked==true) { //valida selección de ubicacion
    console.log("ventana checked");
	mjeRadioObligatorio.text(''); 

}else{

	mjeRadioObligatorio.text('Campo obligatorio'); 
        console.log('siiii');
        valido=false;
}
	console.log (pasillo.checked);
	console.log (ventana.checked);
    return valido;
}




$('#comprar').on('click',function(e){
	

	validarFormulario();
	
});



