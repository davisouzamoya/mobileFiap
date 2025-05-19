import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../../src/styles/feed.styles';
import { supabase } from '../../utils/supabase';

// Placeholder para o componente PostCard
function PostCard({ post, router, isTeacher, currentUserId, onDelete }: { post: any; router: any; isTeacher: boolean; currentUserId: string | undefined; onDelete: (postId: string) => void }) {
  const timeAgo = post.created_at 
    ? formatDistanceToNow(new Date(post.created_at), { 
        addSuffix: true, 
        locale: ptBR 
      })
    : '';

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Check if the logged-in user is the author of the post
  const isAuthor = isTeacher && currentUserId && post.author_id === currentUserId;

  const handleEdit = () => {
    setIsMenuVisible(false); // Close menu
    router.push(`/edit-post/${post.id}` as any);
  };

  const handleDelete = () => {
    setIsMenuVisible(false); // Close menu
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            onDelete(post.id);
          },
        },
      ]
    );
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <TouchableOpacity onPress={() => router.push(`/post/${post.id}` as any)} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postAuthor}>{post.profiles.name} • {timeAgo}</Text>
        {isAuthor && (
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.optionsButton}>...</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
      <View style={styles.postActions}>
        {/* <Text style={styles.postActionText}>❤️ 0</Text> */}
        <Text style={styles.postActionText}>💬 {post.comments?.[0]?.count || 0}</Text>
      </View>

      {isMenuVisible && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.menuItemText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color="#dc2626" />
            <Text style={[styles.menuItemText, styles.deleteItemText]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [isTeacher, setIsTeacher] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function checkUserType() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsTeacher(user?.user_metadata?.userType === 'teacher');
      setCurrentUserId(user?.id);
    }
    checkUserType();
  }, []);

  // Adaptação da lógica de carregar posts do web
  const loadPosts = async (query = '') => {
    try {
      setIsRefreshing(true);
      // Adaptação: Buscar posts no Supabase
      let queryBuilder = supabase
        .from('posts')
        .select('id, title, content, created_at, author_id, profiles(name), comments(count)');

      if (query) {
        // Busca simples por título ou conteúdo (ajuste conforme sua tabela)
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,content.ilike.%${query}%`);
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false });

      if (error) throw new Error(error.message);

      // Formatar dados se necessário (ex: adicionar nome do autor)
      const formattedPosts = data?.map(post => ({
        ...post,
        author: post.profiles?.[0]?.name || 'Desconhecido',
      })) || [];

      setPosts(formattedPosts);
    } catch (err: any) {
      console.error('Erro ao carregar posts:', err);
      setError(err.message || 'Erro ao carregar posts');
      Alert.alert('Erro', err.message || 'Erro ao carregar posts');
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Carregar posts na montagem e ao mudar a query de busca
    loadPosts(searchQuery);
  }, [searchQuery]);

  // Reload posts when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadPosts(searchQuery);
    }, [searchQuery])
  );

  const handleSearch = () => {
    // O input já atualiza searchQuery, useEffect se encarrega de carregar
    // Se quiser um botão de buscar explícito, descomente e use loadPosts(searchQuery);
  };

  const handleRefresh = () => {
    loadPosts(searchQuery);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      setIsLoading(true); // Or a specific deleting state
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Erro ao deletar post:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao deletar o post.');
      } else {
        Alert.alert('Sucesso', 'Post deletado com sucesso!');
        loadPosts(searchQuery); // Refresh the list after deletion
      }
    } catch (error: any) {
      console.error('Erro ao deletar post:', error);
      Alert.alert('Erro', error.message || 'Não foi possível deletar o post. Tente novamente.');
    } finally {
      setIsLoading(false); // Or the specific deleting state
    }
  };

  // TODO: Implementar handlePostDeleted se necessário
  const handlePostDeleted = () => {
    loadPosts(searchQuery);
  };

  // TODO: Implementar useAuth ou usar supabase.auth.getUser() como no Dashboard
  // Por enquanto, assumindo que o usuário está carregado ou não necessário para o feed público

  if (isLoading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    );
  }

  // TODO: Implementar tela de erro ou redirecionamento se não autenticado e feed for privado
  // Por enquanto, mostrando feed vazio ou com erro

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.pageTitle}>Feed de Conteúdos</Text>
        <Text style={styles.pageSubtitle}>Explore e descubra conteúdos educacionais compartilhados na plataforma.</Text>

        {isTeacher && (
          <TouchableOpacity 
            style={styles.createButton} 
            onPress={() => router.push('/create-post' as any)}
          >
            <Text style={styles.createButtonText}>+ Criar Conteúdo</Text>
          </TouchableOpacity>
        )}

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar conteúdos..."
            placeholderTextColor="#d1d5db"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch} // Opcional: busca ao pressionar Enter
          />
        </View>

        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} router={router} isTeacher={isTeacher} currentUserId={currentUserId} onDelete={handleDeletePost} />)
        ) : (
          <View style={styles.emptyFeedCard}>
            <Text style={styles.emptyFeedTitle}>Bem-vindo ao Feed!</Text>
            <Text style={styles.emptyFeedText}>
              Este é o seu feed de conteúdos educacionais. Aqui você encontrará materiais compartilhados por
              professores e outros educadores.
            </Text>
            <Text style={styles.emptyFeedText}>
              No momento, não há conteúdos para exibir.
            </Text>
            {isTeacher && (
              <Text style={styles.emptyFeedText}>
                Comece criando seu primeiro conteúdo!
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
} 