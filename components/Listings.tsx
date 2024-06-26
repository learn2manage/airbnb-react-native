import {
  View,
  Image,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

interface Props {
  listings: Listing[];
  refresh: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    console.log('RELOAD LISTINGS: ', items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    // component inside expo router Link must use asChild
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeInLeft}>
          {item.medium_url ? (
            <>
              <Image source={{ uri: item.medium_url }} style={styles.image} />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 30,
                  top: 30,
                }}>
                <Ionicons name='heart-outline' size={24} color={'#000'} />
              </TouchableOpacity>
            </>
          ) : (
            <Text>{item.name}, no iamge. </Text>
          )}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ionicons name='star' size={16} />
              <Text style={{ fontFamily: 'mon-sb' }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontFamily: 'mon-sb' }}>$ {item.price}</Text>
            <Text style={{ fontFamily: 'mon' }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={{ flex: 1, marginTop: 5, backgroundColor: '#8ee490' }}>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
        ListHeaderComponent={
          <Text style={styles.info}>{items.length} homes</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;
