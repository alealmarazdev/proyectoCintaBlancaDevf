window.onload = function () {
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Cafe o té',
            precio: 10,
            image: 'cafe.jpg'
        },
        {
            id: 2,
            nombre: 'Jugo',
            precio: 15,
            image: 'jugo.jpg'
        },
        {
            id: 3,
            nombre: 'Chilaquiles',
            precio: 50,
            image: 'chilaquiles.jpg'
        },
        {
            id: 4,
            nombre: 'Baguette especial',
            precio: 70,
            image: 'bruschetta.jpg'
        },
        {
            id: 5,
            nombre: 'Comida completa de dos tiempos',
            precio: 60,
            image: 'comidados.jpg'
        },
        {
            id: 6,
            nombre: 'Especial de tres tiempos',
            precio: 80,
            image: 'comidatres.jpg'
        },

    ]
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total span');
    function renderItems() {
        for (let info of baseDeDatos) {
            let miNodo = document.createElement('div');
            miNodo.classList.add('box', 'col-sm-4');

            let miNodoCardImage = document.createElement('div');
            miNodoCardImage.classList.add('card-image');
            miNodoCardImage.style.backgroundImage = `url('img/${info["image"]}')`;

            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');

            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];

            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = '$' + info['precio'];

            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.innerHTML = '+';

            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            miNodo.appendChild(miNodoCardImage);
            $items.appendChild(miNodo);
        }
    }
    function anyadirCarrito() {
        carrito.push(this.getAttribute('marcador'))
        calcularTotal();
        renderizarCarrito();
    }
    function renderizarCarrito() {
        $carrito.textContent = '';
        carrito.forEach(function (item, indice) {
            let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right');
            miNodo.textContent = `${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.innerHTML = 'x';
            miBoton.setAttribute('posicion', indice);
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }
    function borrarItemCarrito() {
        let posicion = this.getAttribute('posicion');
        carrito.splice(posicion, 1);
        renderizarCarrito();
        calcularTotal();
    }
    function calcularTotal() {
        total = 0;
        for (let item of carrito) {
            let miItem = baseDeDatos.filter(function (itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        let totalDosDecimales = total.toFixed(2);
        $total.textContent = totalDosDecimales;
    }
    renderItems();
}
