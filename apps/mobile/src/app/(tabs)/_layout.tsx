import { Tabs } from 'expo-router'
import { Home, Library, Search, User } from 'lucide-react-native'

import { colors } from '@app/tokens'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text['little-muted'],
        tabBarStyle: {
          backgroundColor: colors.bg.base,
          borderTopColor: colors.border
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Home
              color={color}
              size={22}
            />
          )
        }}
      />
      <Tabs.Screen
        name='library'
        options={{
          title: 'Библиотека',
          tabBarIcon: ({ color }) => (
            <Library
              color={color}
              size={22}
            />
          )
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Поиск',
          tabBarIcon: ({ color }) => (
            <Search
              color={color}
              size={22}
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => (
            <User
              color={color}
              size={22}
            />
          )
        }}
      />
    </Tabs>
  )
}
