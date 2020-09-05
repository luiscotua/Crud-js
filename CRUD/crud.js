console.log('Registro Empleado')

firebase.initializeApp({
  apiKey: "AIzaSyBzDIr63Q7ZK8uR_OkWSrtcY0uiyJ5Bu4E",
  authDomain: "prueba-ee598.firebaseapp.com",
  projectId: "prueba-ee598"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//agregar registros
function guardar(){

	var tipo = document.getElementById('tipo').value;
	var numero = document.getElementById('numero').value;
	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var fecha = document.getElementById('fecha').value;
	var area = document.getElementById('area').value;

	db.collection("users").add({
	tipo: tipo,
	num: numero,
    first: nombre,
    last: apellido,
    born: fecha,
    area: area
})
.then(function(docRef) {
    console.log("Registro con id: ", docRef.id);
    document.getElementById('tipo').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('fecha').value = "";
    document.getElementById('area').value = "";
})
.catch(function(error) {
    console.error("Error al agregar el registro: ", error);
});

}

//leer registro
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
	tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
		  <th scope="row">${doc.id}</th>
		  <td>${doc.data().tipo}</td>
		  <td>${doc.data().num}</td>
		  <td>${doc.data().first}</td>
		  <td>${doc.data().last}</td>
		  <td>${doc.data().born}</td>
		  <td>${doc.data().area}</td>
		  <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
		  <td><button class="btn btn-warnig" onclick="modificar('${doc.id}','${doc.data().tipo}','${doc.data().num}','${doc.data().first}','${doc.data().last}','${doc.data().born}','${doc.data().area}')">Modificar</button></td>
		</tr>
		`
    });
});

//borrar registro
function eliminar(id){
	db.collection("users").doc(id).delete().then(function() {
    	console.log("Registro borrado correctamente");
	}).catch(function(error) {
    	console.error("Error al borrar el registro", error);
	});

}

//modificar registro
function modificar(id,tipo,numero,nombre,apellido,fecha,area){
	document.getElementById('tipo').value = tipo;
	document.getElementById('numero').value = numero;
	document.getElementById('nombre').value = nombre;
	document.getElementById('apellido').value = apellido;
	document.getElementById('fecha').value = fecha;
	document.getElementById('area').value = area;

	var boton = document.getElementById('boton');
	boton.innerHTML = 'Modificar';

	boton.onclick = function(){
		var washingtonRef = db.collection("users").doc(id);

		var tipo = document.getElementById('tipo').value;
		var numero = document.getElementById('numero').value;
		var nombre = document.getElementById('nombre').value;
		var apellido = document.getElementById('apellido').value;
		var fecha = document.getElementById('fecha').value;
		var area = document.getElementById('area').value;

		return washingtonRef.update({
			tipo: tipo,
			num: numero,
		    first: nombre,
		    last: apellido,
		    born: fecha,
		    area: area
		})
		.then(function() {
		    console.log("Registro actualizado correctamente");
        boton.innerHTML = 'Guardar';
		    boton.onclick = guardar;
		    document.getElementById('tipo').value = "";
		    document.getElementById('numero').value = "";
		    document.getElementById('nombre').value = "";
		    document.getElementById('apellido').value = "";
		    document.getElementById('fecha').value = "";
		    document.getElementById('area').value = "";
		})
		.catch(function(error) {
		    console.error("Error al actualizar el registro", error);
		});
	}

}
