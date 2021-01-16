import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import WineListItemStyles from '../styles/WineListItemStyles';
import useWine from '../utils/useWine';
import WineOrder from '../components/WineOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export const query = graphql`
  query {
    wines: allSanityWine {
      nodes {
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
        id
        name
        price
        slug {
          current
        }
      }
    }
  }
`;

export default function OrderPage({ data }) {
  const wines = data.wines.nodes;

  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const { order, addToOrder, removeFromOrder } = useWine({
    wines,
    inputs: values,
  });

  return (
    <>
      <SEO title="Don't Go Thirsty!" />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="Name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="Email">
            Email
            <input
              type="text"
              src=""
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="wineList">
          <legend>Wine List</legend>
          {wines.map((wine) => (
            <WineListItemStyles key={wine.id}>
              <Img
                alt={wine.name}
                width="50"
                height="50"
                fluid={wine.image.asset.fluid}
              />
              <div>
                <h2>{wine.name}</h2>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    addToOrder({
                      id: wine.id,
                    })
                  }
                >
                  {formatMoney(wine.price)}
                </button>
              </div>
            </WineListItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <WineOrder
            order={order}
            removeFromOrder={removeFromOrder}
            wines={wines}
          />
        </fieldset>
        <fieldset>
          <h3>Total is {formatMoney(calculateOrderTotal(order, wines))}</h3>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderStyles>
    </>
  );
}
