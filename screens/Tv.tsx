import React, { useState } from "react";
import { RefreshControl, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
	const [refreshing, setRefreshing] = useState(false);

	const { isLoading: todayLoading, data: todayData } = useQuery({
		queryKey: ["tv", "today"],
		queryFn: tvApi.airingToday,
	});

	const { isLoading: topLoading, data: topData } = useQuery({
		queryKey: ["tv", "top"],
		queryFn: tvApi.topRated,
	});

	const { isLoading: trendingLoading, data: trendingData } = useQuery({
		queryKey: ["tv", "trending"],
		queryFn: tvApi.trending,
	});

	const queryClient = useQueryClient();
	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries({ queryKey: ["tv"] });
		setRefreshing(false);
	};

	const loading = todayLoading || topLoading || trendingLoading;
	if (loading) return <Loader />;

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			contentContainerStyle={{ paddingVertical: 30 }}
		>
			<HList title="Trending TV" data={trendingData.results} />
			<HList title="Airing Today" data={todayData.results} />
			<HList title="Top Rated TV" data={topData.results} />
		</ScrollView>
	);
};
export default Tv;
