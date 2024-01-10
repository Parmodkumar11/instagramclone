import React, { useState, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Text, Image, Alert } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import FollowButton from './FollowButton';
import VideoUploadComponent from './VideoUploadComponent';
import { RootState, AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { removeData } from '../redux/dataSlice';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import { clearUser } from '../redux/userSlice';
import { Share } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';
import { db } from '../../database/firebase';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from './screen-enums';

interface ReelsProps { }

const Reels: React.FC<ReelsProps> = () => {
    const navigation = useNavigation();
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);
    const [videoPaused, setVideoPaused] = useState<boolean>(true);
    const [showControlBar, setShowControlBar] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const flatListRef = useRef<FlatList | null>(null);

    const setTime = (data: { currentTime: number }) => {
        console.log('Video current time:', data.currentTime);
    };

    const dispatch: AppDispatch = useDispatch();

    const [Viedodata, setViedodata] = useState<any>()

    const getVideoURLs = async () => {
        try {
            const videoRefs = await storage().ref(`videos/`).list();
            const videoURLs = await Promise.all(
                videoRefs.items.map(async (item) => {
                    const url = await item.getDownloadURL();
                    return { id: item.name, url };
                })
            );
            setViedodata(videoURLs);
            return videoURLs;
        } catch (error) {
            throw error;
        }
    }



    const videoUrls: Array<string> = Viedodata

    useEffect(() => {
        getVideoURLs();
    })

    const togglePlayPause = () => {
        setVideoPaused((prev) => !prev);
        startControlBarTimeout(); // Start the timeout again after interaction
    };

    const startControlBarTimeout = () => {
        // Hide control bar after 2 seconds
        setTimeout(() => {
            setShowControlBar(false);
        }, 5000);
    };

    const playVideo = (index: number) => {
        setCurrentVideoIndex(index);
        setVideoPaused(false);
        setShowControlBar(true);
        startControlBarTimeout();
    };

    const onViewableItemsChanged = useRef((viewableItems: { viewableItems: Array<{ index: number }> }) => {
        if (viewableItems.viewableItems.length > 0) {
            const firstVisibleIndex = viewableItems.viewableItems[0].index;
            if (firstVisibleIndex !== currentVideoIndex) {
                setCurrentVideoIndex(firstVisibleIndex);
                setVideoPaused(false);
            }
        }
    }).current;

    const profilelogo: string = 'https://i.pinimg.com/736x/18/60/ab/1860ab88a51e38fbbbc7ba9f76957943.jpg';
    const posterimg: string = "https://i.pinimg.com/originals/a3/69/9b/a3699bfe26fcc2346be6b5cda7f51553.jpg"; // Specify the poster image


    const handleRemoveData = async (id: string) => {
        if (id) {
            try {
                const videoRef = storage().ref(`videos/${id}`);
                await videoRef.delete();
                Toast.show({
                    type: 'success',
                    text1: `Video remove successful`,
                });
                getVideoURLs()
            } catch (error) {
                console.error(`Error removing video with ID 2023-12-07T05:50:06.604Z:`);
                throw error;
            }
        }
    };


    const onShare = async (url: string) => {
        try {
            const result = await Share.share({
                message:
                    `${url}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
        }
    };

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <TouchableWithoutFeedback onPress={() => playVideo(index)}>
            <View>
                <Video
                    poster={posterimg}
                    posterResizeMode="cover" // or 'contain' or 'stretch'
                    source={{ uri: item.url }}
                    key={index}
                    repeat={false}
                    playInBackground={false}
                    playWhenInactive={false}
                    onProgress={setTime}
                    resizeMode="cover"
                    paused={index !== currentVideoIndex || videoPaused}
                    muted={false}
                    style={{
                        width: '100%',
                        height: 683
                    }}
                />
                {index === currentVideoIndex && showControlBar && (
                    <View style={styles.controlBar}>
                        <TouchableOpacity activeOpacity={0.6} onPress={togglePlayPause}>
                            <Text style={styles.controlButton}>
                                {!videoPaused ? <Icon name="volume-high-outline" size={30} color="#fff" /> : <Icon name="volume-mute-outline" size={30} color="#fff" />}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Right side design */}
                <View style={styles.rightSideDesign}>
                    <TouchableWithoutFeedback onPress={() => setIsLiked(!isLiked)}>
                        <View>
                            <Icon name={isLiked ? "heart-sharp" : "heart-outline"} size={30} color={isLiked ? "red" : "#fff"} />
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={{ color: "#fff", marginTop: 5 }}>94.9k</Text>
                    <View style={styles.chatstyle}>
                        <Icon name={"chatbubble-outline"} size={30} color={"#fff"} />
                        <Text style={{ color: "#fff", marginTop: 5 }}>5,782</Text>
                    </View>
                    <View style={styles.chatstyle}>
                        <TouchableOpacity onPress={() => onShare(item.url)}>
                            <Icon name={"paper-plane-outline"} size={30} color={"#fff"} />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff", marginTop: 5 }}>9.9k</Text>
                    </View>
                    <View style={styles.chatstyle}>
                        <TouchableOpacity onPress={(event) => {
                            if (item.id) {
                                handleRemoveData(item.id);
                            }
                        }
                        }>
                            <Icon name={"trash-outline"} size={30} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chatstyle}>
                        <TouchableOpacity onPress={() => {
                            dispatch(clearUser());
                        }}>
                            <Image style={styles.rightSideprofile}
                                source={{
                                    uri: profilelogo,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bottom profile section */}
                {index === currentVideoIndex && (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(SCREENS.Profile)
                    }} style={styles.bottomProfile}>
                        <View style={styles.profilesection}>
                            <Image style={styles.profilelogo}
                                source={{
                                    uri: profilelogo,
                                }}
                            />
                            <Text style={{ color: "#fff" }}>karan_aujla</Text>
                            <FollowButton />
                        </View>
                        <Text style={{ color: "#fff" }}>Follow for more @karanaujla</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.topSection}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#fff", marginTop: 5, fontWeight: "800", fontSize: 20, letterSpacing: 1 }}>Reels</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );



    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            ref={(ref) => (flatListRef.current = ref)}
            data={videoUrls}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
            }}
            ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                    <Text style={{}}>No videos available</Text>
                    <VideoUploadComponent />
                </View>
            )}
        />
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlBar: {
        position: 'absolute',
        top: '40%', // Center vertically
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    controlButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 30
    },
    rightSideDesign: {
        position: 'absolute',
        top: "45%",
        right: 0,
        bottom: 0,
        width: 50, // Adjust the width as needed
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomProfile: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    chatstyle: {
        paddingVertical: 12
    },
    profilelogo: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginRight: 10
    },
    profilesection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    rightSideprofile: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    topSection: {
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 15,
        width: '100%', // Take the full width
    },
});

export default Reels;
function auth() {
    throw new Error('Function not implemented.');
}

