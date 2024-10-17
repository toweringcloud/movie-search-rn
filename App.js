// import React, { useCallback, useEffect } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

// import { useAssets } from "expo-asset";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import { Ionicons } from "@expo/vector-icons";

import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";

// SplashScreen.preventAutoHideAsync();

export default function App() {
	// const [fontsLoaded] = useFonts(Ionicons.font);
	// const [assets] = useAssets([require("./assets/crypto.png")]);

	// const onLayoutRootView = useCallback(async () => {
	// 	if (fontsLoaded && assets) await SplashScreen.hideAsync();
	// }, [fontsLoaded, assets]);

	// useEffect(() => {
	// 	onLayoutRootView();
	// }, [onLayoutRootView]);

	// if (!fontsLoaded || !assets) {
	// 	return null;
	// }

	const isDark = useColorScheme() === "dark";

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<NavigationContainer>
				<Root />
			</NavigationContainer>
		</ThemeProvider>
	);
}
