import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'
import type { LucideIcon } from 'lucide-react-native'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, radius, space } from '@app/tokens'

interface Props {
  icon: LucideIcon
  onPress: () => void
  side?: 'left' | 'right'
  iconOffset?: number
}

export function FloatingButton({
  icon: Icon,
  onPress,
  side,
  iconOffset
}: Props) {
  const insets = useSafeAreaInsets()

  const position = [
    styles.root,
    { top: insets.top + space[2] },
    side === 'left'
      ? { left: space['layout-horizontal'] }
      : { right: space['layout-horizontal'] }
  ]

  const content = (
    <Icon
      size={26}
      color={colors.text.primary}
      style={iconOffset ? { marginLeft: iconOffset } : undefined}
    />
  )

  if (isGlassEffectAPIAvailable()) {
    return (
      <Pressable
        onPress={onPress}
        style={[position, styles.fallback]}
        hitSlop={12}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={position}>
      <GlassView
        style={styles.glass}
        glassEffectStyle='clear'
        isInteractive
      >
        <Pressable
          onPress={onPress}
          style={styles.press}
          hitSlop={12}
        >
          {content}
        </Pressable>
      </GlassView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  glass: { flex: 1, borderRadius: radius.full },
  press: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
})
