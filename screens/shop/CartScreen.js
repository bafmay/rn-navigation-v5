import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

const CartScreen = (props) => {
  const cartItems = useSelector((state) => {
    const newItems = [];
    for (const key in state.cart.items) {
      newItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return newItems.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatcher = useDispatch();

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.ammount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accentColor}
          disabled={cartItems.length === 0}
          onPress={() =>
            dispatcher(orderActions.addOrder(cartItems, totalAmount.toFixed(2)))
          }
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(cart) => cart.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            ammount={itemData.item.sum}
            deletable
            onRemove={() =>
              dispatcher(cartActions.removeFromCart(itemData.item.productId))
            }
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Cart",
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  ammount: {
    color: Colors.primaryColor,
  },
});

export default CartScreen;