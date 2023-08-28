import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import Welcome from "../components/home/welcome/Welcome";
import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
import Popularjobs from "../components/home/popular/Popularjobs";
import styles from "../components/common/header/screenheader.style";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
              setSearchTerm("");
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
