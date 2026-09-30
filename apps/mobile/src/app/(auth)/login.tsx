import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAuthMobileRegister } from '@app/api'

import { AuthForm } from '@/components/auth/AuthForm'

import { saveTokens } from '@/lib/token'

export default function Login() {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useAuthMobileRegister({
    mutation: {
      onSuccess: async ({ data: { accessToken, refreshToken } }) => {
        await saveTokens(accessToken, refreshToken)
        queryClient.clear()
        router.replace('/')
      },
      onError: (error: Error) => {
        console.error('[login] request FAILED:', error)
      }
    }
  })

  return (
    <AuthForm
      type='login'
      error={error}
      isPending={isPending}
      onSubmit={data => mutate({ data })}
    />
  )
}
