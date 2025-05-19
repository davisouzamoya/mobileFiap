import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { CustomDrawerContent } from './CustomDrawerContent';

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="dashboard/index"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="feed/index"
        options={{
          drawerLabel: 'Feed',
          title: 'Feed',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="settings/index"
        options={{
          drawerLabel: 'Configurações',
          title: 'Configurações',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile/index"
        options={{
          drawerLabel: 'Perfil',
          title: 'Perfil',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      {/* Outras telas como post/[id], create-post/index, edit-post/[id] não precisam estar no menu */}
      <Drawer.Screen
        name="post/[id]"
        options={{
          drawerItemStyle: { display: 'none' },
          title: '',
        }}
      />
      <Drawer.Screen
        name="create-post/index"
        options={{
           drawerItemStyle: { display: 'none' },
           title: '',
        }}
      />
       <Drawer.Screen
        name="create-post/create-post.styles"
        options={{
           drawerItemStyle: { display: 'none' },
        }}
      />
       <Drawer.Screen
        name="edit-post/[id]"
        options={{
           drawerItemStyle: { display: 'none' },
           title: '',
        }}
      />
    </Drawer>
  );
}
