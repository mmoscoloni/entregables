let socket = io.connect(); 
let template = Handlebars.compile(`
        <h1>Vista de Productos</h1>
            <br>

            {{#if hayProductos}} 
                <div class="table-responsive">
                    <table class="table table-dark">
                        <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
                        {{#each hayProductos}}
                            <tr> <td>{{this.title}}</td> <td>$ {{this.price}}</td> <td><img width="50" src={{this.thumbnail}} alt="not found"></td> </tr>
                        {{/each}}
                    </table>
                </div>
            {{else}}  
                <h3 class="alert alert-warning">No se encontraron productos</h3>
            {{/if}}
        <a href="/" class="btn btn-info m-3">Volver</a>
`)


const socket = io.connect();

const form = document.querySelector('#formulario')
const inputTitle = document.querySelector('#input-title')
const inputPrice = document.querySelector('#input-price')
const inputImg = document.querySelector('#input-img')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = inputTitle.value.trim()
    const price = inputPrice.value.trim()
    const thumbnail = inputImg.value.trim()

    if (title.length < 1) {return}
    if (price.length < 1) {return}
    if (thumbnail.length < 1) {return}

    // envio el objeto con socket
    socket.emit('guardar', {
        title: title,
        price: price,
        thumbnail: thumbnail
    })

    inputTitle.value = ''
    inputPrice.value = ''
    inputImg.value = ''
})

// actualizo template con la data del server
socket.on('actualizar', data => {
    let html = template({hayProductos: data})
    document.querySelector("#lista-productos").innerHTML = html
});

socket.on('productos', function(productos) { 
    //console.log(productos);
    document.getElementById('datos').innerHTML = data2TableJS(productos)
    /* data2TableHBS(productos, html => {
        document.getElementById('datos').innerHTML = html
    }) */
});

const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()

    const data = {title: form[0].value, price: form[1].value, thumbnail: form[2].value}
    //console.log(data)

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then( productos => {
        //console.log(productos)
        //document.getElementById('datos').innerHTML = data2Table(productos)
        form.reset()
        socket.emit('update', 'ok');         
    })
    .catch(error => console.error(error))
})


function data2TableJS(productos) {
    let res = ''
    if(productos.length) {
        res += `
        <style>
            .table td, .table th {
                vertical-align : middle;
            }
        </style>
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th> </tr>
        `
        res += productos.map(producto => `
                <tr>
                    <td>${producto.title}</td>
                    <td>$${producto.price}</td>
                    <td><img width="50" src="${producto.thumbnail}" alt="not found"></td>
                </tr>
        `).join(' ')
        res += `
            </table>
        </div>`
    }
    return res
}

function data2TableHBS(productos,cb) {
    
    fetch('plantillas/tabla.hbs')
    .then(respuesta => respuesta.text())
    .then( plantilla => {
        console.log('------- plantilla --------')
        console.log(plantilla)

        console.log('---------- html ----------')
        var template = Handlebars.compile(plantilla);
        let html = template({ productos })
        console.log(html)

        cb(html)
    })
}
