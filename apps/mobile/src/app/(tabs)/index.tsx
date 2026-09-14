import { Play, Plus } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'

import { HomeHeader } from '@/components/HomeHeader'
import { Button } from '@/components/ui/Button'
import { Screen } from '@/components/ui/Screen'

export default function Index() {
  return (
    <Screen>
      <HomeHeader />

      <View style={{ marginTop: 60 }}>
        <Button
          icon={Play}
          onPress={() => {}}
        >
          Watch Movie
        </Button>

        <Button
          variant='secondary'
          icon={Plus}
          onPress={() => {}}
        />

        {/* 
        Header
          Left side: Logo (naming)
          Rihgt side: Bell (notification)

        slider (continue watching)
          Buttons: Read more, Plus (to add watch list)

        Top picks fir you (Carousel)
        
        Popular (Carousel)

      */}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})
