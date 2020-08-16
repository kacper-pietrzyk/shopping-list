import React, { Component } from 'react';
import './App.scss';
import AddProduct from './AddProduct';
import ShoppingList from './ShoppingList';

class App extends Component {

  idCounter = 1;

  state = {
    products: [],
    activeSort: true,
    purchasedSort: true
  }

  addProduct = (text, important) => {
    const product = {
      id: this.idCounter,
      text,
      important,
      purchasedDate: '',
      active: true
    };
    this.setState(prevState => ({
      products: [...prevState.products, product]
    }));
    this.idCounter++;
  }

  handleClick = (e, id) => {
    let products = [...this.state.products];

    if (e.currentTarget.name === 'delete') {
      products = products.filter(product => product.id !== id)

    } else {
      const index = products.findIndex(product => product.id === id);

      if (e.currentTarget.name === 'purchase') {
        const purchasedDate = new Date().getTime();
        products[index].active = false;
        products[index].purchasedDate = purchasedDate;

      } else if (e.currentTarget.name === 'restore') {
        products[index].active = true;
      }
    }
    this.setState({
      products
    })
  }

  handleSort = (name) => {
    if (name === 'active') {
      this.setState({
        activeSort: !this.state.activeSort
      })
    } else {
      this.setState({
        purchasedSort: !this.state.purchasedSort
      })
    }
  }

  render() {

    const { products, activeSort, purchasedSort } = this.state;

    return (
      <>
        <h1 className="headline">Lista zakupów</h1>
        <div className="app">
          <AddProduct
            addProduct={this.addProduct}
          />
          <ShoppingList
            products={products}
            activeSort={activeSort}
            purchasedSort={purchasedSort}
            addProduct={this.addProduct}
            click={this.handleClick}
            handleSort={this.handleSort}
          />
        </div>
      </>
    );
  }
}

export default App;