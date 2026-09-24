import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'

import { type TAuthForm, authSchema } from '@app/schemas'

import { type MobileAuthResponse, useAuthMobileRegister } from '@app/api'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Screen } from '@/components/ui/Screen'

import { saveTokens } from '@/lib/token'

export default function Register() {
  const { control, handleSubmit } = useForm<TAuthForm>({
    resolver: zodResolver(authSchema)
  })

  const { mutate, isPending } = useAuthMobileRegister({
    mutation: {
      onSuccess: async result => {
        const { accessToken, refreshToken } =
          result as unknown as MobileAuthResponse
        console.log('[register] success: tokens received, saving')
        await saveTokens(accessToken, refreshToken)
        router.replace('/')
      },
      onError: (error: Error) => {
        console.error('[register] request FAILED:', error)
      }
    }
  })

  const onSubmit = (data: TAuthForm) => {
    console.log('[register] validation OK, sending to API:', data)

    mutate({ data })
  }

  return (
    <Screen>
      <View>
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <Input
              placeholder='Enter Email'
              autoCapitalize='none'
              keyboardType='email-address'
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <Input
              placeholder='Enter password'
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          isDisabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create account'}
        </Button>
      </View>
    </Screen>
  )
}
