import {
  BookOpen,
  Film,
  Gamepad2,
  type LucideIcon,
  Sparkles,
  Tv
} from 'lucide-react-native'

import { radius } from '@app/tokens'

import type { TitleListItemResponseType } from '@app/api'

interface ICardConfig {
  width: number
  height: number
  radius: number
  icon: LucideIcon
  stacked?: boolean
  spine?: boolean
  glow?: string
}

export const CARD_CONFIG: Record<TitleListItemResponseType, ICardConfig> = {
  MOVIE: { width: 114, height: 171, radius: radius.md, icon: Film },
  TV_SHOW: {
    width: 114,
    height: 171,
    radius: radius.md,
    icon: Tv,
    stacked: true
  },
  ANIME: {
    width: 114,
    height: 171,
    radius: radius.md,
    icon: Sparkles,
    glow: 'rgba(129, 65, 248, 0.6)'
  },
  BOOK: {
    width: 109,
    height: 164,
    radius: radius.sm,
    icon: BookOpen,
    spine: true
  },
  GAME: { width: 137, height: 183, radius: radius.lg, icon: Gamepad2 }
}
