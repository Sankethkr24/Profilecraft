import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../screens/Splash/SplashScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ProfileTypeScreen } from '../screens/ProfileType/ProfileTypeScreen';
import { ProfileFormScreen } from '../screens/ProfileForm/ProfileFormScreen';
import { TemplateGalleryScreen } from '../screens/Templates/TemplateGalleryScreen';
import { ProfilePreviewScreen } from '../screens/Preview/ProfilePreviewScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="ProfileType"
          component={ProfileTypeScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="ProfileForm"
          component={ProfileFormScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Templates"
          component={TemplateGalleryScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="TemplateGallery"
          component={TemplateGalleryScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="ProfilePreview"
          component={ProfilePreviewScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
