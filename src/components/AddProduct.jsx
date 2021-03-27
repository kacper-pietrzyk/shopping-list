import React, { Component } from 'react';
import './AddProduct.scss';

class AddProduct extends Component {
  state = {
    text: '',
    important: false
  }

  handleChange = e => {
    if (e.target.name === 'text') {
      this.setState({
        text: e.target.value
      })
    } else if (e.target.name === 'important') {
      this.setState({
        important: e.target.checked
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    // product can be add if has minimum 1 letter
    if (this.state.text.length > 0) {
      this.props.addProduct(this.state.text, this.state.important);
    }
    this.setState({
      text: '',
      important: false
    })
  }

  render() {
    const { text, important } = this.state;
    return (
      <form
        className="add-product"
        onSubmit={this.handleSubmit}
      >
        <input
          className="add-product__input"
          type="text"
          name="text"
          placeholder="Dodaj nowy produkt..."
          value={text}
          onChange={this.handleChange}
        />
        <div className="add-product__part">
          <label
            className="add-product__label"
            htmlFor="important">
            <input
              className="add-product__checkbox"
              type="checkbox"
              name="important"
              id="important"
              checked={important}
              onChange={this.handleChange}
            />
          Priorytet
          </label>
          <button
            className="add-product__button"
          >
            Dodaj do listy
            </button>
        </div>
      </form>
    );
  }
}

export default AddProduct;

