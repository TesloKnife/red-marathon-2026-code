import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, Text } from 'react-native'

import { Screen } from '@/components/Screen'

export default function TitleDetail() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>()
  return (
    <Screen>
      <Text>
        Title {type} {id}
      </Text>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>

      {/* 
        Header
          Left side: back button (arrow left)

        backdrop image
        title

        Meta line
          Rating, age, year, duration, genre...

        Description + AI summary btn no spoilers

        Primary button
          none -> [+ add to library]
          want  -> [start]
          progress -> [mark as done]
          done -> [done] (not clickable)
          dropped -> [dropped]
        Long press
          open full list of actions (add to library, mark as done, mark as dropped, mark as want to watch)
        
        Details
          Cast / Director /Author /Developer/ Studio - depends on type
        
        Actions
          add to watchlist, add to collection, to share...

        Similar titles (Carousel)

        Reviews (possible add rewiew button)


      */}
    </Screen>
  )
}
