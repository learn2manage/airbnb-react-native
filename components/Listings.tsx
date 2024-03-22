import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings, category }: Props) => {
  useEffect(() => {
    console.log('RELOAD LISTINGS: ');
  }, [category]);
  return (
    <View style={{ flex: 1, marginTop: 5, backgroundColor: '#8ee490' }}>
      <Text>Listings {category}</Text>
    </View>
  );
};

export default Listings;
