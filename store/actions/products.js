import { API, graphqlOperation } from "aws-amplify";
import { listProducts } from "../../src/graphql/queries";
import { createProducts, updateProducts, deleteProducts} from "../../src/graphql/mutations";

import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
    return async (dispatch) => {
      const response = await API.graphql(graphqlOperation(listProducts));
      const loadedProducts = response.data.listProducts.items.map((item) => {
        return new Product(
          item.id,
          item.ownerId,
          item.title,
          item.imageUrl,
          item.description,
          item.price
        );
      });
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await API.graphql(
      graphqlOperation(deleteProducts, {
        input: { id },
      })
    );
    dispatch( { type: DELETE_PRODUCT, pid: id });
  };
};

export const createProduct = (title, description, imageUrl, price, ownerId='u1') => {
  return async (dispatch) => {
    const response = await API.graphql(
      graphqlOperation(createProducts, {
        input: { title, ownerId, description, imageUrl, price },
      })
    );
    const resData = response.data.createProducts;

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.id,
        ownerId,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl ) => {
  return async dispatch => {
    await API.graphql(
      graphqlOperation(updateProducts, {
        input: { ids, title, description, imageUrl},
      })
    );

    dispatch( {
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      },
    });
  };
  
};
