import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserProductsScreen, {
  screenOptions as userProductScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen, {
  screenOptions,
} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import { Platform, SafeAreaView, Button, View } from "react-native";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";
import SplashScreen from "../screens/user/SplashScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerBackTitleStyle: { fontFamily: "open-sans" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const ProductStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductStackNavigator.Screen
        name="ProductOverviewScreen"
        component={ProductOverviewScreen}
        options={screenOptions}
      />
      <ProductStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductStackNavigator.Navigator>
  );
};

// const ProductListNavigator = createStackNavigator(
//   {
//     ProductOverviewScreen: ProductOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     initialRouteName: "ProductOverviewScreen",
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//   }
// );

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     initialRouteName: "Orders",
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//   }
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={userProductScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProductsScreen: UserProductsScreen,
//     EditProductScreen: EditProductScreen,
//   },
//   {
//     initialRouteName: "UserProductsScreen",
//     defaultNavigationOptions: defaultNavOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, padding: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Log out"
                color={Colors.primaryColor}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Shop"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="ManageProducts"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Shop: {
//       screen: ProductListNavigator,
//       navigationOptions: {
//         drawerLabel: "Shop",
//       },
//     },
//     Orders: {
//       screen: OrdersNavigator,
//       navigationOptions: {
//         drawerLabel: "Orders",
//       },
//     },
//     ManageProducts: {
//       screen: AdminNavigator,
//       navigationOptions: {
//         drawerLabel: "Manage Products",
//       },
//     },
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primaryColor,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, padding: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title="Log out"
//               color={Colors.primaryColor}
//               onPress={() => {
//                 dispatch(authActions.logout());
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator options={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     AuthScreen: AuthScreen,
//   },
//   {
//     initialRouteName: "AuthScreen",
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

// const MainNavigator = createSwitchNavigator(
//   {
//     Splash: SplashScreen,
//     Auth: AuthNavigator,
//     Shop: DrawerNavigator,
//   },
//   {
//     initialRouteName: "Splash",
//   }
// );

// export default createAppContainer(MainNavigator);
