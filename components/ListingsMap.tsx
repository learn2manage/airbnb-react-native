import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 22.2745,
    longitude: 114.1709,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

const ListingsMap = ({ listings }: Props) => {
    const router = useRouter();
    const mapRef = useRef<any>(null);
    const [region, setRegion] = useState<any>(null);

    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`);
    };

    useEffect(() => {
        onLocateMe();
    }, []);

    useEffect(() => {
        if (listings.length > 0) {
            const newRegion = {
                latitude: parseFloat(listings[0].properties.latitude),
                longitude: parseFloat(listings[0].properties.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
            setRegion(newRegion);
        }
    }, [listings]);

    useEffect(() => {
        console.log(
            '🚀 ~ file: ListingsMap.tsx:42 ~ useEffect ~ region:',
            region
        );
        if (region) {
            mapRef.current.animateToRegion(region, 1000);
        }
    }, [region]);

    const onLocateMe = () => {
        const region = {
            //latitude: 22.3343,
            //longitude: 114.9327,
            latitude: parseFloat(listings[0].properties.latitude),
            longitude: parseFloat(listings[0].properties.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        console.log(
            '🚀 ~ file: ListingsMap.tsx:62 ~ onLocateMe ~ region:',
            region
        );

        mapRef.current?.animateToRegion(region);
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                showsUserLocation
                showsMyLocationButton
                initialRegion={region}
            >
                {listings.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude,
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                $ {item.properties.price}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
            <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
                <Ionicons name="navigate" size={24} color={Colors.dark} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
    locateBtn: {
        position: 'absolute',
        top: 70,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
});

export default ListingsMap;
