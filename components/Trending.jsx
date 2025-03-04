import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import * as Animatable from "react-native-animatable";
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../constants';

// Animation definitions
const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

// Styles object to replace Tailwind classes
const styles = {
  trendingItemContainer: {
    marginRight: 20,
  },
  videoContainer: {
    width: 208,  // w-52
    height: 288, // h-72
    borderRadius: 33,
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  touchableContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailBackground: {
    width: 208,  // w-52
    height: 288, // h-72
    borderRadius: 33,
    marginVertical: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  playIcon: {
    width: 48,   // w-12
    height: 48,  // h-12
    position: 'absolute',
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={styles.trendingItemContainer}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={styles.videoContainer}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.touchableContainer}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.thumbnailBackground}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;