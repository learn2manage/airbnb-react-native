import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import { Try } from 'expo-router/build/views/Try';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log('🚀 ~ onSaveUser ~ error:', error);
    } finally {
      setEdit(false);
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name='notifications-outline' size={26} />
      </View>
      {user && (
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {!edit && (
            <View style={styles.editRow}>
              <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                {firstName} {lastName}
              </Text>
              <TouchableOpacity onPress={() => setEdit(false)}>
                <Ionicons name='create-outline' size={24} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <View>
        {isSignedIn && <Button title='Log out' onPress={() => signOut()} />}
        {!isSignedIn && (
          <Link href={'/(modals)/login'} asChild>
            <Button title='Log In' color={Colors.dark} />
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export default Page;
