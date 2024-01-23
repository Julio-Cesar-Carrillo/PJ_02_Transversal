// ----------------------
// ESCUCHAR EVENTO ACTUALIZAR FORMULARIO DEL FILTRO
// ----------------------

buscar.addEventListener("keyup", () => {
    const valor = buscar.value;
    if (valor == "") {
        ListarProductos('');
    } else {
        ListarProductos(valor);
    }
});

// ----------------------
// LISTAR PRODUCTOS
// ----------------------
ListarProductos('');

function ListarProductos(valor) {
    var resultado = document.getElementById('resultado');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'listar.php');
    ajax.onload = function() {
        var str = "";
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = '';
            json.forEach(function(item) {
                const estadosMesa = {
                    0: 'Libre',
                    1: 'Ocupado',
                    2: 'Reservado',
                    3: 'Mantenimiento'
                };

                let str = `
                    <tr>
                        <td>${item.codigo}</td>
                        <td>${estadosMesa[item.ocupado]}</td>
                        <td>${item.num_sillas}</td>
                        <td>
                            <button type='button' class='btn btn-success' onclick='Editar(${item.id_mesa})'>Editar</button>
                            <button type='button' class='btn btn-danger' onclick='Eliminar(${item.id_mesa})'>Eliminar</button>
                        </td>
                    </tr>
                `;

                tabla += str;
            });

            resultado.innerHTML = tabla;

        } else {
            resultado.innerText = 'Error';
        }
    }
    ajax.send(formdata);
}

// ----------------------
// EDITAR ELEMENTO (BOTÓN VERDE DEL LISTADO)
// ----------------------

function Editar(id_mesa) {
    var formdata = new FormData();
    formdata.append('id', id_mesa);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'editar.php');
    ajax.onload = function() {
        if (ajax.status === 200) {
            var json = JSON.parse(ajax.responseText);
            console.log(json.id_mesa);
            document.getElementById('idp').value = json.id_mesa;
            document.getElementById('cod').value = json.codigo;
            document.getElementById('ocup').value = json.ocupado;
            document.getElementById('num').value = json.num_sillas;
            document.getElementById('reserva').value = json.reservado;
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
            } else {
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

function Eliminar(id) {
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