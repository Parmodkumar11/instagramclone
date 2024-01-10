import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { createThumbnail } from "react-native-create-thumbnail";
import CustomGalleryView from "../components/CustomGalleryView";

interface VideoThumbnail {
    url: string;
    thumbnail: { path: string };
}

const GelleryScreen: React.FC = () => {

    const imageData = [
        { id: '1', uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4' },
        { id: '2', uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34' },
        { id: '3', uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34' },

        { id: '4', uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34' },

        { id: '5', uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34' },

        // Add more image data as needed
    ];

    const videoUrls: string[] = [
        'https://firebasestorage.googleapis.com/v0/b/reactnativefirebase-5d9de.appspot.com/o/videos%2F2023-12-11T07%3A10%3A14.875Z?alt=media&token=43c8d2f1-5390-4f12-aa0a-95d7e632e492',
        'https://firebasestorage.googleapis.com/v0/b/reactnativefirebase-5d9de.appspot.com/o/videos%2F2023-12-11T06%3A32%3A05.932Z?alt=media&token=bfc34a69-8607-4df5-90e3-7db098',
    ];

    const [thumbnails, setThumbnails] = useState<VideoThumbnail[]>([]);

    useEffect(() => {
        const fetchThumbnails = async () => {
            try {
                const thumbnailPromises = videoUrls.map(async (url) => {
                    const thumbnail = await createThumbnail({
                        url,
                        timeStamp: 10000,
                    });
                    return { url, thumbnail } as VideoThumbnail;
                });

                const thumbnailsResult = await Promise.all(thumbnailPromises);
                setThumbnails(thumbnailsResult);
            } catch (err) {
                console.error('Error fetching thumbnails:', err);
            }
        };

        fetchThumbnails();
    }, []);

    console.log(thumbnails, "thumbnails");

    return (
        <>
            <CustomGalleryView data={imageData} />
        </>
    );
};

export default GelleryScreen;
