import { Link, Redirect, router } from "expo-router";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMethod="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-white text-center">Discover Endless 
            {'         '}  Possibilities with {' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode="contain"/>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless exlporation and discovery with Aora.
          </Text>
          <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles="w-full mt-7 bg-secondary rounded-xl min-h-[62px]"
          />
        </View>
      </ScrollView>
      <StatusBar
      backgroundColor="#161622"
      style="light"/>
    </SafeAreaView>
  );
}
