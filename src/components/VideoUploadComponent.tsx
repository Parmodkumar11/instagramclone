import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker'; // Import Image type
import Icon from 'react-native-vector-icons/Ionicons';
import { addData } from '../redux/dataSlice'; // Use the correct extension
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';
import { get, getDatabase, ref, set } from 'firebase/database';
import { db } from '../../database/firebase';
interface VideoUploadComponentProps { }

const VideoUploadComponent: React.FC<VideoUploadComponentProps> = () => {
  const [selectedVideo, setSelectedVideo] = useState<Image | null>(null); // Specify the type of selectedVideo
  const dispatch: AppDispatch = useDispatch();

  const pickVideo = async () => {
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'MediumQuality',
      });

      // Check if the selected video is in MP4 format
      if (video.mime === 'video/mp4') {
        // Handle the selected video (e.g., upload it to a server)
        handleVideoUpload(video);
        setSelectedVideo(video);

      } else {
        console.log('Selected video is not in MP4 format.');
      }
    } catch (error) {
      console.log('Error picking video:', error);
    }
  };

  const [realTimeData, setRealTimeData] = useState<any[]>([]);

  const fetchUserData = async () => {
    const userRef = ref(db, `users/NtPYKYuTwohf8bAQ4Tys6asIqc52`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData, "userData111");
        setRealTimeData(userData.Video)
        return userData;
      } else {
        console.log('No data available for user ID:');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  // Usage example



  const data = realTimeData

  useEffect(() => {
    fetchUserData();
  })

  const handleVideoUpload = async (video: Image) => {
    if (video.path) {
      try {
        const response = await fetch(video.path);
        const blob = await response.blob();

        const storageRef = storage().ref().child('videos/' + new Date().toISOString());
        const uploadTask = storageRef.put(blob);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle progress or other state changes if needed
            // For example, you can calculate and show the upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            Toast.show({
              type: 'success',
              text1: `Upload is ${progress}% done`,
            });


            if (progress === 100) {
              set(ref(db, 'users/' + "NtPYKYuTwohf8bAQ4Tys6asIqc52"), {
                Video: ["parmod","kumar"],
              });
            }
          },
          (error) => {
            console.log(error, "errorerror");
            Toast.show({
              type: 'error',
              text1: 'Video upload failed',
            });
          },
          () => {
            // Handle successful upload

          }
        );
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error fetching video',
        });
      }
    }
  };

  return (
    <TouchableOpacity onPress={pickVideo}>
      <Icon name={"add"} size={30} color={"#000"} />
    </TouchableOpacity>
  );
};

export default VideoUploadComponent;
