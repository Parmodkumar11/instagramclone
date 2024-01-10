// toastConfig.tsx

import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#359801',
        width: '100%',
        backgroundColor: '#359801',
      }}
      contentContainerStyle={{ paddingHorizontal: 0 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: '#fff',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

export default toastConfig;
