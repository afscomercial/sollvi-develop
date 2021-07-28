import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: (
      <TouchableHighlight
        onPress={() => {
          navData.navigation.navigate("Cart");
        }}
      >
        <View style={styles.headerButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={23}
            color={Platform.OS === "android" ? "white" : Colors.primary}
          />
        </View>
      </TouchableHighlight>
      // <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      //   <Item
      //     title="Cart"
      //     iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
      //     onPress={() => {
      //       navData.navigation.navigate("Cart");
      //     }}
      //   />
      // </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  headerButton: {
    alignItems: "center",
    padding: 20
  }
});

export default ProductsOverviewScreen;
