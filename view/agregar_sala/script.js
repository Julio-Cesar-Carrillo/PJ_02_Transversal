// ----------------------
// ESCUCHAR EVENTO ACTUALIZAR FORMULARIO DEL FILTRO
// ----------------------

buscar.addEventListener("keyup", () => {
    const valor = buscar.value;
    if (valor == "") {
        Listamesas('');
    } else {
        Listamesas(valor);
    }
});

// ----------------------
// LISTAR PRODUCTOS
// ----------------------
Listamesas('');

function Listamesas(valor) {
    var resultado = document.getElementById('resultado');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'listar.php');
    ajax.onload = function() {
        let str = "";
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            json.forEach(function(item) {
                str += "<td>" + item.nom + "</td>";
                str += "<td>" + item.tipo + "</td>";
                str += "<td>";
                str += "<button type='button' class='btn btn-success' onclick='Editar(" + item.id_sala + ")'>Editar</button>";
                str += "<button type='button' class='btn btn-danger' onclick='Eliminar(" + item.id_sala + ")'>Eliminar</button>";
                str += "<a class='btn btn-success' href='agregar_mesa/index.php?id_sala=" + item.id_sala + "&nom_sala=" + item.nom + "'>Editar mesas</a>";
                str += "</td> ";
                str += "</tr>";
            });

            resultado.innerHTML = str;

        } else {
            resultado.innerText = 'Error';
        }
    }
    ajax.send(formdata);
}


// ----------------------
// EDITAR ELEMENTO (BOTÓN VERDE DEL LISTADO)
// ----------------------

function Editar(id) {
    var formdata = new FormData();
    formdata.append('id', id);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'editar.php');
    ajax.onload = function() {
        if (ajax.status === 200) {
            var json = JSON.parse(ajax.responseText);
            console.log(json);
            document.getElementById('idp').value = json.id_sala;
            document.getElementById('nom').value = json.nom;
            document.getElementById('tipo').value = json.tipo;
            document.getElementById('registrar').value = "Editar";
        } else {
            console.error("Error al obtener datos para la edición");
        }
    };
    ajax.send(formdata);
}


// ----------------------
// REGISTRAR/ACTUALIZAR NUEVO ELEMENTO (BOTÓN DEL FORMULARIO DE REGISTRO)
// ----------------------

registrar.addEventListener("click", () => {
    var form = document.getElementById('frm');
    var formdata = new FormData(form);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'registrar.php');
    ajax.onload = function() {
        if (ajax.status === 200) {
            if (ajax.responseText === "ok") {
                Swal.fire({
                    icon: 'success',
                    title: 'Registrado',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
                Listamesas('');
            } else if (ajax.responseText === "modificado") {
                Swal.fire({
                    icon: 'success',
                    title: 'Modificado',
                    showConfirmButton: false,
                    timer: 1500
                });
                registrar.value = "Registrar";
                idp.value = "";
                form.reset();
                Listamesas('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se puedo realizar la acción',
                    showConfirmButton: false,
                    timer: 1500
                });
                registrar.value = "Registrar";
                idp.value = "";
                form.reset();
                Listamesas('');
            }
        }
    }
    ajax.send(formdata);
});


// ----------------------
// ELIMINAR ELEMENTO (BOTÓN ROJO DEL LISTADO)
// ----------------------

function Eliminar(id_sala) {
    Swal.fire({
        title: 'Esta seguro de eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            var formdata = new FormData();
            formdata.append('id', id_sala);
            var ajax = new XMLHttpRequest();
            ajax.open('POST', './eliminar.php');
            ajax.onload = function() {
                if (ajax.status === 200) {
                    if (ajax.responseText == "ok") {
                        Listamesas('');
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            }
            ajax.send(formdata);
        }
    })
}