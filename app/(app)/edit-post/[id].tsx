import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase';
import { styles } from './styles';

export default function EditPostScreen() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    async function loadPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

   
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
      } catch (error: any) {
        console.error('Erro ao carregar post:', error);
        Alert.alert('Erro', error.message || 'Não foi possível carregar o post.');
        router.back();
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [id, user?.id, router]);

  const handleSave = async () => {
    if (!title.trim() || !description.trim() || !content.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: title.trim(),
          description: description.trim(),
          content: content.trim(),
        })
        .eq('id', id);

      if (error) throw error;

      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      router.back();
    } catch (error: any) {
      console.error('Erro ao atualizar post:', error);
      Alert.alert('Erro', error.message || 'Não foi possível atualizar o post. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.pageTitle}>Editar Conteúdo</Text>
        <Text style={styles.pageSubtitle}>
          Faça as alterações necessárias no conteúdo.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título do conteúdo"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite uma breve descrição"
            value={description}
            onChangeText={setDescription}
            maxLength={200}
          />

          <Text style={styles.label}>Conteúdo</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="Digite o conteúdo..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 