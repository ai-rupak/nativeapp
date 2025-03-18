import { FlatList, Image, RefreshControl, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { images } from '../../constants'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import SearchInput from '../../components/SearchInput'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  const categories = ['All', 'Music', 'Gaming', 'Education', 'Sports', 'Comedy']

  return (
    <SafeAreaView className="bg-primary flex-1">
      <StatusBar style="light" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
        ListHeaderComponent={() => (
          <View className="flex my-4 px-4 space-y-6">
            {/* Header with welcome message and logo */}
            <View className="flex justify-between items-center flex-row">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username ?? "User"}
                </Text>
              </View>

              <TouchableOpacity>
                <View className="bg-black-100 p-2 rounded-full">
                  <Image
                    source={images.logoSmall}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Search input */}
            <SearchInput />

            {/* Categories horizontal scrollview */}
            <View className="mt-2">
              <FlatList
                data={categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(item)}
                    className={`mr-3 px-4 py-2 rounded-full ${
                      activeCategory === item ? 'bg-secondary' : 'bg-black-100'
                    }`}
                  >
                    <Text
                      className={`font-pmedium ${
                        activeCategory === item ? 'text-black' : 'text-gray-100'
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* Trending section */}
            <View className="w-full flex-1 pt-3 pb-6">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-psemibold text-white">
                  Latest Videos
                </Text>
                <TouchableOpacity>
                  <Text className="text-secondary font-pmedium">See All</Text>
                </TouchableOpacity>
              </View>

              <Trending posts={latestPosts ?? []} />
            </View>
            
            {/* For You section header */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-psemibold text-white">
                For You
              </Text>
              <View className="flex-row items-center">
                <TouchableOpacity className="mr-3">
                  <Feather name="filter" size={18} color="#7b7b8b" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-secondary font-pmedium">See All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#FFA001" // Match secondary color
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home