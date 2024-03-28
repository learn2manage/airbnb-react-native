import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';

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
    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
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
});

export default ListingsMap;
