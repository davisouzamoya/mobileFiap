import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { supabase } from '../utils/supabase';
import styles from './register.styles';

const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  userType: z.enum(['student', 'teacher'], { message: 'Por favor, selecione um tipo de usuário.' }),
});

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    // Validação com Zod
    const result = formSchema.safeParse({ name, email, password, userType });
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Dados inválidos.';
      Alert.alert('Erro de validação', firstError);
      return;
    }
    setIsLoading(true);
    try {
      // Testar conexão com profiles (opcional)
      const { error: connectionError } = await supabase.from('profiles').select('id').limit(1);
      if (connectionError) {
        if (connectionError.message.includes('permission denied')) {
          Alert.alert('Erro de permissão', 'As políticas de segurança (RLS) precisam ser configuradas no Supabase.');
        } else {
          Alert.alert('Erro de conexão', connectionError.message);
        }
        setIsLoading(false);
        return;
      }
      // Registrar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            userType,
          },
        },
      });
      if (error) {
        Alert.alert('Erro ao registrar', error.message);
        setIsLoading(false);
        return;
      }
      // (Opcional) Criar perfil na tabela profiles
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name,
          email,
          userType,
        });
      }
      Alert.alert('Registro realizado com sucesso!', 'Sua conta foi criada. Você já pode fazer login.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      Alert.alert('Erro ao registrar', error.message || 'Ocorreu um erro durante o registro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      {/* Centered content */}
      <View style={styles.centered}> 
        <View style={styles.card}>
          <Text style={styles.logo}><Text style={{color: '#19e6e6'}}>Astra</Text>Mentor</Text>
          <Text style={styles.title}>Criar uma conta</Text>
          <Text style={styles.subtitle}>Preencha os campos abaixo para se registrar na plataforma</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              value={name}
              onChangeText={setName}
              autoCapitalize="sentences"
              placeholderTextColor="#fff"
            />
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
            <Text style={styles.label}>Tipo de usuário</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity style={styles.radioOption} onPress={() => setUserType('student')}>
                <View style={[styles.radioCircle, userType === 'student' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>Aluno</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioOption} onPress={() => setUserType('teacher')}>
                <View style={[styles.radioCircle, userType === 'teacher' && styles.radioSelected]} />
                <Text style={styles.radioLabel}>Professor</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#181e2a" />
              ) : (
                <Text style={styles.buttonText}>Registrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Faça login</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
} 