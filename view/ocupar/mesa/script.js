// ----------------------
// ESCUCHAR EVENTO ACTUALIZAR FORMULARIO DEL FILTRO
// ----------------------

// Descomentado si necesitas escuchar el evento "keyup" en un elemento con el id "buscar"
// buscar.addEventListener("keyup", () => {
//     const valor = buscar.value;
//     if (valor === "") {
//         ListarProductos('');
//     } else {
//         ListarProductos(valor);
//     }
// });

// ----------------------
// LISTAR PRODUCTOS
// ----------------------
ListarProductos('');

function ListarProductos() {
    var sala = document.getElementById('sala');
    var formdata = new FormData();
    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'listar.php');

    ajax.onload = function() {
        if (ajax.status === 200) {
            try {
                const json = JSON.parse(ajax.responseText);
                let contenidoBotones = "";

                json.forEach(function(item) {
                    if (item.ocupado == "1") {
                        contenidoBotones += "<button type='button' class='btn btn-danger' onclick='ocupar(" + item.id_mesa + ", \"" + item.codigo + "\", " + item.reservado + ", " + item.ocupado + ")'><p><img src='./img/mesa 2.jpg' alt='" + item.sala + "'>" + item.codigo + " Nº sillas: " + item.num_sillas + "</p></button>";
                    } else if (item.ocupado == "2") {
                        contenidoBotones += "<button type='button' class='btn btn-warning' onclick='ocupar(" + item.id_mesa + ", \"" + item.codigo + "\", " + item.reservado + ", " + item.ocupado + ")'><p><img src='./img/reservado.jpg' alt='" + item.sala + "'>" + item.codigo + " Nº sillas: " + item.num_sillas + "</p></button>";
                    } else if (item.ocupado == "3") {
                        contenidoBotones += "<button type='button' class='btn btn-danger' onclick='ocupar(" + item.id_mesa + ", \"" + item.codigo + "\", " + item.reservado + ", " + item.ocupado + ")'><p><img src='./img/mantenimiento.jpg' alt='" + item.sala + "'>" + item.codigo + " Nº sillas: " + item.num_sillas + "</p></button>";
                    } else {
                        contenidoBotones += "<button type='button' class='btn btn-success' onclick='ocupar(" + item.id_mesa + ", \"" + item.codigo + "\", " + item.reservado + ", " + item.ocupado + ")'><p><img src='./img/mesa.jpg' alt='" + item.sala + "'>" + item.codigo + " Nº sillas: " + item.num_sillas + "</p></button>";
                    }
                });
                sala.innerHTML = contenidoBotones;
            } catch (error) {
                sala.innerText = 'Error al cargar datos';
            }
        } else {
            sala.innerText = 'Error en la solicitud AJAX';
        }

    };
    ajax.send(formdata);
}

// ----------------------
// ACTUALIZAR ELEMENTO
// ----------------------

function ocupar(id_mesa, codigo, reservado, ocupado) {
    Swal.fire({
        title: '¿Está seguro de ocupar/desocupar la mesa ' + codigo + ' ?',
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
            formdata.append('reservado', reservado);
            formdata.append('ocupado', ocupado);

            var ajax = new XMLHttpRequest();
            ajax.open('POST', './registrar.php');

            ajax.onload = function() {
                if (ajax.status === 200) {
                    if (ajax.responseText === "ocupada") {
                        Swal.fire({
                            icon: 'success',
                            title: 'La mesa ' + codigo + ' ha sido ocupada',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            ListarProductos('');
                        });
                    } else if (ajax.responseText === "error") {
                        Swal.fire({
                            icon: 'warning',
                            title: 'No se puede ocupar la ' + codigo + ' porque está reservada o en mantenimiento',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            ListarProductos('');
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Se ha desocupado la mesa ' + codigo + '',
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