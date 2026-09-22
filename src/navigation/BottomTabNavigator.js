import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/theme';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { MyProfilesScreen } from '../screens/SavedProfiles/MyProfilesScreen';
import { TemplateGalleryScreen } from '../screens/Templates/TemplateGalleryScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const CustomFabButton = ({ onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={styles.fabContainer}
  >
    <View style={styles.fabInner}>
      <Feather name="plus" size={24} color={COLORS.surface} />
    </View>
  </TouchableOpacity>
);

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.labelStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="My Profiles"
        component={MyProfilesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="user" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="CreateProfile"
        component={HomeScreen} // Placeholder tab target, handled by FAB listener
        options={({ navigation }) => ({
          tabBarButton: () => (
            <CustomFabButton onPress={() => navigation.navigate('ProfileType')} />
          ),
        })}
      />
      <Tab.Screen
        name="Templates"
        component={TemplateGalleryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="grid" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="settings" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 60,
    paddingBottom: SPACING.xs,
    paddingTop: SPACING.xs,
    elevation: 10,
  },
  labelStyle: {
    fontSize: 11,
    fontWeight: '600',
  },
  fabContainer: {
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
