import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native'
import { supabase } from '../../utils/supabase'
import styles from './create-post.styles'

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [loading, setLoading] = useState(true)
  const [isTeacher, setIsTeacher] = useState(false)
  const router = useRouter()
  const { width } = useWindowDimensions()

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser()
      const userData = data?.user
      
      if (!userData) {
        router.push('/login')
        return
      }

      const isTeacherUser = userData?.user_metadata?.userType === 'teacher'
      setIsTeacher(isTeacherUser)

      if (!isTeacherUser) {
        Alert.alert('Acesso Negado', 'Apenas professores podem criar conteúdos.')
        router.push('/dashboard')
        return
      }

      setLoading(false)
    }

    checkUser()
  }, [])

  const pickImage = async (useCamera: boolean) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      })

      if (!result.canceled) {
        setImage(result.assets[0])
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao selecionar imagem')
    }
  }

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua câmera.')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      })

      if (!result.canceled) {
        setImage(result.assets[0])
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao tirar foto')
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !content.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.')
      return
    }
  
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
  
      if (!session?.user.id) {
        throw new Error('Usuário não autenticado')
      }
  
      let imageUrl = null
  
      if (image) {
        try {
  
          const fileExt = image.uri.split('.').pop()
          const fileName = `${Date.now()}.${fileExt}`
          const filePath = `${session.user.id}/${fileName}`
  
  
          
          const response = await fetch(image.uri)
          const blob = await response.blob()
  
          const { data, error } = await supabase.storage
            .from('post-images')
            .upload(filePath, blob, {
              cacheControl: '3600',
              upsert: true,
              contentType: `image/${fileExt}`,
            })
  
          if (error) {
            console.error('Erro no upload da imagem:', error)
            throw error
          }
  
          const { data: publicUrlData } = supabase
            .storage
            .from('post-images')
            .getPublicUrl(filePath)
  
          imageUrl = publicUrlData.publicUrl
  
        } catch (error) {
          console.error('Erro ao fazer upload da imagem:', error)
          Alert.alert(
            'Erro no upload',
            'Não foi possível fazer o upload da imagem. O post será salvo sem imagem.'
          )
        }
      }
  
  
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            title: title.trim(),
            description: description.trim(),
            content: content.trim(),
            image_url: imageUrl,
            author_id: session.user.id,
            status: 'published',
            created_at: new Date().toISOString(),
          },
        ])
  
      if (insertError) {
        console.error('Erro na inserção:', insertError)
        throw new Error('Erro ao criar o post')
      }
  
      Alert.alert('Sucesso', 'Post criado com sucesso!')
      router.push('/feed')
  
      setTitle('')
      setDescription('')
      setContent('')
      setImage(null)
  
    } catch (error: any) {
      console.error('Erro ao salvar post:', error)
      Alert.alert('Erro', error.message || 'Não foi possível salvar o post. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }
  

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.card}>
          <Text style={styles.title}>Criar Novo Conteúdo</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título do conteúdo"
            placeholderTextColor="#6b7280"
            value={title}
            onChangeText={setTitle}
            autoCapitalize="sentences"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite uma breve descrição"
            placeholderTextColor="#6b7280"
            value={description}
            onChangeText={setDescription}
            autoCapitalize="sentences"
          />

          <Text style={styles.label}>Conteúdo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o conteúdo do post"
            placeholderTextColor="#6b7280"
            value={content}
            onChangeText={setContent}
            autoCapitalize="sentences"
          />

          {/* <Text style={styles.label}>Imagem</Text> */}
          {/* <View style={styles.imageButtonsContainer}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => pickImage(false)}
            >
              <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => takePhoto()}
            >
              <Text style={styles.imageButtonText}>Tirar Foto</Text>
            </TouchableOpacity>
          </View> */}

          {image && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: image.uri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <Text style={styles.removeImageButtonText}>Remover Imagem</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonContainer}>
             <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => router.push('/feed')}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.submitBtnText}>Criar Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
} 