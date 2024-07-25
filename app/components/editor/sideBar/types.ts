
export const widgets = [
  { name: 'Header', editName: 'Edit Header' },
  { name: 'Product', editName: 'Edit Product' },
  { name: 'Slider', editName: 'Edit Slider' },
  { name: 'Image', editName: 'Edit Image' },

] as const;

export type HeaderType = typeof widgets[number]['editName'] | 'Edit Global' | 'Choose Board Widget';

export type SubMenuType = 'Global' | 'Architecture' | 'Content' | 'Style' | 'Advanced';

export const headers: Record<HeaderType, SubMenuType[]> = {
    'Edit Global': ['Global', 'Architecture'],
    'Choose Board Widget': [],
    ...Object.fromEntries(
        widgets.map(widget => [
            widget.editName,
            ['Content', 'Style', 'Advanced'] as SubMenuType[]
        ])
    )
} as unknown as Record<HeaderType, SubMenuType[]>;

export const boardWidgets = widgets.map(widget => ({
  name: widget.name,
  header: widget.editName as HeaderType
}));