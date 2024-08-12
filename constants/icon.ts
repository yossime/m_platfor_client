import { IconType } from 'react-icons';
import * as PiIcons from "react-icons/pi";

export enum IconName {
    HOME = 'HOME',
    SEARCH = 'SEARCH',
    USER = 'USER',
    SETTINGS = 'SETTINGS',
    STAR = 'STAR',
    HEART = 'HEART',
    BELL = 'BELL',
    ENVELOPE = 'ENVELOPE',
    TRASH = 'TRASH',
    PLUS = 'PLUS',
    PLUSCIRCLE = 'PLUSCIRCLE',
    MINUS = 'MINUS',
    CHECK = 'CHECK',
    X = 'X',
    EDIT = 'EDIT',
    SAVE = 'SAVE',
    DOWNLOAD = 'DOWNLOAD',
    UPLOAD = 'UPLOAD',
    SHARE = 'SHARE',
    LINK = 'LINK',
    CALENDAR = 'CALENDAR',
    CLOCK = 'CLOCK',
    PHONE = 'PHONE',
    CAMERA = 'CAMERA',
    LOCK = 'LOCK',
    UNLOCK = 'UNLOCK',
    INFO = 'INFO',
    WARNING = 'WARNING',
    QUESTION = 'QUESTION',
    MENU = 'MENU',
    REFRESH = 'REFRESH',
    CART = 'CART',
    TAG = 'TAG',
    FILTER = 'FILTER',
    SORT = 'SORT',
    PRINT = 'PRINT',
    GRID = 'GRID',
    LIST = 'LIST',
    CHAT = 'CHAT',
    DOCUMENT = 'DOCUMENT',
    FOLDER = 'FOLDER',
    GRAPH = 'GRAPH',
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    STOP = 'STOP',
    VOLUME = 'VOLUME',
    MUTE = 'MUTE',
    BLUETOOTH = 'BLUETOOTH',
    POWER = 'POWER',
    CLOUD = 'CLOUD',
    DATABASE = 'DATABASE',
    CODE = 'CODE',
    GLOBE = 'GLOBE',
    ARROWLEFT = 'ARROWLEFT',
    ALIGNTOP = 'ALIGNTOP',
    TABLE = 'TABLE',
    IMAGE = 'IMAGE',
    QUOTES = 'QUOTES',
    VIDEO = 'VIDEO',
    ARTICLE = 'ARTICLE',
    STOREFRONT = 'STOREFRONT',
    SQUARESFOUR = 'SQUARESFOUR',
    SLIDESHOW = 'SLIDESHOW',
    SMILEY = 'SMILEY',
    GAMECONTROLLER = 'GAMECONTROLLER',
    USERSTHREE = 'USERSTHREE',
    BANK = 'BANK',
    BOOKOPENTEXT = 'BOOKOPENTEXT',
    COOKIE = 'COOKIE',
    CHEERS = 'CHEERS',
    CARETLEFT = 'CARETLEFT',
    TEXTBOX = 'TEXTBOX',
    BASKET = 'BASKET',
    BUILDING = 'BUILDING',
    BRAIN = 'BRAIN',
    PENNIB = 'PENNIB',
    PRINTROLLRE = 'PRINTROLLRE',
    CARETRIGHT = 'CARETRIGHT',
    CARETDOWN = 'CARETDOWN',
    ARROWLINEDOWN = 'ARROWLINEDOWN',
    ARROWSINLINEVERTICAL = 'ARROWSINLINEVERTICAL',
    ARROWLINEUP = 'ARROWLINEUP',
    ARROWLINERIGHT = 'ARROWLINERIGHT',
    ARROWSINLINEHORIZONTAL = 'ARROWSINLINEHORIZONTAL',
    ARROWLINELEFT = 'ARROWLINELEFT',
    SPINNERGAP = 'SPINNERGAP',
}

