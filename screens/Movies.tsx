import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	View,
	Text,
} from "react-native";
import Swiper from "react-native-swiper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";

import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const API_KEY = process.env.API_KEY;

const Loader = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: 600;
	margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
	margin-top: 20px;
`;

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 20px;
`;

interface Movie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	original_title: string;
	vote_average: number;
	overview: string;
	release_date: string;
}

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [upcoming, setUpcoming] = useState([]);
	const [trending, setTrending] = useState([]);

	const getTrending = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
			)
		).json();
		setTrending(results);
	};

	const getUpcoming = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
			)
		).json();
		setUpcoming(results);
	};

	const getNowPlaying = async () => {
		const { results } = await (
			await fetch(
				`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
			)
		).json();
		setNowPlaying(results);
	};

	const getData = async () => {
		await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
		setLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);

	const onRefresh = async () => {
		setRefreshing(true);
		await getData();
		setRefreshing(false);
	};

	return loading ? (
		<Loader>
			<ActivityIndicator />
		</Loader>
	) : (
		<FlatList
			style={{
				backgroundColor: "black",
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
						{nowPlaying.map((movie: Movie) => (
							<Slide
								key={movie.id}
								backdropPath={movie.backdrop_path}
								posterPath={movie.poster_path}
								originalTitle={movie.original_title}
								voteAverage={movie.vote_average}
								overview={movie.overview}
							/>
						))}
					</Swiper>
					<ListContainer>
						<ListTitle>Trending Movies</ListTitle>
						<TrendingScroll
							contentContainerStyle={{ paddingHorizontal: 30 }}
							data={trending}
							horizontal
							ItemSeparatorComponent={() => (
								<View style={{ width: 30 }} />
							)}
							keyExtractor={(item: Movie) => item.id + ""}
							renderItem={({ item }) => (
								<VMedia
									posterPath={item.poster_path}
									originalTitle={item.original_title}
									voteAverage={item.vote_average}
								/>
							)}
							showsHorizontalScrollIndicator={false}
						/>
					</ListContainer>
					<ComingSoonTitle>Coming soon</ComingSoonTitle>
				</>
			}
			data={upcoming}
			keyExtractor={(item: Movie) => item.id + ""}
			ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
			renderItem={({ item }) => (
				<HMedia
					posterPath={item.poster_path}
					originalTitle={item.original_title}
					overview={item.overview}
					releaseDate={item.release_date}
				/>
			)}
		/>
	);
};
export default Movies;
