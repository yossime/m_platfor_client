"use client"

import React from "react";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";

interface IconsProps {
  onDelete: () => void;
  onToggleVisibility: () => void;
  isVisible: boolean;
}

const Icons: React.FC<IconsProps> = ({ onDelete, onToggleVisibility, isVisible }) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Icon
        onClick={onToggleVisibility}
        name={isVisible ? IconName.EYE : IconName.EYECLOSED}
      />
      <Icon onClick={onDelete} name={IconName.TRASH} />
    </div>
  );
};

export default Icons;
