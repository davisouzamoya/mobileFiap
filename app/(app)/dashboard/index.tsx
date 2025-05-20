import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../src/styles/dashboard.styles';
import { supabase } from '../../utils/supabase';

type TabType = 'overview' | 'stats' | 'account';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>('overview');
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    );
  }

  const isTeacher = user?.user_metadata?.userType === 'teacher' || user?.userType === 'teacher';

  return (
    <View style={{ flex: 1, backgroundColor: '#181e2a' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subtitle}> {isTeacher
                  ? 'Como professor, você pode criar e compartilhar conteúdos educacionais com seus alunos.'
                  : 'Como aluno, você pode acessar conteúdos educacionais compartilhados pelos professores.'}</Text>
            
            <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => router.push((isTeacher ? '/(app)/create-post' : '/(app)/feed/index') as any)}
              >
                <Text style={styles.actionBtnText}>
                  {isTeacher ? 'Criar Novo Conteúdo' : 'Explorar Conteúdos'}
                </Text>
              </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
} 