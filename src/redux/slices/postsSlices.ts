import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { RootState } from '../store/store';

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  authorId: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Async actions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const snapshot = await firestore().collection('posts').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost: Omit<Post, 'id'>) => {
  const docRef = await firestore().collection('posts').add(newPost);
  return { id: docRef.id, ...newPost } as Post;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post: Post) => {
  await firestore().collection('posts').doc(post.id).update(post);
  return post;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: string) => {
  await firestore().collection('posts').doc(postId).delete();
  return postId;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
