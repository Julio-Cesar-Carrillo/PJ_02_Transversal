// ----------------------
// LISTAR PRODUCTOS
// ----------------------
function ListarProductos() {
    var sala = document.getElementById('sala');
    var sala2 = document.getElementById('sala2');
    var sala3 = document.getElementById('sala3');
    var formdata = new FormData();
    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'listar.php');

    ajax.onload = function() {
        if (ajax.status == 200) {
            let json = JSON.parse(ajax.responseText);
            let mesas = "";
            let mesas2 = "";
            let mesas3 = "";

            json.forEach(function(item) {
                var buttonHtml = `
                                    <a href='./mesa/index.php?id_sala=${item.id_sala}&nom_sala=${item.nom}'> 
                                    <button class='btn btn-success'>
                                    <p>${item.nom}</p>
                                    <img src='./img/${item.tipo.toLowerCase()}.jpg' alt='Editar Mesas'>
                                    <p>${item.tipo}</p>
                                    </button>
                                    </a>
                                `;
                if (item.tipo == "Sala privada") {
                    mesas += buttonHtml;
                } else if (item.tipo == "Comedor") {
                    mesas2 += buttonHtml;
                } else {
                    mesas3 += buttonHtml;
                }
            });

            sala.innerHTML = mesas;
            sala2.innerHTML = mesas2;
            sala3.innerHTML = mesas3;
        } else {
            // Cambié resultado por sala (asumo que sala es el elemento adecuado)
            sala.innerText = 'Error';
        }
    }

    ajax.send(formdata);
}

// Llamada a la función ListarProductos() con un argumento vacío (puedes quitar el argumento si no lo necesitas)
ListarProductos('');


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
        } else {
            console.error("Error al obtener datos para la edición");
        }
    };
    ajax.send(formdata);
}


// ----------------------
// REGIsala3AR/ACTUALIZAR NUEVO ELEMENTO (BOTÓN DEL FORMULARIO DE REGIsala3O)
// ----------------------

regisala3ar.addEventListener("click", () => {
    var form = document.getElementById('frm');
    var formdata = new FormData(form);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'regisala3ar.php');
    ajax.onload = function() {
        if (ajax.status === 200) {
            if (ajax.responseText === "ok") {
                Swal.fire({
                    icon: 'success',
                    title: 'Regisala3ado',
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
                regisala3ar.value = "Regisala3ar";
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