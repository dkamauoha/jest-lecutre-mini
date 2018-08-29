import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Cart extends Component {
  constructor() {
    super();

    this.state = {};
  }

  renderItems(cart) {
    return cart.map(item => (
      <div className="cart-item" key={item.id}>
        <h4>
          <div>
            {item.qty}x {item.product}
          </div>
          <div>${item.qty * item.price}</div>
        </h4>
        <button>
          Remove item <FontAwesome name="trash" />
        </button>
      </div>
    ));
  }

  render() {
    const { show, cart } = this.props;
    return (
      <div className={`${show ? 'show' : ''} cart`}>
        <h3>Cart</h3>
        <FontAwesome name="times-circle" className="top-right" onClick={this.props.hideCart} />
        <div className="cart-items">{this.renderItems(cart)}</div>
      </div>
    );
  }
}

export default Cart;
