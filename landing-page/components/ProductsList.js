import Product from './Product';
import products from '../data/products';
import React, { useEffect, useState, useRef } from 'react';
import { getItems } from '../pages/api/items';

const ProductsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);

  console.log(items);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Product item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
