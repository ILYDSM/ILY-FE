import { BlackPinkTheme, GrayTheme, HighContrastTheme, RainbowTheme, CarrotTheme, LightPurpleTheme, PurpleTheme, TealTheme } from "@/components/common/MandalArt/theme";

export default function ThemeSelector(value:string){
  switch(value){
    case 'Gray':
      return GrayTheme;
    case 'BlackPink':
      return BlackPinkTheme;
    case 'HighContrast':
      return HighContrastTheme;
    case 'Rainbow':
      return RainbowTheme;
    case 'Carrot':
      return CarrotTheme;
    case 'Purple':
      return PurpleTheme;
    case 'LightPurple':
      return LightPurpleTheme;
    case 'Teal':
      return TealTheme;
    default:
      return GrayTheme
  }
}