// ----------------------
// ESCUCHAR EVENTO ACTUALIZAR FORMULARIO DEL FILTRO
// ----------------------

buscar.addEventListener("keyup", () => {
    const valor = buscar.value;
    if (valor == "") {
        Listarusuarios('');
    } else {
        Listarusuarios(valor);
    }
});

// ----------------------
// LISTAR PRODUCTOS
// ----------------------

Listarusuarios('');

function Listarusuarios(valor) {
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
                str += "<tr>";
                str += "<td>" + item.id_user + "</td>";
                str += "<td>" + item.username + "</td>";
                str += "<td class='td-reducido'>" + item.password + "</td>";
                str += "<td>" + item.nom + "</td>";
                str += "<td>" + item.name + "</td>";
                str += "<td>";
                str += "<button type='button' class='btn btn-success' onclick='Editar(" + item.id_user + ")'>Editar</button>";
                str += "<button type='button' class='btn btn-danger' onclick='Eliminar(" + item.id_user + ", \"" + item.nom + "\")'>Eliminar</button>";
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

function Editar(id_user) {
    var formdata = new FormData();
    formdata.append('id', id_user);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'editar.php');
    ajax.onload = function() {
        if (ajax.status === 200) {
            var json = JSON.parse(ajax.responseText);
            console.log(json);
            document.getElementById('idp').value = json.id_user;
            document.getElementById('username').value = json.username;
            document.getElementById('pwd').value = json.password;
            document.getElementById('nom').value = json.nom;
            document.getElementById('cargo').value = json.cargo;
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
                ListarProductos('');
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
                ListarProductos('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ese usuario ya existe',
                    showConfirmButton: false,
                    timer: 1500
                });
                registrar.value = "Registrar";
                idp.value = "";
                form.reset();
                ListarProductos('');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al realizar la operación.',
            });
        }
    }
    ajax.send(formdata);
});

// ----------------------
// ELIMINAR ELEMENTO (BOTÓN ROJO DEL LISTADO)
// ----------------------

function Eliminar(id, nom) {
    Swal.fire({
        title: 'Esta seguro de eliminar a ' + nom + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            var formdata = new FormData();
            formdata.append('id', id);
            var ajax = new XMLHttpRequest();
            ajax.open('POST', 'eliminar.php');
            ajax.onload = function() {
                if (ajax.status === 200) {

                    if (ajax.responseText == "ok") {
                        ListarProductos('');
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