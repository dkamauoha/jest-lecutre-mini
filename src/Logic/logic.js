const axios = require('axios');

const logic = {
  toggle: (value) => {
    return !value;
  },
  getProducts: () => {
    return axios.get('http://localhost:4000/products');
  },
  addToCart: (cart, product) => {
    let index = cart.findIndex(e => e.id === product.id);
    if (index === -1) {
      const newProduct = {...product, qty: 1}
      let newCart = [...cart, newProduct]
      return newCart;
    }
    let newCart = [...cart];
    newCart[index].qty += 1;
    return newCart;
  },
  calculateSubTotal: (obj) => {
    return (obj.price * obj.qty).toFixed(2);
  },
  calculateTotal: () => {
    // Build me!
  },
  removeItem: (cart, id) => {
    return cart
      .map(item => {
        if (item.id === id) {
          item.qty -= 1;
        }
        return item;
      })
      .filter(item => item.qty > 0)
  },
};

module.exports = logic;
