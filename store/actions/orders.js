import { API, graphqlOperation } from "aws-amplify";
import { createOrders } from "../../src/graphql/mutations";
import { listOrders } from "../../src/graphql/queries";

import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS= 'SET_ORDERS';


export const fetchOrders = () => {
  return async dispatch => {
    const response = await API.graphql(graphqlOperation(listOrders));

    const loadedOrders = response.data.listOrders.items.map((item) => {
      return new Order(
        item.id,
        item.cartItems,
        item.totalAmount,
        new Date(item.date)
      );
    });
    dispatch({type:SET_ORDERS,
      orders: loadedOrders
    })
  };
};

export const addOrder = (cartItems, totalAmount, ownerId='u1') => {
  return async (dispatch) => {
    const date= new Date();
    const response = await API.graphql(
      graphqlOperation(createOrders, {
        input: { cartItems, totalAmount, ownerId, date: date.toISOString()},
      })
    );
    const resData = response.data.createOrders;

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.id,
        items: cartItems,
        amount: totalAmount,
        date
      },
    });
  };
};
