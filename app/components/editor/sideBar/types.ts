
import { IconName } from '@constants/icon';
import { BaseSize, ButtonStyle, ImageStyle, TextStyle } from '../interface/paramsType';
import { BoardType } from '../interface/types';
// import { BoardType } from '../interface/models';

export interface WidgetData {
  name: string;
  icon: IconName;
  type: BoardType;
}

export const widgets = [
  { type: BoardType.Header, name: 'Header', icon: IconName.ALIGNTOP },
  { type: BoardType.Product, name: 'Product', icon: IconName.BASKET },
  { type: BoardType.Slider, name: 'Slider', icon: IconName.SLIDESHOW },
  { type: BoardType.Image, name: 'Image', icon: IconName.IMAGE },
  { type: BoardType.Video, name: 'Video', icon: IconName.VIDEO },
  { type: BoardType.Testimonials, name: 'Testimonials', icon: IconName.QUOTES },
  { type: BoardType.Subscription, name: 'Subscription', icon: IconName.TEXTBOX },
  { type: BoardType.Services, name: 'Services', icon: IconName.SQUARESFOUR },
  { type: BoardType.Gamification, name: 'Gamification', icon: IconName.GAMECONTROLLER },
  { type: BoardType.Form, name: 'Form', icon: IconName.TABLE },
  { type: BoardType.Socials, name: 'Socials', icon: IconName.SMILEY },
  { type: BoardType.Article, name: 'Article', icon: IconName.ARTICLE }
];
export type HeaderType = `Edit ${typeof widgets[number]['name']}` | 'Edit Global' | 'Choose Board Widget';


export interface SubMenuData {
  name: SubMenuType;
  icon: IconName;
}

export type SubMenuType = 'Architecture' | 'Global' | 'Content' | 'Style' | 'Advanced';

export const subMenus: SubMenuData[] = [
  { name: 'Architecture', icon: IconName.BUILDING },
  { name: 'Global', icon: IconName.GLOBE },
  { name: 'Content', icon: IconName.PENNIB },
  { name: 'Style', icon: IconName.PRINTROLLRE },
  { name: 'Advanced', icon: IconName.BRAIN }
];

export const headers: Record<HeaderType, SubMenuData[]> = {
  'Edit Global': subMenus.filter(menu => [ 'Architecture','Global'].includes(menu.name)),
  'Choose Board Widget': [],
  ...Object.fromEntries(
    widgets.map(widget => [
      `Edit ${widget.name}`,
      subMenus.filter(menu => ['Content', 'Style'].includes(menu.name))
    ])
  ),
};


export const textSizeOptions = [
  { value: BaseSize.SMALL, label: "Small" },
  { value: BaseSize.MEDIUM, label: "Medium" },
  { value: BaseSize.LARGE, label: "Large" },
];

export const textStyleOptions = [
  { value: TextStyle.DARK, label: "Dark" },
  { value: TextStyle.BLUE, label: "Blue" },
  { value: TextStyle.BRIGHT, label: "Bright" },
];

export const buttonStyleOptions = [
  { value: ButtonStyle.BLUE, label: "Blue" },
  { value: ButtonStyle.BRIGHT, label: "Bright" },
  { value: ButtonStyle.DARK, label: "Dark" },
];

export const imageStyleOptions = [
  { value: ImageStyle.CROP, label: "Crop" },
  { value: ImageStyle.FILL, label: "Fill" },
];

export const BackgroundOptions = [
  { value: "Wood", label: "Wood" },
  { value: "Gold", label: "Gold" },
  { value: "Create new", label: "Create new" },
  { value: "Add from library", label: "Add from library" },
];