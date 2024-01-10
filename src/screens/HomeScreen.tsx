import React, { FC } from 'react';
import { View, Text } from 'react-native';
import Reels from '../components/Reels';

/**
 * HomeScreen component.
 * 
 * This component represents the home screen of the application.
 */
const HomeScreen: FC<{}> = () => {
  return (
    <>
      {/* Render the Reels component */}
      <Reels />
    </>
  );
};

export default HomeScreen;
