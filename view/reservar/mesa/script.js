// ----------------------
// LISTAR PRODUCTOS
// ----------------------
ListarProductos('');

function ListarProductos() {
    const sala = document.getElementById('sala');
    const formdata = new FormData();
    const ajax = new XMLHttpRequest();

    ajax.open('POST', 'listar.php');

    ajax.onload = function() {
        if (ajax.status === 200) {
            try {
                const json = JSON.parse(ajax.responseText);
                let contenidoBotones = "";

                json.forEach(function(item) {
                    if (item.ocupado == 1) {
                        contenidoBotones += "<button type='button' class='btn btn-danger' onclick='eliminar(" + item.id_mesa + ", \"" + item.codigo + "\"," + item.ocupado + ")'><p><img src='./img/mesa 2.jpg' alt='" + item.sala + "'>" + item.codigo + " </p></button > ";
                    } else if (item.ocupado == 2) {
                        contenidoBotones += "<button type='button' class='btn btn-warning' onclick='eliminar(" + item.id_mesa + ", \"" + item.codigo + "\"," + item.ocupado + ")'><p><img src='./img/reservado.jpg' alt='" + item.sala + "'>" + item.codigo + "</p></button>";
                    } else if (item.ocupado == 3) {
                        contenidoBotones += "<button type='button' class='btn btn-danger' onclick='eliminar(" + item.id_mesa + ", \"" + item.codigo + "\"," + item.ocupado + ")'><p><img src='./img/mantenimiento.jpg' alt='" + item.sala + "'>" + item.codigo + "</p></button>";
                    } else {
                        contenidoBotones += "<button type='button' class='btn btn-success' onclick='eliminar(" + item.id_mesa + ", \"" + item.codigo + "\"," + item.ocupado + ")'><p><img src='./img/mesa.jpg' alt='" + item.sala + "'>" + item.codigo + "</p></button>";
                    }
                });

                sala.innerHTML = contenidoBotones;

            } catch (error) {
                console.error("Error al procesar la respuesta JSON:", error);
                sala.innerText = 'Error al cargar datos';
            }
        } else {
            sala.innerText = 'Error en la solicitud AJAX';
        }
    };
    ajax.send(formdata);
}

// ----------------------
// REGISTRAR/ACTUALIZAR NUEVO ELEMENTO (BOTÓN DEL FORMULARIO DE REGISTRO)
// ----------------------

function eliminar(id_mesa, codigo, ocupado) {
    Swal.fire({
        title: '¿Está seguro de reservar/cancelar reserva de la ' + ocupado + ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'NO'
    }).then((value) => {
        if (value.isConfirmed) {
            var formdata = new FormData();
            formdata.append('id_mesa', id_mesa);
            formdata.append('ocupado', ocupado);

            var ajax = new XMLHttpRequest();
            ajax.open('POST', './registrar.php');

            ajax.onload = function() {
                if (ajax.status === 200) {
                    if (ajax.responseText === "ok") {
                        Swal.fire({
                            icon: 'success',
                            title: 'La mesa ' + codigo + ' ha sido reservada',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            ListarProductos('');
                        });
                    } else if (ajax.responseText === "oky") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Se ha cancelado la reserva de la mesa ' + codigo + '',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            ListarProductos('');
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'No se puede reservar la ' + codigo + ' porque está ocupada',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            ListarProductos('');
                        });
                    }
                }
            };
            ajax.send(formdata);
        }
    });
}