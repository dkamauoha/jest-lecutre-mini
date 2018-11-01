const { toggle, getProducts, addToCart, calculateSubTotal, calculateTotal, removeItem } = require('../Logic/logic');

const product = {
  id: 1,
  product: 'Fillets',
  price: 69.41,
  image: 'http://goodtogostore.com/product-package-images/192837494.jpg',
};

describe('Tests Toggle Show button', () => {
  test('can toggle true to false', () => {
    expect(toggle(true)).toBe(false);
  });

  test('can toggle false to true', () => {
    expect(toggle(false)).toBe(true);
  })
});

describe('Can Get products from Server', () => {
  test('Gets status 200', () => {
    return getProducts().then((res) => {
      expect(res.status).toBe(200);
    });
  });

  test('Res.data exists', () => {
    return getProducts().then((res) => {
      expect(res.data).toBeDefined();
    })
  })

  test('Gets back correct items', () => {
    return getProducts().then((res) => {
      expect(res.data[0]).toEqual(product);
    });
  });
});

describe('Can add item to cart', () => {
  let cart = [];

  beforeEach(() => cart = []);

  test('item can be added to a cart', () => {
    expect(addToCart(cart, product)).toHaveLength(1);
  });

  test('does not mutate original cart', () => {
    expect(addToCart(cart, product)).not.toBe(cart);
  });

  test('added item has a quantity prop', () => {
    const newCart = addToCart(cart, product);
    expect(newCart[0]).toMatchObject({qty: 1})
  })

  test('updates quantity rather than adding a second item', () => {
    let newCart = addToCart(cart, product);
    newCart = addToCart(newCart, product);
    expect(newCart).toHaveLength(1);
  });
});

describe('can calculate sub total', () => {
  beforeEach(() => {
    product.qty = 1,
    product.price = 69.41
  });

  test('does not modify object passed in', () => {
    calculateSubTotal(product)
    expect(product).toEqual(product);
  });

  test('can calculate subtotal of 1 quantity', () => {
    expect(calculateSubTotal(product)).toBe('69.41');
  });

  test('can calculate subtotal of 2 quantity', () => {
    product.qty = 2;
    expect(calculateSubTotal(product)).toBe('138.82');
  });

  test('can calculate subtotal of 10 quantity', () => {
    product.qty = 10;
    product.price = 10.1
    expect(calculateSubTotal(product)).toBe('101.00');
  });
});

describe.only('can calculate Total', () => {
  let cart = [];

  beforeEach(() => {cart = [{id: 1, qty: 2, price: 2}, {id: 2, qty: 2, price: 2}, {id: 3, qty: 2, price: 2}]});

  test('cart has an item in it', () => {
    expect(calculateTotal(cart)).to
  });
});

describe('can remove item', () => {
  let cart = [];

  beforeEach(() => {cart = [{id: 1, qty: 1}, {id: 2, qty: 500}]});

  test('can remove item from cart', () => {
    expect(removeItem(cart, 1)).toHaveLength(1);
  });

  test('cart passed in is not the same cart returned', () => {
    expect(removeItem(cart, 1)).not.toBe(cart);
  });

  test('can lower qty if qty is over 1 instead of remove', () => {
    const item = removeItem(cart, 2)[1];
    expect(item.qty).toBe(499);
  });
});
