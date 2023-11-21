declare interface MandalaArtThemeType {
  sub: ThemeInType[];
  title: ThemeInType;
  description: DescriptionType;
}

interface ThemeInType  {
  backgroundColor: string;
  color: string;
  fontSize?: number;
  fontFamily?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
  borderStyle?: "solid" | "dotted" | "dashed" | undefined;
  borderWidth?: number;
  borderColor?: string;
}

interface DescriptionType {
  name: string;
  title: string;
  text: string;
  point: number;
}