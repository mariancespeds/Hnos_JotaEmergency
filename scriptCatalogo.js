
const DATA_URL = 'data.json'; 

async function fetchProducts() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return null; 
    }
}


function renderAllProducts(productos) {
    const container = document.getElementById('products-container');
    if (!container) {
        console.error("No se encontró el contenedor de productos.");
        return;
    }

    container.innerHTML = ''; 

    if (productos && productos.length > 0) {
        productos.forEach(producto => {
           
            if (!producto.id) {
                console.warn(`Producto sin ID: ${producto.name}. Se le asignará un ID genérico.`);
                producto.id = "no-id-" + Math.random().toString(16).slice(2);
            }

            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-id', producto.id);

            productCard.innerHTML = `
                <a href="detalle.html?id=${producto.id}">
                    <img src="${producto.image || 'placeholder.png'}" alt="${producto.name}">
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                </a>
                <button class="add-to-cart">Añadir al carrito</button>
            `;
            container.appendChild(productCard);
        });
    } else {
        container.innerHTML = '<p>No se encontraron productos disponibles.</p>';
    }
}

async function init() {
    console.log("Cargando catálogo de productos...");
    const container = document.getElementById('products-container');
    if (container) {
        container.innerHTML = '<p>Cargando productos...</p>';
    }

    const allProducts = await fetchProducts();
    if (allProducts) {
        renderAllProducts(allProducts);
        
        if (container) {
            container.addEventListener('click', (event) => {
                if (event.target.classList.contains('add-to-cart')) {
                    const productCard = event.target.closest('.product-card');
                    const productId = productCard.getAttribute('data-id');
                    const nombre= allProducts.find(p=>p.id==productId)
                    alert(`¡Se añadió el producto ${nombre.name} al carrito!`);
                }
            });
        }
    } else {
        if (container) {
            container.innerHTML = '<p>Lo sentimos, no pudimos cargar los productos.</p>';
        }
    }
}
document.addEventListener('DOMContentLoaded', init);