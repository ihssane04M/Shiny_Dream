      // Données des produits
        let products = [
            {
                id: 1,
                name: "Rouge Mat Longue Tenue",
                category: "Rouge à lèvres",
                price: 89,
                image: "rouge_levres.jpeg",
                description: "Formule ultra-pigmentée pour un effet mat velouté qui dure jusqu'à 12 heures sans transfert."
            },
            {
                id: 2,
                name: "Fluide Lumière Naturelle",
                category: "Fond de teint",
                price: 149,
                image: "Fond_teint.jpg",
                description: "Texture légère qui unifie le teint tout en laissant respirer la peau. Résultat naturel et lumineux."
            },
            {
                id: 3,
                name: "Volume Extrême",
                category: "Mascara",
                price: 129,
                image: "Mascara.jpeg",
                description: "Donne un volume intense et un allongement spectaculaire aux cils sans effet paquet."
            },
            {
                id: 4,
                name: "Nuances Nudes",
                category: "Palette",
                price: 199,
                image: "palette3.jpeg",
                description: "12 teintes mattes et satinées pour des looks naturels ou smokys. Pigmentation intense."
            }
        ];

        // Panier
        let cartItems = [];
        const cartCount = document.querySelector('.cart-count');
        const productsGrid = document.getElementById('products-grid');
        const searchInput = document.getElementById('search-input');
        
        // Afficher les produits
        function displayProducts(productsToDisplay) {
            productsGrid.innerHTML = '';
            
            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">${product.price} DH</div>
                        <div class="product-actions">
                            <button class="btn" data-id="${product.id}">Ajouter au panier</button>
                            <button class="btn btn-details" data-id="${product.id}">Détails</button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
            
            // Ajouter les événements aux boutons
            document.querySelectorAll('.product-actions .btn:first-child').forEach(button => {
                button.addEventListener('click', function() {
                    addToCart(parseInt(this.getAttribute('data-id')));
                });
            });
            
            document.querySelectorAll('.btn-details').forEach(button => {
                button.addEventListener('click', function() {
                    showProductDetails(parseInt(this.getAttribute('data-id')));
                });
            });
        }
        
        // Ajouter au panier
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                cartItems.push(product);
                updateCartCount();
                
                // Animation feedback
                const button = document.querySelector(`.btn[data-id="${productId}"]`);
                button.textContent = 'Ajouté !';
                button.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    button.textContent = 'Ajouter au panier';
                    button.style.backgroundColor = '';
                }, 1000);
            }
        }
        
        // Mettre à jour le compteur du panier
        function updateCartCount() {
            cartCount.textContent = cartItems.length;
        }
        
        // Afficher les détails du produit
        function showProductDetails(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                alert(`Détails du produit:\n\n${product.name}\n\nCatégorie: ${product.category}\n\nPrix: ${product.price} DH\n\nDescription: ${product.description}`);
            }
        }
        
        // Recherche de produits
        function searchProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.category.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        }
        
        // Ajouter un nouveau produit
        function addNewProduct(event) {
            event.preventDefault();
            
            const name = document.getElementById('product-name').value;
            const category = document.getElementById('product-category').value;
            const price = parseFloat(document.getElementById('product-price').value);
            const image = document.getElementById('product-image').value;
            const description = document.getElementById('product-description').value;
            
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                name,
                category,
                price,
                image,
                description
            };
            
            products.push(newProduct);
            displayProducts(products);
            
            // Réinitialiser le formulaire
            document.getElementById('product-form').reset();
            
            // Afficher un message de succès
            alert('Produit ajouté avec succès!');
            
            // Revenir à la section des produits
            showSection('products-section');
        }
        
        // Afficher/masquer les sections
        function showSection(sectionId) {
            document.getElementById('hero-section').classList.add('hidden');
            document.getElementById('products-section').classList.add('hidden');
            document.getElementById('add-product-section').classList.add('hidden');
            
            document.getElementById(sectionId).classList.remove('hidden');
        }
        
        // Événements
        document.getElementById('search-input').addEventListener('input', searchProducts);
        document.getElementById('product-form').addEventListener('submit', addNewProduct);
        
        document.getElementById('home-link').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('hero-section').classList.remove('hidden');
            document.getElementById('products-section').classList.add('hidden');
            document.getElementById('add-product-section').classList.add('hidden');
        });
        
        document.getElementById('products-link').addEventListener('click', function(e) {
            e.preventDefault();
            showSection('products-section');
        });
        
        document.getElementById('add-product-link').addEventListener('click', function(e) {
            e.preventDefault();
            showSection('add-product-section');
        });
        
        document.getElementById('view-products-btn').addEventListener('click', function(e) {
            e.preventDefault();
            showSection('products-section');
        });
        
        document.getElementById('cart-icon').addEventListener('click', function(e) {
            e.preventDefault();
            if (cartItems.length === 0) {
                alert('Votre panier est vide!');
            } else {
                let cartContent = 'Votre panier:\n\n';
                let total = 0;
                
                cartItems.forEach((item, index) => {
                    cartContent += `${index + 1}. ${item.name} - ${item.price} DH\n`;
                    total += item.price;
                });
                
                cartContent += `\nTotal: ${total} DH`;
                
                alert(cartContent);
            }
        });
        
        // Initialisation
        displayProducts(products);