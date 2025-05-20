import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';

export function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const { user } = useAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return;

    const currentSegment = segments[segments.length - 1];
    const isLoginOrRegister = currentSegment === 'login' || currentSegment === 'register';
    const inAppGroup = segments[0] === '(app)';

    if (isAuthenticated === false) {
      if (inAppGroup) {
        router.replace('/login');
      }
    } else {
      if (isLoginOrRegister) {
        router.replace('/(app)/dashboard');
      } else if (!inAppGroup) {
        router.replace('/(app)/dashboard');
      }
    }
  }, [isAuthenticated, segments, router]);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#23b5b5" />
        <Text style={{ color: '#d1d5db', marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
    </Stack>
  );
} 