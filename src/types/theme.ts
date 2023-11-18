import { platte } from "@/styles/platte";

interface MandalaArtThemeInType{
  sub: object[];
  title: object;
}

type MandalaArtThemeTypes = {
  [key: string]: MandalaArtThemeInType;
}

export const MandalaArtTheme: MandalaArtThemeTypes = {
  GrayTheme: {
    sub:[{
      backgroundColor: platte.gray10,
      color: platte.gray80,
      fontSize: 16,
    }],
    title: {
      backgroundColor: platte.gray80,
      color: platte.gray10,
      fontSize: 20,
      fontWeight: 500,
    }
  },
  BlackPinkTheme: {
    sub:[{
      backgroundColor: '#EF7894',
      color: platte.gray100,
      fontSize: 16,
    }],
    title: {
      backgroundColor: platte.gray100,
      color: '#EF7894',
      fontSize: 20,
      fontWeight: 500,
    }
  },
  HighContrastTheme: {
    sub:[{
      backgroundColor: platte.gray100,
      color: '#00F0FF',
      fontSize: 16,
      borderStyle: 'solid',
      borderColor: '#FF003C',
      borderWidth: 2
    }],
    title: {
      backgroundColor: '#FCEE09',
      color: platte.gray100,
      borderStyle: 'solid',
      borderColor: '#00F0FF',
      borderWidth: 2,
      fontSize: 20,
      fontWeight: 500,
    }
  },
  CarrotTheme: {
    sub:[{
      backgroundColor: '#FBE0D0',
      color: '#F2610D',
      fontSize: 16,
    }],
    title: {
      backgroundColor: '#F2610D',
      color: '#FBE0D0',
      fontSize: 20,
      fontWeight: 500,
    }
  },
  PurpleTheme: {
    sub:[{
      backgroundColor: '#E4DFED',
      color: '#553399',
      fontSize: 16,
    }],
    title: {
      backgroundColor: '#553399',
      color: '#E4DFED',
      fontSize: 20,
      fontWeight: 500,
    }
  },
  LightPurpleTheme: {
    sub:[{
      backgroundColor: '#E6E5FF',
      color: '#9A99FF',
      fontSize: 16,
    }],
    title: {
      backgroundColor: '#9A99FF',
      color: '#E6E5FF',
      fontSize: 20,
      fontWeight: 500,
    }
  },
  TealTheme: {
    sub:[{
      backgroundColor: '#DFEDEB',
      color: '#339988',
      fontSize: 16,
    }],
    title: {
      backgroundColor: '#339988',
      color: '#E4DFED',
      fontSize: 20,
      fontWeight: 500,
    }
  },
  RainbowTheme: {
    sub:[{
      backgroundColor: '#f3dada',
      color: platte.gray100,
      fontSize: 16,
    },{
      backgroundColor: '#f3e3da',
      color: platte.gray100,
      fontSize: 16,
    },{
      backgroundColor: '#f3edda',
      color: platte.gray100,
      fontSize: 16,
    },{
      backgroundColor: '#f3daed',
      color: platte.gray100,
      fontSize: 16,
    },{
      backgroundColor: '#e0f3da',
      color: platte.gray100,
      fontSize: 16,
    },{
      backgroundColor: '#eedaf3',
      color: platte.gray100,
      fontSize: 16,
    },{
      backgroundColor: '#dadbf3',
      color: platte.gray100,
      fontSize: 16,
    },{
      backgroundColor: '#daf3f3',
      color: platte.gray100,
      fontSize: 16,
    }],
    title: {
      backgroundColor: platte.gray10,
      color: platte.gray100,
      fontSize: 20,
      fontWeight: 500,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: platte.gray30
    }
  }
}

export type MandalaArtThemeKeyofType = keyof typeof MandalaArtTheme;