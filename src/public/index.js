const socket = io();

socket.on('connect',()=>{
    console.log('servidor conectado')
});

socket.on('productAdded', (data) => {
    
});


socket.on('productDeleted', (data) => {
    
});


document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = e.target.productName.value;
    const productQuantity = e.target.productQuantity.value;

    
    socket.emit('addProduct', { name: productName, quantity: productQuantity });

    
    e.target.productName.value = '';
    e.target.productQuantity.value = '';
});


document.getElementById('deleteProductForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const productId = e.target.productId.value;

    
    socket.emit('deleteProduct', { id: productId });

    
    e.target.productId.value = '';
});