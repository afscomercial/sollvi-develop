/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProducts = /* GraphQL */ `
  subscription OnCreateProducts {
    onCreateProducts {
      id
      ownerId
      description
      imageUrl
      price
      title
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProducts = /* GraphQL */ `
  subscription OnUpdateProducts {
    onUpdateProducts {
      id
      ownerId
      description
      imageUrl
      price
      title
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProducts = /* GraphQL */ `
  subscription OnDeleteProducts {
    onDeleteProducts {
      id
      ownerId
      description
      imageUrl
      price
      title
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders {
    onCreateOrders {
      id
      ownerId
      cartItems {
        productId
        productPrice
        productTitle
        quantity
        sum
      }
      date
      totalAmount
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrders = /* GraphQL */ `
  subscription OnUpdateOrders {
    onUpdateOrders {
      id
      ownerId
      cartItems {
        productId
        productPrice
        productTitle
        quantity
        sum
      }
      date
      totalAmount
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrders = /* GraphQL */ `
  subscription OnDeleteOrders {
    onDeleteOrders {
      id
      ownerId
      cartItems {
        productId
        productPrice
        productTitle
        quantity
        sum
      }
      date
      totalAmount
      createdAt
      updatedAt
    }
  }
`;
