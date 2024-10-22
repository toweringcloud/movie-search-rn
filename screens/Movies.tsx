import React, { useState } from "react";
import { Dimensions, FlatList, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { MovieResponse, moviesApi } from "../api";
import HList from "../components/HList";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import Slide from "../components/Slide";

const ListTitle = styled.Text`
	margin-left: 30px;
	color: ${(props: any) => (props.isDark ? "white" : props.theme.textColor)};
	font-size: 18px;
	font-weight: 600;
`;
const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 20px;
	color: ${(props: any) => (props.isDark ? "white" : props.theme.textColor)};
`;

const HSeparator = styled.View`
	height: 20px;
	background-color: ${(props: any) => (props.isDark ? "black" : "white")};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const [refreshing, setRefreshing] = useState(false);
	const isDark = useColorScheme() === "dark";

	const { isLoading: nowPlayingLoading, data: nowPlayingData } =
		useQuery<MovieResponse>({
			queryKey: ["movies", "nowPlaying"],
			queryFn: moviesApi.nowPlaying,
		});

	const { isLoading: upcomingLoading, data: upcomingData } =
		useQuery<MovieResponse>({
			queryKey: ["movies", "upcoming"],
			queryFn: moviesApi.upcoming,
		});

	const { isLoading: trendingLoading, data: trendingData } =
		useQuery<MovieResponse>({
			queryKey: ["movies", "trending"],
			queryFn: moviesApi.trending,
		});

	const queryClient = useQueryClient();
	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries({ queryKey: ["movies"] });
		setRefreshing(false);
	};

	const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
	if (loading) return <Loader />;

	return upcomingData ? (
		<FlatList
			style={{
				backgroundColor: isDark ? "black" : "white",
			}}
			onRefresh={onRefresh}
			refreshing={refreshing}
			ListHeaderComponent={
				<>
					<Swiper
						horizontal
						loop
						autoplay
						autoplayTimeout={3.5}
						showsButtons={false}
						showsPagination={false}
						containerStyle={{
							marginBottom: 40,
							width: "100%",
							height: SCREEN_HEIGHT / 4,
						}}
					>
						{nowPlayingData?.results.map((movie) => (
							<Slide
								key={movie.id}
								backdropPath={movie.backdrop_path || ""}
								posterPath={movie.poster_path || ""}
								originalTitle={movie.original_title}
								voteAverage={movie.vote_average}
								overview={movie.overview}
							/>
						))}
					</Swiper>

					{trendingData ? (
						<HList
							title="Trending Movies"
							data={trendingData.results}
						/>
					) : null}

					<ComingSoonTitle isDark={isDark}>
						Coming soon
					</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={(item) => item.id + ""}
			ItemSeparatorComponent={() => <HSeparator isDark={isDark} />}
			renderItem={({ item }) => (
				<HMedia
					posterPath={item.poster_path || ""}
					originalTitle={item.original_title}
					overview={item.overview}
					releaseDate={item.release_date}
				/>
			)}
		/>
	) : null;
};
export default Movies;
