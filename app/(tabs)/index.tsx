import { View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import { Listing } from '@/interfaces/listing';

const Page = () => {
  const [category, setCategory] = useState<string>('Tiny homes');
  const items: Listing[] = useMemo(() => listingsData as any, []);

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

  return (
    <View style={{ flex: 1, backgroundColor: '#5e59e6' }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ExploreHeader onCategoryChanged={onDataChanged} />

      <Listings listings={filteredItems} category={category} />
    </View>
  );
};
export default Page;
