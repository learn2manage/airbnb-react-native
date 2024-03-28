import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ListingGeo } from '@/interfaces/listingGeo';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 22.3342,
    longitude: 114.2191,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
};

const ListingsMap = ({ listings }: Props) => {
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
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude,
                        }}
                    />
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
});

export default ListingsMap;
