import React from 'react';
import './ShoppingList.scss';
import Product from './Product';
import ProgressBar from './ProgressBar';

const ShoppingList = props => {

  const activeProducts = props.products.filter(product => product.active);
  const purchasedProducts = props.products.filter(product => !product.active);

  if (props.activeSort) {
    activeProducts.sort((a, b) => b.id - a.id)
  } else {
    activeProducts.sort((a, b) => {
      a = a.text.toLowerCase();
      b = b.text.toLowerCase();
      return a.localeCompare(b)
    })
  }

  if (props.purchasedSort) {
    purchasedProducts.sort((a, b) => b.purchasedDate - a.purchasedDate)
  } else {
    purchasedProducts.sort((a, b) => {
      a = a.text.toLowerCase();
      b = b.text.toLowerCase();
      return a.localeCompare(b)
    })
  }

  const activeProductsList = activeProducts.map(product => (
    <Product
      key={product.id}
      id={product.id}
      text={product.text}
      important={product.important}
      active={product.active}
      click={props.click}
    />
  ))
  const purchasedProductsList = purchasedProducts.map(product => (
    <Product
      key={product.id}
      id={product.id}
      text={product.text}
      important={product.important}
      active={product.active}
      purchasedDate={product.purchasedDate}
      click={props.click}
    />
  ))

  // for desktop (active and purchased are in 2 columns) - if purchased list is empty - active list has 100% width
  let wrapperStyle;
  if (purchasedProductsList.length === 0) {
    wrapperStyle = {
      display: 'block'
    }
  }

  return (
    <>
      <div className="products-lists-wrapper" style={wrapperStyle}>
        <section className="products-lists">
          {activeProductsList.length ? <h2 className="products-lists__headline">Produkty do kupienia:</h2> : <h2 className="products-lists__headline">Brak produktów do kupienia!</h2>}
          {activeProductsList.length > 0 ? <button className="products-lists__button" name="active" onClick={() => props.handleSort('active')}>{props.activeSort ? 'Aktualne sortowanie: wg daty dodania' : 'Aktualne sortowanie: alfabetycznie'}</button> : null}
          <ul className="products-lists__list products-lists__list--active">
            {activeProductsList}
          </ul>
        </section>
        <section className="products-lists">
          {purchasedProductsList.length ? <h2 className="products-lists__headline">Kupione produkty:</h2> : null}
          {purchasedProductsList.length > 0 ? <button className="products-lists__button" name="purchased" onClick={() => props.handleSort('purchased')}>{props.purchasedSort ? 'Aktualne sortowanie: wg daty zakupu' : 'Aktualne sortowanie: alfabetycznie'}</button> : null}
          <ul className="products-lists__list products-lists__list--purchased">
            {purchasedProductsList}
          </ul>
        </section>
      </div>
      <ProgressBar active={activeProducts} purchased={purchasedProducts} />
    </>
  );
}

export default ShoppingList;