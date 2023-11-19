import { MandalaArtThemeKeyofType } from '@/types/theme';

interface DescriptionInType {
  title: string;
  text: string;
  point: number;
}

export type DescriptionTypes = {
  [key in MandalaArtThemeKeyofType]: DescriptionInType;
}

export const themeDescription: DescriptionTypes = {
  GrayTheme: {
    title: '그레이',
    text: '그레이색이야',
    point: 0
  },
  BlackPinkTheme: {
    title: '블랙핑크',
    text: '어떤 그룹이 생각나네요',
    point: 10
  },
  HighContrastTheme: {
    title: '사이버',
    text: '조금 이른 미래의 기술',
    point: 27
  },
  CarrotTheme: {
    title: '당근',
    text: '토끼들이 좋아하겠네요',
    point: 15
  },
  PurpleTheme: {
    title: '보라',
    text: '이 색을 보라',
    point: 12
  },
  LightPurpleTheme: {
    title: '밝은 보라',
    text: '밝은 색을 보라',
    point: 15
  },
  TealTheme: {
    title: '틸',
    text: '쇠오리가 생각나네요',
    point: 15
  },
  RainbowTheme: {
    title: '무지개',
    text: '알록달록하네요',
    point: 30
  }
} as const;