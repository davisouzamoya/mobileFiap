import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../utils/supabase';
import { styles } from './styles';

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    async function loadPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*, profiles(name)')
          .eq('id', id)
          .single();

        if (error) throw error;

        setPost(data);
        await loadComments(data.id);
      } catch (error: any) {
        console.error('Erro ao carregar post:', error);
        Alert.alert('Erro', error.message || 'Não foi possível carregar o post.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [id]);

  async function loadComments(postId: string) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profiles(name)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(data || []);
      console.log('Comentários carregados:', data);
    } catch (error: any) {
      console.error('Erro ao carregar comentários:', error);
      Alert.alert('Erro', error.message || 'Não foi possível carregar os comentários.');
    }
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      Alert.alert('Erro', 'Por favor, digite um comentário.');
      return;
    }

    try {
      console.log('Attempting to add comment:', commentText);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log('User not authenticated.');
        Alert.alert('Erro', 'Você precisa estar logado para comentar.');
        return;
      }

      console.log('User authenticated, user ID:', user.id);
      console.log('Post ID:', id);
      console.log('Comment content:', commentText.trim());

      const { error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: id,
            author_id: user.id,
            content: commentText.trim(),
          },
        ]);

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('Comentário adicionado e salvo com sucesso!');
      setCommentText('');
      await loadComments(post.id);

    } catch (error: any) {
      console.error('Erro ao salvar comentário:', error);
      Alert.alert('Erro', error.message || 'Não foi possível salvar o comentário.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.centeredLoader}>
        <Text style={styles.errorText}>Post não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.postCard}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>Por {post.profiles.name}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.commentsSectionTitle}>Comentários ({comments.length})</Text>

        <View style={styles.addCommentContainer}>
           <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>D</Text>
           </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Adicione um comentário..."
            placeholderTextColor={styles.engagementText.color}
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
            <Text style={styles.commentButtonText}>Comentar</Text>
          </TouchableOpacity>
        </View>

        {comments.length === 0 ? (
          <Text style={styles.noCommentsText}>Nenhum comentário ainda. Seja o primeiro a comentar!</Text>
        ) : (
          <View>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{comment.profiles.name.charAt(0)}</Text>
                </View>
                <View style={styles.commentContentContainer}>
                  <Text style={styles.commentAuthor}>{comment.profiles.name}</Text>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
} 