import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const FollowButton = () => {
    const [isFollowing, setIsFollowing] = useState(false);
  
    const handleFollowPress = () => {
      setIsFollowing(!isFollowing);
    };
  
    return (
      <TouchableOpacity onPress={handleFollowPress} style={styles.followButton}>
        <Text style={styles.followButtonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    followButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 3,
      paddingHorizontal: 10,
      borderRadius: 5,
      borderWidth:1,
      borderColor: '#fff', // You can set the color of the border
      marginLeft:10,
      borderRadius:4
    },
    followButtonText: {
      color: '#fff',
      marginLeft: 5,
      fontWeight: 'bold',
    },
  });
  
  export default FollowButton;