import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";

import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";
import Preload from "./Preload";

export default function App() {
	Preload();
	const isDark = useColorScheme() === "dark";

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<NavigationContainer>
				<Root />
			</NavigationContainer>
		</ThemeProvider>
	);
}
