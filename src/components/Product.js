import React from 'react';
import './Product.scss';

const Product = props => {
  let classes = ['product'];
  if (props.important && props.active) {
    classes = classes.concat('product--important')
  }

  const date = new Date(props.purchasedDate).toLocaleString();

  const { text, active, id, click } = props;

  return (
    <li className={classes.join(" ")}>
      {active ? <p className="product__text">{text}</p> : <div><p className="product__text">{text}</p><p className="product__date">Data zakupu: {date}</p></div>}
      <div className="product-buttons">
        {active && <button className="product-buttons__button" name="purchase" onClick={e => click(e, id)}><span className="fas fa-check"></span></button>}
        {!active && <button className="product-buttons__button" name="restore" onClick={e => click(e, id)}><span className="fas fa-undo-alt"></span></button>}
        <button className="product-buttons__button" name="delete" onClick={e => click(e, id)}><span className="fas fa-times" ></span></button>
      </div>
    </li>
  );
}

export default Product;