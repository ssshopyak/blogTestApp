import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreatePostScreen,
  LoginScreen,
  PostListScreen,
  PostDetailScreen,
} from '@screens';
import { useAuth } from '../redux/slices/authSlices';

export type RootStackParamList = {
  Login: undefined;
  PostList: undefined;
  CreatePost: undefined;
  PostDetail: {
    postId: string;
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const {isAuthorized} = useAuth();
  const [initialRoute] = useState<keyof RootStackParamList>(isAuthorized ? 'PostList' : 'Login');

  return (
    <Stack.Navigator
      key={initialRoute}
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthorized ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="PostList" component={PostListScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
