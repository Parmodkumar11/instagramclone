

import * as React from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Routes from './src/utills/Navigations/Routes';
import store, { persistor } from './store';
import toastConfig from './src/components/toastConfig';
import { WebView } from 'react-native-webview';


// Define AppProps interface
interface AppProps {}

// Define the toast configuration


// Define the App component
const App: React.FC<AppProps> = () => {
  return (
    <>
      {/* Wrap the entire app with Redux Provider and PersistGate */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Use the Routes component for navigation */}
          <Routes />
          {/* Display Toast messages with custom configuration */}
          <Toast
            visibilityTime={4000}
            topOffset={Platform.OS === 'ios' ? 38 : 0}
            config={toastConfig}
          />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
