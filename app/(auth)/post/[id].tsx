import { Ionicons } from '@expo/vector-icons';
import { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../utils/supabase';
import PostStyles from './post.styles';

const PostDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,\
          author: profiles(id, name, avatar_url)\
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,\
          author: profiles(id, name, avatar_url)\
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      } else {
        setComments(data || []);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !user || !id) return;

    setCommentLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: id,
          author_id: user.id,
          content: newComment,
        },
      ])
      .select(`
        *,
        author: profiles(id, name, avatar_url)
      `);

    if (error) {
      console.error('Error submitting comment:', error);
    } else if (data && data.length > 0) {
      setComments([...comments, data[0]]);
      setNewComment('');
    }
    setCommentLoading(false);
  };

  if (loading) {
    return (
      <View style={PostStyles.centered}>
        <ActivityIndicator size="large" color="#23b5b5" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={PostStyles.centered}>
        <Text style={PostStyles.emptyComments}>Post not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={PostStyles.container}>
      <View style={PostStyles.headerContainer}>
        <TouchableOpacity 
          style={PostStyles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#d1d5db" />
        </TouchableOpacity>
      </View>
      <View style={PostStyles.postCard}>
        <View style={PostStyles.header}>
          <View style={PostStyles.authorInfo}>
            <View style={PostStyles.avatarContainer}>
               <Text style={PostStyles.avatarText}>{post.author?.name?.charAt(0) || 'U'} </Text>
            </View>
            <View style={PostStyles.authorDetails}>
              <Text style={PostStyles.authorName}>{post.author?.name || 'Unknown User'}</Text>
              <View style={PostStyles.postMeta}>
                <Text style={PostStyles.metaText}>
                  {post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR }) : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={PostStyles.title}>{post.title}</Text>
        {post.description && <Text style={PostStyles.description}>{post.description}</Text>}
        {post.image_url && (
          <View style={PostStyles.imageContainer}>
            <Image source={{ uri: post.image_url }} style={PostStyles.postImage} />
          </View>
        )}
        <Text style={PostStyles.postContent}>{post.content}</Text>

        <View style={PostStyles.actionsContainer}>
          <TouchableOpacity style={PostStyles.actionButton}>
            <Ionicons name="heart-outline" size={20} color="#d1d5db" />
            <Text style={PostStyles.actionButtonText}>{post.likes || 0}</Text>
          </TouchableOpacity>
          <View style={PostStyles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#d1d5db" />
            <Text style={PostStyles.actionButtonText}>{comments.length || 0} comentários</Text>
          </View>
        </View>
      </View>

      <View style={PostStyles.commentsSection}>
        <Text style={PostStyles.commentsTitle}>Comentários ({comments.length})</Text>
        <View style={PostStyles.newCommentContainer}>
          <View style={PostStyles.commentInputContainer}>
             <View style={PostStyles.avatarContainer}>
               <Text style={PostStyles.avatarText}>{user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}</Text>
            </View>
            <TextInput
              style={PostStyles.commentInput}
              placeholder="Adicione um comentário..."
              placeholderTextColor="#d1d5db"
              multiline
              value={newComment}
              onChangeText={setNewComment}
            />
          </View>
          <TouchableOpacity
            style={PostStyles.sendButton}
            onPress={handleCommentSubmit}
            disabled={commentLoading || !newComment.trim()}
          >
            {commentLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={PostStyles.sendButtonText}>Comentar</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={PostStyles.commentList}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <View key={comment.id} style={PostStyles.commentItem}>
                <View style={PostStyles.commentHeader}>
                   <View style={PostStyles.avatarContainer}>
                       <Text style={PostStyles.avatarText}>{comment.author?.name?.charAt(0) || 'U'}</Text>
                    </View>
                  <View>
                     <Text style={PostStyles.commentAuthorName}>{comment.author?.name || 'Unknown User'}</Text>
                     <Text style={PostStyles.commentTimestamp}>
                         {comment.created_at ? formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ptBR }) : ''}
                      </Text>
                   </View>
                </View>
                <Text style={PostStyles.commentContent}>{comment.content}</Text>
              </View>
            ))
          ) : (
            <Text style={PostStyles.emptyComments}>Nenhum comentário ainda. Seja o primeiro a comentar!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PostDetail;
