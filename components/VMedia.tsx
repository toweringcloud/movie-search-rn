import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import Poster from "./Poster";
import Votes from "./Votes";
import { StackNavigationProp } from "../types";

const Movie = styled.View`
	align-items: center;
`;

const Title = styled.Text`
	color: ${(props: any) => (props.isDark ? "white" : props.theme.textColor)};
	font-weight: 600;
	margin-top: 7px;
	margin-bottom: 5px;
`;

interface VMediaProps {
	posterPath: string;
	originalTitle: string;
	voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
	posterPath,
	originalTitle,
	voteAverage,
}) => {
	const isDark = useColorScheme() === "dark";
	const navigation = useNavigation<StackNavigationProp>();
	const goToDetail = () => {
		navigation.navigate("Stack", { screen: "Detail" });
	};

	return (
		<TouchableOpacity onPress={goToDetail}>
			<Movie>
				<Poster path={posterPath} />
				<Title isDark={isDark}>
					{originalTitle.slice(0, 12)}
					{originalTitle.length > 12 ? "..." : null}
				</Title>
				<Votes votes={voteAverage} />
			</Movie>
		</TouchableOpacity>
	);
};
export default VMedia;
