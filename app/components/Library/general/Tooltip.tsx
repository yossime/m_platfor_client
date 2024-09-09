import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number | [number, number];
  children: React.ReactElement;
}

const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(
  ({ content, placement = 'top', delay = 0, children }, ref) => (
    <Tippy content={content} placement={placement} delay={delay}>
      {React.cloneElement(children, { ref })}
    </Tippy>
  )
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;