import { IconType } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import colors from './colors.json';

export enum IconSize {
    SMALL = '16px',
    MEDIUM = '24px',
    LARGE = '32px',
    XLARGE = '48px'
}

export const IconColor = colors.icon_colors;

export const IconName: { [key: string]: IconType } = {
    HOME: FaIcons.FaHome,
    SEARCH: FaIcons.FaSearch,
    USER: FaIcons.FaUser,
    SETTINGS: FaIcons.FaCog,
    STAR: FaIcons.FaStar,
    HEART: FaIcons.FaHeart,
    BELL: FaIcons.FaBell,
    ENVELOPE: FaIcons.FaEnvelope,
};

