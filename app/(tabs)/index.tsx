import { View } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';

const Page = () => {
  const [category, setCategory] = useState<string>('Tiny homes');

  const onDataChanged = (category: string) => {
    //console.log('CHANGED: ', category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#5e59e6' }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ExploreHeader onCategoryChanged={onDataChanged} />

      <Listings listings={[]} category={category} />
    </View>
  );
};
export default Page;
