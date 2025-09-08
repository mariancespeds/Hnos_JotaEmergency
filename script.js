const productosJSON= [
    {
      "id": "prod_01",
      "name": "Aparador Uspallata",
      "description": "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón...",
      "image": "./assets/AparadorUspallata.png"
    },
    {
      "id": "prod_02",
      "name": "Biblioteca Recoleta",
      "description": "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro...",
      "image": "./assets/BibliotecaRecoleta.png"
    },
    {
      "id": "prod_03",
      "name": "Butaca Mendoza",
      "description": "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú...",
      "image": "./assets/ButacaMendoza.png"
    },
    {
      "id": "prod_04",
      "name": "Sillón Copacabana",
      "description": "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna...",
      "image": "./assets/SillonCopacabana.png"
    },
    {
      "id": "prod_05",
      "name": "Mesa de Centro Araucaria",
      "description": "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal...",
      "image": "./assets/MesadeCentroAraucaria.png"
    }
];
async function getProductsAsync(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(productosJSON);
        }, 2000);
    })
}
function renderProducts(productos){
    const container=document.getElementById('products-container');
    container.innerHTML='';
    const shuffledProducts = productos.sort(() => 0.5 - Math.random());
    const productosDestacados = shuffledProducts.slice(0, 3);
    productosDestacados.forEach(producto => {
         const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-id', producto.id);

        productCard.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>${producto.description}</p>
            <button class="add-to-cart">Añadir al carrito</button>
        `;
        container.appendChild(productCard);
    });
}
async function init(){
    console.log("Iniciando carga de datos...");
    const container =document.getElementById('products-container');
    container.innerHTML='<p> Cargando productos...</p>';
    try {
        const productos = await getProductsAsync();
        renderProducts(productos);

        // Delegación de eventos para el botón
        container.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart')) {
                const productCard = event.target.closest('.product-card');
                const productId = productCard.getAttribute('data-id');
                console.log(`Producto con ID: ${productId} añadido al carrito.`);
            }
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        container.innerHTML = '<p>Lo sentimos, no pudimos cargar los productos.</p>';
    }
}
document.addEventListener('DOMContentLoaded',init);
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        // Previene el envío del formulario por defecto
        e.preventDefault();

        // Oculta  mensajes de error al inicio
        hideAllErrors();
        
        let isValid = true;

        // Valida el nombre
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Por favor, ingresa tu nombre.';
            nameError.classList.add('show-error');
            isValid = false;
        }

        // Valida el email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Por favor, ingresa tu email.';
            emailError.classList.add('show-error');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Por favor, ingresa un email válido.';
            emailError.classList.add('show-error');
            isValid = false;
        }
        
        // Valida el mensaje
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Por favor, ingresa tu mensaje.';
            messageError.classList.add('show-error');
            isValid = false;
        }

        //  muestra el mensaje de éxito
        if (isValid) {
            form.style.display = 'none'; // Oculta el formulario
            successMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
            successMessage.classList.add('show-success');
        }
    });

    //validar el formato de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    //  ocultar todos los mensajes de error
    function hideAllErrors() {
        nameError.classList.remove('show-error');
        emailError.classList.remove('show-error');
        messageError.classList.remove('show-error');
    }
});