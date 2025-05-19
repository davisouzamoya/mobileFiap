import { User } from '@supabase/supabase-js';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../utils/supabase';
import styles from './edit-post.styles';

type Post = {
  id: string;
  title: string;
  description: string | null;
  content: string;
  author_id: string;
  image_url: string | null;
};

export default function EditPostPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
 
    async function checkAuthorizationAndFetchPost() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user || user.user_metadata?.userType !== 'teacher') {
        Alert.alert('Acesso negado', 'Você não tem permissão para editar posts.');
        router.push('/dashboard');
        return;
      }

      if (!id) {
         Alert.alert('Erro', 'ID do post não fornecido.');
         router.push('/dashboard');
         return;
      }

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id, title, description, content, author_id, image_url')
        .eq('id', id)
        .single();

      if (postError || !postData) {
        console.error('Erro ao buscar post:', postError);
        Alert.alert('Erro', 'Post não encontrado.');
        router.push('/dashboard');
        return;
      }

      if (postData.author_id !== user.id) {
        Alert.alert('Acesso negado', 'Você não é o autor deste post.');
        router.push('/dashboard');
        return;
      }

      setPost(postData);
      setTitle(postData.title);
      setDescription(postData.description || '');
      setContent(postData.content);
      setImageUrl(postData.image_url);
      setIsAuthorized(true);
      setLoading(false);
    }

    checkAuthorizationAndFetchPost();
  }, [id, router]);

  const handleUpdatePost = async () => {
    if (!post || isSaving) return;

    setIsSaving(true);

    const updates = {
      title,
      description: description || null,
      content,
      image_url: imageUrl,
    };

    const { error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', post.id);

    if (error) {
      console.error('Erro ao atualizar post:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o post.');
    } else {
      router.push('/feed' as any); // Navigate to feed after successful update
    }

    setIsSaving(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    );
  }

  if (!isAuthorized || !post) {
    return null; // Redirection handled in useEffect
  }

  return (
    <ScrollView style={styles.container}>
      {/* <Stack.Screen options={{ title: 'Editar Conteúdo' }} /> */}
      <View style={styles.card}>
        <Text style={styles.title}>Editar Conteúdo</Text>
        <Text style={styles.subtitle}>Atualize as informações do seu conteúdo educacional.</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição (Opcional)"
            placeholderTextColor="#aaa"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conteúdo"
            placeholderTextColor="#aaa"
            multiline
            value={content}
            onChangeText={setContent}
          />
           {/* Image input field - can be improved with image picker later */}
           <TextInput
            style={styles.input}
            placeholder="URL da Imagem (Opcional)"
            placeholderTextColor="#aaa"
            value={imageUrl || ''}
            onChangeText={setImageUrl}
            keyboardType="url"
            autoCapitalize="none"
          />
          {imageUrl ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
            </View>
          ) : null}

          {/* TODO: Add Image Picker functionality */}

          <TouchableOpacity
            style={[styles.button, isSaving && styles.disabledButton]}
            onPress={handleUpdatePost}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Atualizar</Text>
            )}
          </TouchableOpacity>

           <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSaving}
          >
             <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}
