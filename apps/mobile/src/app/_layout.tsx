import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import {
  DarkTheme,
  SafeAreaProviderCompat,
  ThemeProvider
} from 'expo-router/build/react-navigation'
import { StatusBar } from 'expo-status-bar'

import '@/lib/api'

// Якорь корневого навигатора: при запуске открывать (tabs), а не первую группу по алфавиту
export const unstable_settings = { anchor: '(tabs)' }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000 //1 minute
    }
  }
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProviderCompat>
        <ThemeProvider value={DarkTheme}>
          <StatusBar style='light' />
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </SafeAreaProviderCompat>
    </QueryClientProvider>
  )
}
