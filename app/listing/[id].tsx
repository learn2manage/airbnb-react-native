import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

// Since listing folder is not within (tabs) pages here will not be displayed inside tabs
const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log('🚀 ~ file: [id].tsx:8 ~ Page ~ id:', id);

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