export const IconComponents: { [key in IconName]: IconType } = {
    [IconName.SPINNERGAP]: PiIcons.PiSpinnerGap,
    [IconName.ARROWLINEDOWN]: PiIcons.PiArrowLineDown,
    [IconName.ARROWSINLINEVERTICAL]: PiIcons.PiArrowsInLineVertical,
    [IconName.ARROWLINEUP]: PiIcons.PiArrowLineUp,
    [IconName.ARROWLINERIGHT]: PiIcons.PiArrowLineRight,
    [IconName.ARROWSINLINEHORIZONTAL]: PiIcons.PiArrowsInLineHorizontal,
    [IconName.ARROWLINELEFT]: PiIcons.PiArrowLineLeft,
    [IconName.CARETDOWN]: PiIcons.PiCaretDown,
    [IconName.CARETRIGHT]: PiIcons.PiCaretRight,
    [IconName.BUILDING]: PiIcons.PiBuilding,
    [IconName.BRAIN]: PiIcons.PiBrain,
    [IconName.PENNIB]: PiIcons.PiPenNib,
    [IconName.PRINTROLLRE]: PiIcons.PiPaintRoller,
    [IconName.TABLE]: PiIcons.PiTable,
    [IconName.CARETLEFT]: PiIcons.PiCaretLeft,
    [IconName.BASKET]: PiIcons.PiBasket,
    [IconName.TEXTBOX]: PiIcons.PiTextbox,
    [IconName.ALIGNTOP]: PiIcons.PiAlignTop,
    [IconName.IMAGE]: PiIcons.PiImage,
    [IconName.QUOTES]: PiIcons.PiQuotes,
    [IconName.VIDEO]: PiIcons.PiVideo,
    [IconName.ARTICLE]: PiIcons.PiArticle,
    [IconName.STOREFRONT]: PiIcons.PiStorefront,
    [IconName.SQUARESFOUR]: PiIcons.PiSquaresFour,
    [IconName.SLIDESHOW]: PiIcons.PiSlideshow,
    [IconName.SMILEY]: PiIcons.PiSmiley,
    [IconName.GAMECONTROLLER]: PiIcons.PiGameController,
    [IconName.USERSTHREE]: PiIcons.PiUsersThree,
    [IconName.BANK]: PiIcons.PiBank,
    [IconName.BOOKOPENTEXT]: PiIcons.PiBookOpenText,
    [IconName.COOKIE]: PiIcons.PiCookie,
    [IconName.CHEERS]: PiIcons.PiCheers,
    [IconName.HOME]: PiIcons.PiHouse,
    [IconName.SEARCH]: PiIcons.PiMagnifyingGlass,
    [IconName.USER]: PiIcons.PiUser,
    [IconName.SETTINGS]: PiIcons.PiGear,
    [IconName.STAR]: PiIcons.PiStar,
    [IconName.HEART]: PiIcons.PiHeart,
    [IconName.BELL]: PiIcons.PiBellRinging,
    [IconName.ENVELOPE]: PiIcons.PiEnvelope,
    [IconName.TRASH]: PiIcons.PiTrash,
    [IconName.PLUS]: PiIcons.PiPlus,
    [IconName.PLUSCIRCLE]: PiIcons.PiPlusCircle,
    [IconName.MINUS]: PiIcons.PiMinus,
    [IconName.CHECK]: PiIcons.PiCheck,
    [IconName.X]: PiIcons.PiX,
    [IconName.ARROWLEFT]: PiIcons.PiArrowLeft,
    [IconName.EDIT]: PiIcons.PiPencilSimple,
    [IconName.SAVE]: PiIcons.PiFloppyDisk,
    [IconName.DOWNLOAD]: PiIcons.PiDownload,
    [IconName.UPLOAD]: PiIcons.PiUpload,
    [IconName.SHARE]: PiIcons.PiShare,
    [IconName.LINK]: PiIcons.PiLink,
    [IconName.CALENDAR]: PiIcons.PiCalendar,
    [IconName.CLOCK]: PiIcons.PiClock,
    [IconName.PHONE]: PiIcons.PiPhone,
    [IconName.CAMERA]: PiIcons.PiCamera,
    [IconName.LOCK]: PiIcons.PiLockSimple,
    [IconName.UNLOCK]: PiIcons.PiLockSimpleOpen,
    [IconName.INFO]: PiIcons.PiInfo,
    [IconName.WARNING]: PiIcons.PiWarning,
    [IconName.QUESTION]: PiIcons.PiQuestion,
    [IconName.MENU]: PiIcons.PiList,
    [IconName.REFRESH]: PiIcons.PiArrowClockwise,
    [IconName.CART]: PiIcons.PiShoppingCart,
    [IconName.TAG]: PiIcons.PiTag,
    [IconName.FILTER]: PiIcons.PiSliders,
    [IconName.SORT]: PiIcons.PiSortAscending,
    [IconName.PRINT]: PiIcons.PiPrinter,
    [IconName.GRID]: PiIcons.PiGridFour,
    [IconName.LIST]: PiIcons.PiListBullets,
    [IconName.CHAT]: PiIcons.PiChatCircle,
    [IconName.DOCUMENT]: PiIcons.PiFile,
    [IconName.FOLDER]: PiIcons.PiFolder,
    [IconName.GRAPH]: PiIcons.PiChartLine,
    [IconName.PLAY]: PiIcons.PiPlay,
    [IconName.PAUSE]: PiIcons.PiPause,
    [IconName.STOP]: PiIcons.PiStop,
    [IconName.VOLUME]: PiIcons.PiSpeakerHigh,
    [IconName.MUTE]: PiIcons.PiSpeakerX,
    [IconName.BLUETOOTH]: PiIcons.PiBluetooth,
    [IconName.POWER]: PiIcons.PiPower,
    [IconName.CLOUD]: PiIcons.PiCloud,
    [IconName.DATABASE]: PiIcons.PiDatabase,
    [IconName.CODE]: PiIcons.PiCode,
    [IconName.GLOBE]: PiIcons.PiGlobe,
};

export enum IconSize {
    SMALL = '16px',
    MEDIUM = '24px',
    LARGE = '32px',
    XLARGE = '48px'
}



