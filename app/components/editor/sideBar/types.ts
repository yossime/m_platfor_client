
import { IconName } from '@constants/icon';
import { BaseSize, ButtonStyle, ImageStyle, TextStyle } from '../types';
import { BoardType } from "../types";

export interface WidgetData {
  name: string;
  icon: IconName;
  type: BoardType;
  body?: string;
}

export const widgets = [
  { type: BoardType.Header, name: 'Header', icon: IconName.ALIGNTOP , body: "Clickable social media icons"},
  { type: BoardType.Product, name: 'Product', icon: IconName.BASKET,  body: "Create and display your products"},
  { type: BoardType.Slider, name: 'Slider', icon: IconName.SLIDESHOW ,body: "Display content with a slider"},
  { type: BoardType.Image, name: 'Image', icon: IconName.IMAGE, body: "Display an \n image" },
  { type: BoardType.Video, name: 'Video', icon: IconName.VIDEO , body: "show a video including 360°"},
  { type: BoardType.Testimonials, name: 'Testimonials', icon: IconName.QUOTES ,body: "quote your customers"},
  { type: BoardType.Subscription, name: 'Subscription', icon: IconName.TEXTBOX , body: "Present a single field to fill and promote easy subscription"},
  { type: BoardType.Services, name: 'Services', icon: IconName.SQUARESFOUR,body: "Showcase your best features" },
  { type: BoardType.Gamification, name: 'Gamification', icon: IconName.GAMECONTROLLER, body: "Add a captivating  interaction" },
  { type: BoardType.Form, name: 'Form', icon: IconName.TABLE,  body: "Clickable social media icons"},
  { type: BoardType.Socials, name: 'Socials', icon: IconName.SMILEY , body: "Make it easy to contact with you"},
  { type: BoardType.Article, name: 'Article', icon: IconName.ARTICLE ,body: "Add textual content" }
];
export type HeaderType = `Edit ${typeof widgets[number]['name']}` |  'World' | 'Choose Board Widget';


export interface SubMenuData {
  name: SubMenuType;
  icon: IconName;
  body: string;
}

export type SubMenuType =  'Edit' | 'Design';

export const subMenus: SubMenuData[] = [
  { name: 'Edit', icon: IconName.EDIT, body: "Edit content" },
  { name: 'Design', icon: IconName.ARTICLE, body: "Make design changes" }
];

export const headers: Record<HeaderType, SubMenuData[]> = {
  'World': subMenus.filter(menu => [ 'Edit','Design'].includes(menu.name)),
  'Choose Board Widget': [],
  ...Object.fromEntries(
    widgets.map(widget => [
      `Edit ${widget.name}`,
      subMenus.filter(menu => ['Edit', 'Design'].includes(menu.name))
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