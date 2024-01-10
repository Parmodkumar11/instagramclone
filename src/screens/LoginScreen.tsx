import React, { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../redux/userSlice';
import Toast from 'react-native-toast-message';
import { SCREENS } from '../components/screen-enums';

interface LoginScreenProps {
    event: GestureResponderEvent;
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginScreen: FC<{}> = () => {
    const navigation = useNavigation();
    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(values.email, values.password);
            console.log(userCredential?.user,"userCredential");
            dispatch(setUser(userCredential?.user));
            navigation.navigate(SCREENS.Home)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `Please check your credentials.`,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                style={styles.logo}
                source={{
                    uri: 'https://freelogopng.com/images/all_img/1658587597instagram-png-image.png',
                }}
            />
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
                            <Text style={styles.loginButtonText}>Log In</Text>
                        </TouchableOpacity>
                        <View style={styles.orContainer}>
                            <View style={styles.line} />
                            <Text style={styles.orText}>OR</Text>
                            <View style={styles.line} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.facebookButtonText}>Don't have an account? Sign up</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 300,
        height: 70,
        marginBottom: 30,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    },
    loginButton: {
        backgroundColor: '#3897f0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
    },
    orText: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'gray',
    },
    facebookButtonText: {
        color: '#000',
        fontWeight: 'bold',
        alignSelf: "center"
    },
});

export default LoginScreen;
