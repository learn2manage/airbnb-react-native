import { View, Text } from 'react-native';
import React from 'react';
import listingData from '@/assets/data/airbnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';

const Page = () => {
    return (
        <View style={{ flex: 1, marginTop: 10 }}>
            <ListingsMap listings={listingsDataGeo} />
        </View>
    );
};

export default Page;
