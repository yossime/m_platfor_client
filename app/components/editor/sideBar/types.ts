
import { IconName } from '@constants/icon';

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

export type SubMenuType = 'Global' | 'Architecture' | 'Content' | 'Style' | 'Advanced';

export const headers: Record<HeaderType, SubMenuType[]> = {
    'Edit Global': ['Global', 'Architecture'],
    'Choose Board Widget': [],
    ...Object.fromEntries(
        widgets.map(widget => [
            `Edit ${widget.name}`,
            ['Content', 'Style', 'Advanced'] as SubMenuType[]
        ])
    )
} as unknown as Record<HeaderType, SubMenuType[]>;

export const boardWidgets = widgets.map(widget => ({
  name: widget.name,
  header: widget.name as HeaderType
}));