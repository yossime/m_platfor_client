
import { IconName } from '@constants/icon';

export interface WidgetData {
  name: string;
  icon: IconName;
  type: string;
}

export const widgets = [
  { type: 'HeaderBoard', name: 'Header', icon: IconName.ALIGNTOP },
  { type: 'ProductBoard', name: 'Product', icon: IconName.BASKET },
  { type: 'SliderBoard', name: 'Slider', icon: IconName.SLIDESHOW },
  { type: 'ImageBoard', name: 'Image', icon: IconName.IMAGE },
  { type: 'VideoBoard', name: 'Video', icon: IconName.VIDEO },
  { type: 'TestimonialsBoard', name: 'Testimonials', icon: IconName.QUOTES },
  { type: 'SubScriptionBoard', name: 'SubScription', icon: IconName.TEXTBOX },
  { type: 'ServicesBoard', name: 'Services', icon: IconName.SQUARESFOUR },
  { type: 'GamificationBoard', name: 'Gamification', icon: IconName.GAMECONTROLLER },
  { type: 'FormBoard', name: 'Form', icon: IconName.TABLE },
  { type: 'CosialsBoard', name: 'Socials', icon: IconName.SMILEY },
  { type: 'ArticleBoard', name: 'Article', icon: IconName.ARTICLE }
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
      subMenus.filter(menu => ['Content', 'Style', 'Advanced'].includes(menu.name))
    ])
  )
};