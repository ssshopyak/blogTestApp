import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { z } from 'zod';
import { useAppDispatch, useAuth } from '../redux/slices/authSlices';
import { addPost } from '../redux/slices/postsSlices';
import { Button, Header } from '@components';

const postSchema = z.object({
  title: z.string().min(3, 'Мінімум 3 символи'),
  content: z.string().min(10, 'Мінімум 10 символів'),
});

const CreatePostScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const onSubmit = () => {
    const result = postSchema.safeParse({ title, content });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        content: fieldErrors.content?.[0],
      });
      return;
    }

    if (!user) {
      Alert.alert('Помилка', 'Користувач не авторизований');
      return;
    }

    const post = {
      title,
      content,
      createdAt: Date.now(),
      authorId: user.uid,
    };

    dispatch(addPost(post))
      .unwrap()
      .then(() => {
        Alert.alert('Успіх', 'Пост створено');
        setTitle('');
        setContent('');
        setErrors({});
      })
      .catch((error) => {
        Alert.alert('Помилка', 'Не вдалося створити пост'); 
        console.log(error);
      });
  };

  return (
    <>
        <Header title='Створення поста' isArrow />
        <View style={styles.container}>
          <Text style={styles.label}>Назва поста</Text>
          <TextInput
              style={styles.input}
              placeholder="Введіть назву"
              value={title}
              onChangeText={setTitle} />
          {errors.title && <Text style={styles.error}>{errors.title}</Text>}

          <Text style={styles.label}>Контент</Text>
          <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Введіть текст поста"
              value={content}
              multiline
              numberOfLines={6}
              onChangeText={setContent} />
          {errors.content && <Text style={styles.error}>{errors.content}</Text>}

          <Button
              isBig={false}
              title="Створити пост"
              onPress={onSubmit}
              backgroundColor="#3478f6"
              color="#fff" />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default CreatePostScreen;
