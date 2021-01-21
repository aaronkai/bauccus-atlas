import formatMoney from './formatMoney';

export default function attachNamesAndPrices(order, wines) {
  return order.map((item) => {
    const wine = wines.find((singleWine) => singleWine.id === item.id);
    return {
      ...item,
      name: wine.name,
      thumbnail: wine.image.asset.fluid.src,
      price: formatMoney(wine.price),
    };
  });
}
