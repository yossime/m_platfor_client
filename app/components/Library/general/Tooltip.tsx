import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface TooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number | [number, number];
  children: React.ReactElement;
  arrow?: boolean;
}

const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(
  (
    { content, placement = "bottom", delay = 800, children, arrow = true },
    ref
  ) => (
    <Tippy
      content={<div style={{ textAlign: "center"}}>{content}</div>}
      placement={placement}
      delay={delay}
      maxWidth={200}
    >
      {React.cloneElement(children, { ref })}
    </Tippy>
  )
);

Tooltip.displayName = "Tooltip";

export default Tooltip;


