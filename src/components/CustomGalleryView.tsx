// CustomGalleryView.tsx
import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

interface ImageData {
  id: string;
  uri: string;
}

interface CustomGalleryProps {
  data: ImageData[];
}

const CustomGalleryView: React.FC<CustomGalleryProps> = ({ data }) => {
  const renderItem = ({ item }: { item: ImageData }) => (
    <Image source={{ uri: item.uri }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContainer: {
    // alignItems: 'center',
  },
  image: {
    width: "100%",
    height: 250,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom:30
  },
});

export default CustomGalleryView;
