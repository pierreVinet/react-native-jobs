import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  NearbyJobCard,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import styles from "../../styles/search";

import resultsSaved from "./results.json";

const SearchedJobs = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1);

  const searchJob = async () => {
    setSearchResult([]);
    setSearchLoader(true);
    setSearchError(false);

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      headers: {
        "X-RapidAPI-Key": "1d3160adeemshbef92adf92f58fap19f8fbjsna8356b3cdfba",
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
      //   console.log(response.data.data);
    } catch (error) {
      setSearchError(true);
      console.error(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const searchJobNextPage = (direction) => {
    if (direction === "next") {
      setPage(page + 1);
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  };

  useEffect(() => {
    searchJob();
  }, [page]);

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
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(job) => job.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : searchError ? (
                <Text style={styles.paginationText}>Something went wrog</Text>
              ) : null}
            </View>
          </>
        }
        ListFooterComponent={() => (
          <>
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  searchJobNextPage("previous");
                }}
                className={page === 1 ? "opacity-60" : ""}
                disabled={page === 1 ? true : false}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.paginationText}>Page {page}</Text>

              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  searchJobNextPage("next");
                }}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchedJobs;
