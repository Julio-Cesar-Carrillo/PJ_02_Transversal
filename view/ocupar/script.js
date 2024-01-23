// ----------------------
// LISTAR PRODUCTOS
// ----------------------
document.addEventListener('DOMContentLoaded', ListarProductos);

function ListarProductos() {
    // Selecciona los elementos por su ID
    var sala = document.getElementById('sala');
    var sala2 = document.getElementById('sala2');
    var sala3 = document.getElementById('sala3');

    // Crea una instancia de FormData
    var formdata = new FormData();
    // Crea una instancia de XMLHttpRequest
    var ajax = new XMLHttpRequest();

    // Configura la solicitud POST a 'listar.php'
    ajax.open('POST', 'listar.php');

    // Configura la función que se ejecutará cuando la solicitud haya terminado
    ajax.onload = function() {
        if (ajax.status === 200) {
            // Convierte la respuesta JSON a un objeto JavaScript
            let json = JSON.parse(ajax.responseText);
            // Inicializa las cadenas de botones para cada tipo de sala
            let mesas = "";
            let mesas2 = "";
            let mesas3 = "";

            // Itera sobre los elementos en el JSON y crea los botones correspondientes
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
                // Agrega el botón al tipo de sala correspondiente
                if (item.tipo === "Sala privada") {
                    mesas += buttonHtml;
                } else if (item.tipo === "Comedor") {
                    mesas2 += buttonHtml;
                } else {
                    mesas3 += buttonHtml;
                }
            });

            // Asigna los botones a los elementos correspondientes en el HTML
            sala.innerHTML = mesas;
            sala2.innerHTML = mesas2;
            sala3.innerHTML = mesas3;
        } else {
            // Si hay un error, muestra "Error" en lugar de los botones
            sala.innerText = 'Error';
        }
    };

    // Envía la solicitud con FormData vacío
    ajax.send(formdata);
}