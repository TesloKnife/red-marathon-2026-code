import { Download, Play, Plus } from 'lucide-react-native'
import { StyleSheet, Text, View } from 'react-native'

import { MEDIA_TYPES } from '@app/types'

import { TYPE_LABELS } from '@app/constants'

import { Button } from '@/components/Button'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RED Marathon</Text>

      <Button
        icon={Play}
        onPress={() => {}}
      >
        Watch Movie
      </Button>

      <Button
        variant='secondary'
        icon={Download}
        onPress={() => {}}
      >
        Download
      </Button>

      <Button
        variant='secondary'
        icon={Plus}
        onPress={() => {}}
      />

      {MEDIA_TYPES.map(type => (
        <Text
          key={type}
          style={styles.item}
        >
          {TYPE_LABELS[type]}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  title: { color: '#fff', fontSize: 28, fontWeight: '600', marginBottom: 16 },
  item: { color: '#A1A1AA', fontSize: 16, paddingVertical: 4 }
})
