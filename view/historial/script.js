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
                str += "<td>" + item.username + "</td>";
                str += "<td>" + item.codigo + "</td>";
                str += "<td class='td-reducido'>" + item.ocupacion_ini + "</td>";
                str += "<td>" + item.ocupacion_fin + "</td>";
                str += "<td>";
                str += "<button type='button' class='btn btn-danger' onclick='Eliminar(" + item.id_user + ")'>Eliminar</button>";
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