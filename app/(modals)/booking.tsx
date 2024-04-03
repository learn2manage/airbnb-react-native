import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import {
    GestureHandlerRootView,
    TextInput,
} from 'react-native-gesture-handler';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { places } from '@/assets/data/places';

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const guestsGropus = [
    {
        name: 'Adults',
        text: 'Ages 13 or above',
        count: 0,
    },
    {
        name: 'Children',
        text: 'Ages 2-12',
        count: 0,
    },
    {
        name: 'Infants',
        text: 'Under 2',
        count: 0,
    },
    {
        name: 'Pets',
        text: 'Pets allowed',
        count: 0,
    },
];

const booking = () => {
    const [openCard, setOpenCard] = useState(0);
    const [selectedPlace, setSelectedPlace] = useState(0);
    const router = useRouter();
    const today = new Date().toISOString().substring(0, 10);

    const onClearAll = () => {
        setSelectedPlace(0);
        setOpenCard(0);
    };

    return (
        // Must wrap the view with GestureHandlerRootView, otherwise generate error in Android
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BlurView intensity={70} style={styles.container} tint="light">
                {/* Where */}
                <View style={styles.card}>
                    {openCard != 0 && (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(0)}
                            style={styles.cardPreview}
                            entering={FadeIn.duration(200)}
                            exiting={FadeOut.duration(200)}>
                            <Text style={styles.previewText}>Where</Text>
                            <Text style={styles.previewText}>I'm flexible</Text>
                        </AnimatedTouchableOpacity>
                    )}

                    {openCard == 0 && (
                        <Text style={styles.cardHeader}>Where To?</Text>
                    )}
                    {openCard == 0 && (
                        <Animated.View
                            entering={FadeIn}
                            exiting={FadeOut}
                            style={styles.cardBody}>
                            <View style={styles.searchSection}>
                                <Ionicons
                                    style={styles.searchIcon}
                                    name="search"
                                    size={20}
                                    color="#000"
                                />
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Search destinations"
                                    placeholderTextColor={Colors.grey}
                                />
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.placesContainer}>
                                {places.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={() => setSelectedPlace(index)}
                                        key={index}>
                                        <Image
                                            source={item.img}
                                            style={
                                                selectedPlace == index
                                                    ? styles.placeSelected
                                                    : styles.place
                                            }
                                        />
                                        <Text
                                            style={{
                                                fontFamily: 'mon',
                                                paddingTop: 6,
                                            }}>
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </Animated.View>
                    )}
                </View>

                {/* When */}
                <View style={styles.card}>
                    {openCard != 1 && (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(1)}
                            style={styles.cardPreview}
                            entering={FadeIn.duration(200)}
                            exiting={FadeOut.duration(200)}>
                            <Text style={styles.previewText}>When</Text>
                            <Text style={styles.previewText}>Any week</Text>
                        </AnimatedTouchableOpacity>
                    )}
                    {openCard === 1 && (
                        <>
                            <Text style={styles.cardHeader}>
                                When is your trip?
                            </Text>
                        </>
                    )}
                </View>

                {/* Who */}
                <View style={styles.card}>
                    {openCard != 2 && (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(2)}
                            style={styles.cardPreview}
                            entering={FadeIn.duration(200)}
                            exiting={FadeOut.duration(200)}>
                            <Text style={styles.previewText}>Who</Text>
                            <Text style={styles.previewText}>Add guests</Text>
                        </AnimatedTouchableOpacity>
                    )}
                    {openCard === 2 && (
                        <>
                            <Text style={styles.cardHeader}>Who's coming?</Text>
                        </>
                    )}
                </View>

                {/* Footer */}
                <Animated.View
                    style={defaultStyles.footer}
                    entering={SlideInDown.delay(200)}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            style={{ height: '100%', justifyContent: 'center' }}
                            onPress={onClearAll}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: 'mon-sb',
                                    textDecorationLine: 'underline',
                                }}>
                                Clear all
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                defaultStyles.btn,
                                { paddingRight: 20, paddingLeft: 50 },
                            ]}
                            onPress={() => router.back()}>
                            <Ionicons
                                name="search-outline"
                                size={24}
                                style={defaultStyles.btnIcon}
                                color={'#fff'}
                            />
                            <Text style={defaultStyles.btnText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </BlurView>
        </GestureHandlerRootView>
    );
};

export default booking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    cardHeader: {
        fontFamily: 'mon-b',
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },

    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        marginBottom: 16,
    },
    searchIcon: {
        padding: 10,
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    placesContainer: {
        flexDirection: 'row',
        gap: 25,
    },
    place: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeSelected: {
        borderColor: Colors.grey,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    previewText: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.grey,
    },
    previewdData: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.dark,
    },

    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey,
    },
});
