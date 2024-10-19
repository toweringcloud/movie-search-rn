import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

import Poster from "./Poster";
import Votes from "./Votes";

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

	return (
		<Movie>
			<Poster path={posterPath} />
			<Title isDark={isDark}>
				{originalTitle.slice(0, 12)}
				{originalTitle.length > 12 ? "..." : null}
			</Title>
			<Votes votes={voteAverage} />
		</Movie>
	);
};
export default VMedia;
