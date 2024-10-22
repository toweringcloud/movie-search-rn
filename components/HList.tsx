import React from "react";
import { useColorScheme } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";

import VMedia from "./VMedia";

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

const ListTitle = styled.Text`
	margin-left: 30px;
	margin-bottom: 20px;
	color: ${(props: any) => (props.isDark ? "white" : props.theme.textColor)};
	font-size: 18px;
	font-weight: 600;
`;

export const HListSeparator = styled.View`
	width: 20px;
`;

interface HListProps {
	title: string;
	data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
	const isDark = useColorScheme() === "dark";

	return (
		<ListContainer>
			<ListTitle isDark={isDark}>{title}</ListTitle>
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={HListSeparator}
				contentContainerStyle={{ paddingHorizontal: 30 }}
				keyExtractor={(item) => item.id + ""}
				renderItem={({ item }) => (
					<VMedia
						posterPath={item.poster_path}
						originalTitle={
							item.original_title ?? item.original_name
						}
						voteAverage={item.vote_average}
					/>
				)}
			/>
		</ListContainer>
	);
};
export default HList;
