import { LinearGradient } from 'expo-linear-gradient'
import { Play, Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

import type { TitleListItemResponse } from '@app/api'

import { Button } from '../ui/Button'

import { HomeHeroSlide } from './HomeHeroSlide'
import { PaginationDot } from './PaginationDot'

interface Props {
  items: TitleListItemResponse[]
}

export function HomeHeroSlider({ items }: Props) {
  const { width } = useWindowDimensions()
  const [index, setIndex] = useState(0)

  const height = width * 1.4
  const current = items[index]

  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.set(event.contentOffset.x)
  })

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width))
  }

  return (
    <View style={{ height }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {items.map((item, i) => (
          <HomeHeroSlide
            key={item.id}
            item={item}
            index={i}
            width={width}
            height={height}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>

      <LinearGradient
        colors={[
          'rgba(2,0,3,0.7)',
          'transparent',
          'rgba(2,0,3,0.9)',
          colors.bg.base
        ]}
        locations={[0, 0.35, 0.75, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents='none'
      />

      <View
        style={styles.content}
        pointerEvents='box-none'
      >
        <Animated.View
          key={current?.id}
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(200)}
          style={{ gap: space[2] }}
          pointerEvents='none'
        >
          <Text
            style={styles.name}
            numberOfLines={2}
          >
            {current?.name}
          </Text>

          <Text style={styles.genres}>
            Thrillers • Drammas • Action • Chime
          </Text>

          <Text
            style={styles.description}
            numberOfLines={2}
          >
            When an overachieving college senior makes a wrong turn, her road
            trip becomes a life-changing fight for...
          </Text>
        </Animated.View>

        <View
          style={styles.bottom}
          pointerEvents='box-none'
        >
          <View style={styles.actions}>
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
            ></Button>
          </View>

          <View style={styles.dots}>
            {items.map((item, index) => (
              <PaginationDot
                key={item.id}
                index={index}
                width={width}
                scrollX={scrollX}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space['layout-horizontal'],
    paddingBottom: space[4],
    gap: space[2]
  },
  genres: {
    color: colors.text.primary,
    fontSize: fontSize.sm
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold
  },
  description: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    lineHeight: 20
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: space[3]
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: space[3] },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2]
  }
})
