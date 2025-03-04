import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ResizeMode, Video } from "expo-av";
import { icons } from "../constants";

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 56,
  },
  creatorContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'start',
    width: '100%',
  },
  avatarWrapper: {
    width: 46,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white', // Replace with actual color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  creatorText: {
    fontSize: 12,
    color: 'white', // Replace with actual color
  },
  videoContainer: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24,
    marginTop: -24,
  },
};

const VideoCard = ({ 
  title, 
  creator, 
  avatar, 
  thumbnail, 
  video 
}) => {
  const [play, setPlay] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.creatorContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textContainer}>
          <Text 
            style={styles.titleText} 
            numberOfLines={1}
          >
            {title || "Untitled"}
          </Text>
          <Text 
            style={styles.creatorText} 
            numberOfLines={1}
          >
            {creator || "Unknown Creator"}
          </Text>
        </View>

        <TouchableOpacity>
          <Image 
            source={icons.menu} 
            style={{ width: 20, height: 20 }} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      </View>

      {play && video ? (
        <Video
          source={{ uri: video }}
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
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={styles.videoContainer}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={styles.playIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;