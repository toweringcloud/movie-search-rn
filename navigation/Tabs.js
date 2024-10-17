import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const isDark = useColorScheme() === "dark";
	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: isDark ? BLACK_COLOR : "white",
			}}
			screenOptions={{
				headerStyle: {
					backgroundColor: isDark ? BLACK_COLOR : "white",
				},
				headerTitleStyle: {
					color: isDark ? "white" : BLACK_COLOR,
				},
				tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
				tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
				tabBarLabelStyle: {
					marginTop: -5,
					fontSize: 10,
					fontWeight: "600",
				},
				tabBarStyle: {
					backgroundColor: isDark ? BLACK_COLOR : "white",
				},
			}}
		>
			<Tab.Screen
				name="Movies"
				component={Movies}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name={"film-outline"}
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="TV"
				component={Tv}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="tv-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name={"search-outline"}
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
export default Tabs;
