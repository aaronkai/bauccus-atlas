import { useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';

// allow graphql syntax highlighting
const gql = String.raw;

export function useLatestData() {
  // current wines
  const [currentWines, setCurrentWines] = useState();
  const [currentVintners, setCurrentVintners] = useState();

  useEffect(function () {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "aaron") {
              name
              inStock {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              showcaseVintner {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // check for errors
        // set the data to state
        setCurrentWines(res.data.StoreSettings.inStock);
        setCurrentVintners(res.data.StoreSettings.showcaseVintner);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return {
    currentWines,
    currentVintners,
  };
  // vintners
}
