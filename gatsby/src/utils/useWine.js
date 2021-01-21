import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import formatMoney from './formatMoney';
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function useWineOrder({ wines, values }) {
  // Now we access both our state and our update function via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState('');

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

  // This is the function that is run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setloading(true);
    setError(null);
    setMessage(null);

    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, wines),
      total: formatMoney(calculateOrderTotal(order, wines)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };

    // 4. send this data to a serverless function when the check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setloading(false);
      setError(text.message);
    } else {
      setloading(false);
      setMessage('Success! Your wine order has been placed');
    }
  }

  return {
    order,
    error,
    loading,
    message,
    addToOrder,
    removeFromOrder,
    submitOrder,
  };
}
