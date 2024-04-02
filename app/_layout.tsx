import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ModalHeaderText from '@/components/ModalHeaderText';
import Colors from '@/constants/Colors';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (error) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (error) {
            return;
        }
    },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        mon: require('../assets/fonts/Montserrat-Regular.ttf'),
        'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    // wrap the RootLayoutNav by ClerkProvider
    // return <RootLayoutNav />;
    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY!}
            tokenCache={tokenCache}
        >
            <RootLayoutNav />
        </ClerkProvider>
    );
}

function RootLayoutNav() {
    // obtain auth status from clerk
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    // Automatic trigger login page
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/(modals)/login');
        }
    }, [isLoaded]);

    return (
        <Stack>
            <Stack.Screen
                name="(modals)/login"
                options={{
                    title: 'Log in or sign up',
                    presentation: 'modal',
                    headerTitleStyle: {
                        fontFamily: 'mon-sb',
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close-outline" size={28} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
            <Stack.Screen
                name="(modals)/booking"
                options={{
                    presentation: 'transparentModal',
                    headerTransparent: true,
                    headerTitle: () => <ModalHeaderText />,
                    animation: 'fade',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={{
                                backgroundColor: '#817e7e',
                                borderColor: Colors.grey,
                                borderRadius: 20,
                                borderWidth: 1,
                                padding: 4,
                            }}
                        >
                            <Ionicons name="close-outline" size={28} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}
