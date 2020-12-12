import gql from 'graphql-tag';

const ProductFragment = gql`
  fragment ProductFragment on Product {
    _id
    texts {
      _id
      title
      subtitle
      description
      slug
    }
    media {
      _id
      file {
        _id
        url
      }
    }
    ... on SimpleProduct {
      dimensions {
        weight
      }
      simulatedPrice {
        price {
          amount
          currency
        }
      }
    }
  }
`;

export default ProductFragment;
