import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Button,
  View
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrderScreen;
