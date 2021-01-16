import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function useWineOrder({ wines, inputs }) {
  // 1. create state to hold order
  // State has been moved to provider level
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our update function via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. make a function to add things to order
  function addToOrder(orderedWine) {
    setOrder([...order, orderedWine]);
  }
  // 3. make fucntion to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. send this data to a serverless function when the check out
  // TO DO
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
