import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabNavigator } from './BottomTabNavigator';
import { ProfileTypeScreen } from '../screens/ProfileType/ProfileTypeScreen';
import { ProfileFormScreen } from '../screens/ProfileForm/ProfileFormScreen';
import { TemplateGalleryScreen } from '../screens/Templates/TemplateGalleryScreen';
import { ProfilePreviewScreen } from '../screens/Preview/ProfilePreviewScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="ProfileType" component={ProfileTypeScreen} />
        <Stack.Screen name="ProfileForm" component={ProfileFormScreen} />
        <Stack.Screen name="TemplateGallery" component={TemplateGalleryScreen} />
        <Stack.Screen name="ProfilePreview" component={ProfilePreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
