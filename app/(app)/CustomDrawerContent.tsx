import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../utils/supabase';

export function CustomDrawerContent(props) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // O AppNavigator cuidará do redirecionamento para a tela de login
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <View style={styles.logoutButtonContent}>
           <Ionicons name="log-out-outline" size={24} color="red" style={styles.logoutIcon} />
           <Text style={styles.logoutText}>Sair</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
   logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
     marginRight: 5,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
  },
}); 