import React from 'react';
import Img from 'gatsby-image';
import WineListItemStyles from '../styles/WineListItemStyles';
import formatMoney from '../utils/formatMoney';

export default function WineOrder({ order, wines, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const singleWine = wines.find((wine) => wine.id === singleOrder.id);
        return (
          <WineListItemStyles key={`${singleOrder.id}${index}`}>
            <Img fluid={singleWine.image.asset.fluid} />
            <h2>{singleWine.name}</h2>
            <p>
              {formatMoney(singleWine.price)}{' '}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleWine.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </WineListItemStyles>
        );
      })}
    </>
  );
}
