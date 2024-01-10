import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProflieScreen';
import { RootState } from '../../../store';
import { SCREENS } from '../../components/screen-enums';
import { RootStackParamList } from '../navigation.types';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoUploadComponent from '../../components/VideoUploadComponent';

// Define a Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the Routes component
const Routes: React.FC = () => {
  // Get user data from Redux state
  const userData = useSelector((state: RootState) => state.user?.user);

  return (
    <>
      {/* Navigation container for the entire app */}
      <NavigationContainer>
        {/* Stack Navigator to manage the screens */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userData?.email ? (
            // If user is logged in, show Home and Profile screens
            <>
              <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }) => ({
                  headerShown: true,
                  title: 'Gallery',
                  headerRight: () => (
                    <VideoUploadComponent />

                  ),
                })}
              />
            </>
          ) : (
            // If user is not logged in, show Login and SignUp screens
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
