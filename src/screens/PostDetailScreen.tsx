import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Header} from '@components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackNavigator';
import {useAuth} from '../redux/slices/authSlices';
import {Colors} from '@constants';
import {IPostData,IComment} from '@models';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

const PostDetailScreen = () => {
  const route = useRoute<PostDetailRouteProp>();
  const {postId} = route.params;
  const {user} = useAuth();

  const [post, setPost] = useState<IPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const doc = await firestore().collection('posts').doc(postId).get();
        if (doc.exists) {
          setPost(doc.data() as IPostData);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      const snapshot = await firestore()
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .get();

      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as IComment[];

      setComments(fetchedComments);
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    if (!user) return Alert.alert('Помилка', 'Ви не авторизовані');

    setAdding(true);
    const comment = {
      content: commentText.trim(),
      authorId: user.uid,
      createdAt: Date.now(),
    };

    try {
      const ref = await firestore()
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add(comment);

      setComments(prev => [{ id: ref.id, ...comment }, ...prev]);
      setCommentText('');
    } catch (err) {
      console.log(err)
      Alert.alert('Помилка', 'Не вдалося додати коментар');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 32 }} />;
  }

  if (!post) {
    return <Text style={{ textAlign: 'center', marginTop: 32 }}>Пост не знайдено</Text>;
  }

  
  return (
    <View style={styles.container}>
      <Header title="Пост і коментарі" isArrow={true} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.contentItem}>
            <Text style={styles.commentText}>{post.title}</Text>
            <Text style={[styles.commentText, { marginTop: 8 }]}>{post.content}</Text>
          </View>
        }
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentText}>{item.content}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 20 }}>Поки немає коментарів</Text>}
        contentContainerStyle={styles.contentContainer}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Ваш коментар"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment} disabled={adding}>
          <Text style={{ color: 'white' }}>{adding ? '...' : 'Надіслати'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  commentItem: {
    backgroundColor: Colors.grey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  contentItem: {
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  commentText: {
    fontSize: 16,
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3478f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
});

export default PostDetailScreen;