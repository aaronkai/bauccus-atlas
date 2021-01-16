export default function calculateOrderTotal(order, wines) {
  return order.reduce((runningTotal, singleOrder) => {
    const wine = wines.find((singleWine) => singleWine.id === singleOrder.id);
    return runningTotal + wine.price;
  }, 0);
}
