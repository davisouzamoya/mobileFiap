import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../utils/supabase';
import styles from './login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha o email e a senha.');
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert('Erro ao fazer login', error.message || 'Verifique suas credenciais e tente novamente.');
        setIsLoading(false);
        return;
      }
      if (!data.user) {
        Alert.alert('Erro ao fazer login', 'Não foi possível obter os dados do usuário.');
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        router.replace('/(app)/dashboard');
      }, 1000);
    } catch (error: any) {
      Alert.alert('Erro ao fazer login', 'Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.centered}>
        <View style={styles.card}>
          <Text style={styles.logo}><Text style={{color: '#19e6e6'}}>Astra</Text>Mentor</Text>
          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu.email@exemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#fff"
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="******"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#fff"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#181e2a" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Não tem uma conta? </Text>
              <Link href="/register" asChild>
                <TouchableOpacity>
                  <Text style={styles.registerLink}>Registre-se</Text>
                </TouchableOpacity>
              </Link>
            </View>
            <Text style={styles.authState}>Verificar estado da autenticação</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
} 