import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";

const SplashScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          // props.navigation.navigate("Auth");
          dispatch(authActions.setDidTryAL());
          return;
        }
        const transformData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformData;
        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          // props.navigation.navigate("Auth");
          dispatch(authActions.setDidTryAL());
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date();

        // props.navigation.navigate("Shop");
        dispatch(authActions.authenticate(userId, token, expirationTime));
      } catch (err) {
        throw err;
      }
    };

    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator color={Colors.primaryColor} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
