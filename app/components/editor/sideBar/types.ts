
export const widgets = [
  { type: 'HeaderBoard', name: 'Edit Header' },
  { type: 'ProductBoard', name: 'Edit Product' },
  { type: 'Slider', name: 'Edit Slider' },
  { type: 'Image', name: 'Edit Image' },

] as const;

export type HeaderType = typeof widgets[number]['name'] | 'Edit Global' | 'Choose Board Widget';

export type SubMenuType = 'Global' | 'Architecture' | 'Content' | 'Style' | 'Advanced';

export const headers: Record<HeaderType, SubMenuType[]> = {
    'Edit Global': ['Global', 'Architecture'],
    'Choose Board Widget': [],
    ...Object.fromEntries(
        widgets.map(widget => [
            widget.name,
            ['Content', 'Style', 'Advanced'] as SubMenuType[]
        ])
    )
} as unknown as Record<HeaderType, SubMenuType[]>;

export const boardWidgets = widgets.map(widget => ({
  name: widget.name,
  header: widget.name as HeaderType
}));