import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native'
import styles from '../../../src/styles/profile.styles'
import { supabase } from '../../utils/supabase'

type Tab = 'info' | 'content' | 'settings'

type Post = {
  id: string
  title: string
  description: string | null
  created_at: string
  // Add other post properties you might need, e.g., comments count
}

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('info')
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [postsLoading, setPostsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { width } = useWindowDimensions()

  const isTeacher = user?.user_metadata?.userType === 'teacher'

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser()
      const userData = data?.user

      setUser(userData || null)
      setName(userData?.user_metadata?.name || '')
      setRegistrationNumber(userData?.user_metadata?.registrationNumber || '')
      setLoading(false)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (activeTab === 'content' && user?.id) {
      fetchPosts(user.id, searchQuery)
    }
  }, [activeTab, user, searchQuery])

  async function fetchPosts(userId: string, query = '') {
    setPostsLoading(true)
    let queryBuilder = supabase
      .from('posts')
      .select('id, title, description, created_at')
      .eq('author_id', userId)

    if (query) {
      queryBuilder = queryBuilder.ilike('title', `%${query}%`)
    }

    const { data, error } = await queryBuilder.order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar posts:', error)
      Alert.alert('Erro', 'Erro ao carregar seus conteúdos.')
      setPosts([])
    } else {
      setPosts(data)
    }
    setPostsLoading(false)
  }

  const handleSave = async () => {
    if (!user) return

    const updates = {
      ...user.user_metadata,
      name,
      registrationNumber,
    }

    const { error } = await supabase.auth.updateUser({ data: updates })

    if (!error) {
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!')
    } else {
      Alert.alert('Erro', 'Erro ao atualizar perfil.')
    }
  }

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade de edição a ser implementada.')
  }

  const handleViewPost = (postId: string) => {
    Alert.alert('Ver Post', `Navegar para o post com ID: ${postId}`)
  }

  const handleEditPost = (postId: string) => {
    Alert.alert('Editar Post', `Navegar para editar post com ID: ${postId}`)
  }

  const handleDeletePost = (postId: string) => {
    console.log('DENTRO DO handleDeletePost')
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setPostsLoading(true); // Show loading while deleting and fetching
            const { error } = await supabase
              .from('posts')
              .delete()
              .eq('id', postId);

            if (error) {
              console.error('Erro ao deletar post:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao deletar o post.');
            } else {
              Alert.alert('Sucesso', 'Post deletado com sucesso!');
              if (user?.id) {
                fetchPosts(user.id, searchQuery); // Refresh posts list
              }
            }
            // setLoading(false); // Loading is handled by fetchPosts
          },
        },
      ]
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            <Text style={styles.pageSubtitle}>
              Seus dados cadastrais e informações de conta.
            </Text>

            <View>
              {/* Email Row */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.email || 'Não informado'}</Text>
              </View>

              {/* Tipo de Usuário Row */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tipo de Usuário</Text>
                <Text style={styles.infoValue}>{isTeacher ? 'Professor' : 'Aluno'}</Text>
              </View>

              {/* Nome Row */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nome</Text>
                <Text style={styles.infoValue}>{name || 'Não informado'}</Text>
              </View>

              {/* Matrícula Row */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Matrícula</Text>
                <Text style={styles.infoValue}>{registrationNumber || 'Não informado'}</Text>
              </View>
            </View>
          </View>
        )
      case 'content':
        return (
          <View style={styles.infoCard}>
             <View style={styles.sectionHeader}>
                {/* Left side: Title and Subtitle */}
                <View>
                   <Text style={styles.sectionTitle}>Meus Conteúdos</Text>
                   <Text style={styles.pageSubtitle}>Painel administrativo dos seus conteúdos educacionais.</Text>
                </View>

               {/* Right side: Create Content Button */}
             
             </View>
             {isTeacher && (
              <View>
                  <TouchableOpacity style={styles.createButton} onPress={() => router.push('/create-post' as any)}>
                    <Text style={styles.createButtonText}>+ Criar Conteúdo</Text>
                  </TouchableOpacity>
                </View>
              )}

            {/* Search Filter */}
            <View style={styles.searchFilterContainer}>
            
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar conteúdos..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Posts List */}
            {postsLoading ? (
              <ActivityIndicator size="large" color="#23b5b5" style={styles.loadingContainer} />
            ) : posts && posts.length > 0 ? (
              posts.map((post) => (
                <View key={post.id} style={styles.postItem}>
                  <Text style={styles.postItemTitle}>{post.title}</Text>
                  <Text style={styles.postItemDescription}>{post.description || 'Sem descrição'}</Text>
                  <View style={styles.postItemDetails}>
                     <Text style={styles.postItemDetailText}>Data: {new Date(post.created_at).toLocaleDateString()}</Text>
                  </View>

                  <View style={styles.postItemActions}>
                     <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={() => router.push(`/post/${post.id}` as any)}>
                       <Text style={styles.actionButtonText}>Visualizar</Text>
                     </TouchableOpacity>
                     {isTeacher && (
                       <>
                         <TouchableOpacity style={[styles.actionButton, styles.editButtonPost]} onPress={() => router.push(`/edit-post/${post.id}` as any)}>
                           <Text style={styles.actionButtonText}>Editar</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDeletePost(post.id)}>
                           <Text style={styles.actionButtonText}>Excluir</Text>
                         </TouchableOpacity>
                       </>
                     )}
                  </View>
                </View>
              ))
            ) : (
               <View style={styles.emptyState}>
                 <Text style={{fontSize: 40}}>📄</Text>
                 <Text style={styles.emptyStateText}>Você ainda não criou nenhum conteúdo.</Text>
               </View>
            )}
          </View>
        )
      case 'settings':
        return (
           <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Configurações</Text>
             <Text style={styles.pageSubtitle}>Gerencie suas preferências e configurações de conta.</Text>

             {/* Notificações por Email */}
             <View style={styles.settingsSection}>
               <View style={styles.settingsRow}>
                 <View style={styles.settingsTextContainer}>
                   <Text style={styles.settingsTitle}>Notificações por Email</Text>
                   <Text style={styles.settingsDescription}>Receba notificações sobre novos conteúdos e atividades.</Text>
                 </View>
                 <TouchableOpacity
                   style={styles.settingsButton}
                   onPress={() => Alert.alert('Configurar Notificações', 'Funcionalidade a ser implementada.')}
                 >
                   <Text style={styles.settingsButtonText}>Configurar</Text>
                 </TouchableOpacity>
               </View>
             </View>

             {/* Segurança da Conta */}
             <View style={styles.settingsSection}>
                <View style={styles.settingsRow}>
                 <View style={styles.settingsTextContainer}>
                   <Text style={styles.settingsTitle}>Segurança da Conta</Text>
                   <Text style={styles.settingsDescription}>Altere sua senha e configure autenticação de dois fatores.</Text>
                 </View>
                 <TouchableOpacity
                   style={styles.settingsButton}
                   onPress={() => Alert.alert('Gerenciar Segurança', 'Funcionalidade a ser implementada.')}
                 >
                   <Text style={styles.settingsButtonText}>Gerenciar</Text>
                 </TouchableOpacity>
               </View>
             </View>

             {/* Excluir Conta */}
              <View style={styles.settingsSectionLast}>
                <View style={styles.settingsRow}>
                 <View style={styles.settingsTextContainer}>
                   <Text style={styles.settingsTitle}>Excluir Conta</Text>
                 </View>
                 <TouchableOpacity
                   style={styles.deleteAccountButton}
                   onPress={() => Alert.alert('Excluir Conta', 'Funcionalidade a ser implementada.')}
                 >
                   <Text style={styles.deleteAccountButtonText}>Excluir Conta</Text>
                 </TouchableOpacity>
               </View>
             </View>

          </View>
        )
      default:
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    )
  }

  const containerStyle = [
    styles.container,
    width > 768 && {
      paddingHorizontal: 80,
      alignSelf: 'center' as const,
      maxWidth: 1200,
    },
  ]

  const avatarInitial = name ? name.charAt(0).toUpperCase() : '?'

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        

        <View style={width > 768 ? { flexDirection: 'row', gap: 20 } : {}}>
          <View style={width > 768 ? { width: '30%' } : {}}>
            <View style={styles.userInfoCard}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{avatarInitial}</Text>
              </View>

              <Text style={styles.userName}>{name || 'Nome não informado'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'Email não informado'}</Text>
              <Text style={styles.userType}>{isTeacher ? 'Professor' : 'Aluno'}</Text>


            </View>
          </View>

          <View style={width > 768 ? { width: '70%' } : {}}>
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'info' && styles.tabButtonActive]}
                onPress={() => setActiveTab('info')}
              >
                <Text style={[styles.tabButtonText, activeTab === 'info' && styles.tabButtonTextActive]}>Informações</Text>
              </TouchableOpacity>
              {isTeacher && (
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'content' && styles.tabButtonActive]}
                onPress={() => setActiveTab('content')}
              >
                <Text style={[styles.tabButtonText, activeTab === 'content' && styles.tabButtonTextActive]}>Meus Conteúdos</Text>
              </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'settings' && styles.tabButtonActive]}
                onPress={() => setActiveTab('settings')}
              >
                <Text style={[styles.tabButtonText, activeTab === 'settings' && styles.tabButtonTextActive]}>Configurações</Text>
              </TouchableOpacity>
            </View>

            {renderContent()}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}