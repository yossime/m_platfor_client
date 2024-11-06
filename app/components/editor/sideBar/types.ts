
import { IconName } from '@constants/icon';
import { BaseSize, ButtonStyle, FormatBoard, ImageStyle, TextStyle } from '../types';
import { BoardType } from "../types";
import  FormSideDisplay  from './formatsBoardsSvg/FormSideDisplay.svg';
import  HeaderFrame  from './formatsBoardsSvg/HeaderFrameDisplay.svg';
import  HeaderSimple  from './formatsBoardsSvg/HeaderSimpleDisplay.svg';
import  ProductDuo  from './formatsBoardsSvg/ProductDuoDisplay.svg';
import  ProductPodiums  from './formatsBoardsSvg/ProductPodiumsDisplay.svg';



export const formatIcons: Record<FormatBoard, React.FC> = {
  [FormatBoard.Frame]: HeaderFrame,
  [FormatBoard.Duo]: ProductDuo,
  [FormatBoard.Podium]: ProductPodiums,
  [FormatBoard.Side]: FormSideDisplay,
  [FormatBoard.Simple]: HeaderSimple,
  [FormatBoard.Model]: HeaderFrame,


};

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
export type HeaderType =  typeof widgets[number]['name'] |  'World' | 'Choose Board Widget';


export interface SubMenuData {
  name: SubMenuType;
  icon: IconName;
  body: string;
}

export type SubMenuType =  'Edit' | 'Design'| 'Library' | 'Products' |'Local';

export const subMenus: SubMenuData[] = [
  { name: 'Edit', icon: IconName.EDIT, body: "Edit content" },
  { name: 'Design', icon: IconName.ARTICLE, body: "Make design changes" },
  { name: 'Local', icon: IconName.ARTICLE, body: "Make design changes" },
  { name: 'Library', icon: IconName.ARTICLE, body: "Make design changes" },
  { name: 'Products', icon: IconName.ARTICLE, body: "Make design changes" }

];

export const headers: Record<HeaderType, SubMenuData[]> = {
  'World': subMenus.filter(menu => [ 'Edit','Design'].includes(menu.name)),
  'Add 3D model': subMenus.filter(menu => [ 'Library','Products','Local'].includes(menu.name)),
  ...Object.fromEntries(
    widgets.map(widget => [
      widget.name,
      subMenus.filter(menu => ['Edit', 'Design'].includes(menu.name))
    ])
  ),
};



export const formats: Record<BoardType, FormatBoard[]> = {
  [BoardType.Video]: [FormatBoard.Simple, FormatBoard.Frame],
  [BoardType.Header]: [FormatBoard.Simple, FormatBoard.Frame,FormatBoard.Model],
  [BoardType.Image]:  [FormatBoard.Simple, FormatBoard.Frame],
  [BoardType.Product]: [FormatBoard.Podium, FormatBoard.Duo],
  [BoardType.Form]: [FormatBoard.Simple],
  [BoardType.Subscription]: [FormatBoard.Simple],
  [BoardType.Slider]: [FormatBoard.Simple, FormatBoard.Frame],
  [BoardType.Testimonials]: [FormatBoard.Simple],
  [BoardType.Services]: [FormatBoard.Simple, FormatBoard.Side],
  [BoardType.Gamification]: [FormatBoard.Simple],
  [BoardType.Socials]: [FormatBoard.Simple],
  [BoardType.Article]: [FormatBoard.Simple],
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

];