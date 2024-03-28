import { View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { Listing } from '@/interfaces/listing';
import ListingsMap from '@/components/ListingsMap';
import { ListingGeo } from '@/interfaces/listingGeo';

const Page = () => {
    const [category, setCategory] = useState<string>('Wan Chai');
    //console.log('🚀 ~ Page ~ category:', category);
    const items: Listing[] = useMemo(() => listingsData as any, []);
    const geoItems: ListingGeo[] = useMemo(
        () => listingsDataGeo.features as any,
        []
    );
    console.log(
        '🚀 ~ file: index.tsx:17 ~ Page ~ geoItems:',
        listingsDataGeo.features.length
    );

    const onDataChanged = (category: string) => {
        //console.log('CHANGED: ', category);
        setCategory(category);
    };

    const filteredItems = useMemo(() => {
        if (category === '' || category === null) {
            return items;
        } else {
            return items.filter((item) => item.neighbourhood === category);
        }
    }, [category, items]);

    const filteredGeoItems = useMemo(() => {
        if (category === '' || category === null) {
            return geoItems;
        } else {
            return geoItems.filter(
                (item) => item.properties.neighbourhood === category
            );
        }
    }, [category, geoItems]);

    return (
        <View style={{ flex: 1, backgroundColor: '#5e59e6' }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ExploreHeader onCategoryChanged={onDataChanged} />
            <ListingsMap listings={filteredGeoItems} />
            {/* <Listings listings={filteredItems} category={category} /> */}
        </View>
    );
};
export default Page;
