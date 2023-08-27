import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import styles from "../../styles/search";

const SearchedJobs = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();

  const [searchResult, setSearchResult] = useState([]);
  const [searchloader, setSearchloader] = useState(false);
  const [page, setPage] = useState(1);

  const searchJob = async () => {
    setSearchloader(true);

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      headers: {
        "X-RapidAPI-Key": "3377dea707msha603a99f603566dp111f02jsnf970036e881b",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
      params: {
        query: params.id,
        page: page.toString(),
      },
    };

    try {
      const response = await axios(options);
      setSearchResult(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchloader(false);
    }
  };

  useEffect(() => {
    searchJob();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />
      <FlatList
        data={searchResult}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default SearchedJobs;
