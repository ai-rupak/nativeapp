import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-4">
          <View className="w-20 h-20 bg-gray-700 rounded-full items-center justify-center mb-6">
            <Text className="text-white text-3xl font-pbold">B</Text>
          </View>
          
          <Text className="text-white text-2xl font-psemibold">Bookmarks</Text>
          
          <Text className="text-gray-300 text-base mt-4 font-pregular text-center px-8">
            Your saved items will appear here. Bookmark your favorite content to access it quickly later.
          </Text>
          
          <View className="mt-10 w-full max-w-xs bg-black-100 rounded-xl p-4">
            <Text className="text-gray-300 font-pmedium text-center">
              No bookmarks yet
            </Text>
            <View className="h-1 bg-secondary w-24 rounded-full mt-3 self-center"></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Bookmark