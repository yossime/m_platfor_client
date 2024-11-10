import { IconType } from 'react-icons';
import * as PiIcons from "react-icons/pi";

export enum IconName {
    GLOBESIMPAL ='GLOBESIMPAL',
    CREDITCARD = 'CREDITCARD',
    EMPTY ='EMPTY',
    CLOUDARROWUP ='CLOUDARROWUP',
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
    BRIEFCASE ='BRIEFCASE',
    HANDSHAKE = 'HANDSHAKE',
    FINNTHEHUMAN = 'FINNTHEHUMAN',
    PENNIBSTRAIGHT = 'PENNIBSTRAIGHT',
    DEVICES = 'DEVICES',
    CHARTLINEUP ='CHARTLINEUP',
    DETECTIVE = 'DETECTIVE',
    SKECHLOGO = 'SKECHLOGO',
    PLAYCIRCLE = 'PLAYCIRCLE',
    EXPORT = 'EXPORT',
    SHIELDCHECK = 'SHIELDCHECK',
    ARROWSIN = 'ARROWSIN',
    EYE = 'EYE',
    EYECLOSED = 'EYECLOSED',
    SPEEDOMETER = 'SPEEDOMETER',
    PIGGYBUNK = 'PIGGYBUNK',
    BROWSER ='BROWSER',
    CUBE = 'CUBE'
}

export const IconComponents: { [key in IconName]: IconType } = {
    [IconName.CUBE]: PiIcons.PiCubeThin,

    [IconName.GLOBESIMPAL]: PiIcons.PiGlobeSimple,
    [IconName.BROWSER]: PiIcons.PiBrowserThin,
    [IconName.PIGGYBUNK]: PiIcons.PiPiggyBankThin,
    [IconName.EYE]: PiIcons.PiEyeThin,
    [IconName.CREDITCARD]: PiIcons.PiCreditCardThin,
    [IconName.EMPTY]: PiIcons.PiEmptyThin,
    [IconName.SPEEDOMETER]: PiIcons.PiSpeedometerThin,
    [IconName.EYECLOSED]: PiIcons.PiEyeClosedThin,
    [IconName.ARROWSIN]: PiIcons.PiArrowsInThin,
    [IconName.CLOUDARROWUP]: PiIcons.PiCloudArrowUpThin,
    [IconName.EXPORT]: PiIcons.PiExportThin,
    [IconName.SHIELDCHECK]: PiIcons.PiShieldCheckThin,
    [IconName.PLAYCIRCLE]: PiIcons.PiPlayCircleThin,
    [IconName.SKECHLOGO]: PiIcons.PiSketchLogoThin,
    [IconName.BRIEFCASE]: PiIcons.PiBriefcaseThin,
    [IconName.HANDSHAKE]: PiIcons.PiHandshakeThin,
    [IconName.FINNTHEHUMAN]: PiIcons.PiFinnTheHumanThin,
    [IconName.PENNIBSTRAIGHT]: PiIcons.PiPenNibStraightThin,
    [IconName.DEVICES]: PiIcons.PiDevicesThin,
    [IconName.CHARTLINEUP]: PiIcons.PiChartLineUpThin,
    [IconName.DETECTIVE]: PiIcons.PiDetectiveThin,
    [IconName.SPINNERGAP]: PiIcons.PiSpinnerGapThin,
    [IconName.ARROWLINEDOWN]: PiIcons.PiArrowLineDownThin,
    [IconName.ARROWSINLINEVERTICAL]: PiIcons.PiArrowsInLineVerticalThin,
    [IconName.ARROWLINEUP]: PiIcons.PiArrowLineUpThin,
    [IconName.ARROWLINERIGHT]: PiIcons.PiArrowLineRightThin,
    [IconName.ARROWSINLINEHORIZONTAL]: PiIcons.PiArrowsInLineHorizontalThin,
    [IconName.ARROWLINELEFT]: PiIcons.PiArrowLineLeftThin,
    [IconName.CARETDOWN]: PiIcons.PiCaretDownThin,
    [IconName.CARETRIGHT]: PiIcons.PiCaretRightThin,
    [IconName.BUILDING]: PiIcons.PiBuildingThin,
    [IconName.BRAIN]: PiIcons.PiBrainThin,
    [IconName.PENNIB]: PiIcons.PiPenNibThin,
    [IconName.PRINTROLLRE]: PiIcons.PiPaintRollerThin,
    [IconName.TABLE]: PiIcons.PiTableThin,
    [IconName.CARETLEFT]: PiIcons.PiCaretLeftThin,
    [IconName.BASKET]: PiIcons.PiBasketThin,
    [IconName.TEXTBOX]: PiIcons.PiTextboxThin,
    [IconName.ALIGNTOP]: PiIcons.PiAlignTopThin,
    [IconName.IMAGE]: PiIcons.PiImageThin,
    [IconName.QUOTES]: PiIcons.PiQuotesThin,
    [IconName.VIDEO]: PiIcons.PiVideoThin,
    [IconName.ARTICLE]: PiIcons.PiArticleThin,
    [IconName.STOREFRONT]: PiIcons.PiStorefrontThin,
    [IconName.SQUARESFOUR]: PiIcons.PiSquaresFourThin,
    [IconName.SLIDESHOW]: PiIcons.PiSlideshowThin,
    [IconName.SMILEY]: PiIcons.PiSmileyThin,
    [IconName.GAMECONTROLLER]: PiIcons.PiGameControllerThin,
    [IconName.USERSTHREE]: PiIcons.PiUsersThreeThin,
    [IconName.BANK]: PiIcons.PiBankThin,
    [IconName.BOOKOPENTEXT]: PiIcons.PiBookOpenTextThin,
    [IconName.COOKIE]: PiIcons.PiCookieThin,
    [IconName.CHEERS]: PiIcons.PiCheersThin,
    [IconName.HOME]: PiIcons.PiHouseThin,
    [IconName.SEARCH]: PiIcons.PiMagnifyingGlassThin,
    [IconName.USER]: PiIcons.PiUserThin,
    [IconName.SETTINGS]: PiIcons.PiGearThin,
    [IconName.STAR]: PiIcons.PiStarThin,
    [IconName.HEART]: PiIcons.PiHeartThin,
    [IconName.BELL]: PiIcons.PiBellRingingThin,
    [IconName.ENVELOPE]: PiIcons.PiEnvelopeThin,
    [IconName.TRASH]: PiIcons.PiTrashThin,
    [IconName.PLUS]: PiIcons.PiPlusThin,
    [IconName.PLUSCIRCLE]: PiIcons.PiPlusCircleThin,
    [IconName.MINUS]: PiIcons.PiMinusThin,
    [IconName.CHECK]: PiIcons.PiCheckThin,
    [IconName.X]: PiIcons.PiXThin,
    [IconName.ARROWLEFT]: PiIcons.PiArrowLeftThin,
    [IconName.EDIT]: PiIcons.PiPencilSimpleThin,
    [IconName.SAVE]: PiIcons.PiFloppyDiskThin,
    [IconName.DOWNLOAD]: PiIcons.PiDownloadThin,
    [IconName.UPLOAD]: PiIcons.PiUploadThin,
    [IconName.SHARE]: PiIcons.PiShareThin,
    [IconName.LINK]: PiIcons.PiLinkThin,
    [IconName.CALENDAR]: PiIcons.PiCalendarThin,
    [IconName.CLOCK]: PiIcons.PiClockThin,
    [IconName.PHONE]: PiIcons.PiPhoneThin,
    [IconName.CAMERA]: PiIcons.PiCameraThin,
    [IconName.LOCK]: PiIcons.PiLockSimpleThin,
    [IconName.UNLOCK]: PiIcons.PiLockSimpleOpenThin,
    [IconName.INFO]: PiIcons.PiInfoThin,
    [IconName.WARNING]: PiIcons.PiWarningThin,
    [IconName.QUESTION]: PiIcons.PiQuestionThin,
    [IconName.MENU]: PiIcons.PiListThin,
    [IconName.REFRESH]: PiIcons.PiArrowClockwiseThin,
    [IconName.CART]: PiIcons.PiShoppingCartThin,
    [IconName.TAG]: PiIcons.PiTagThin,
    [IconName.FILTER]: PiIcons.PiSlidersThin,
    [IconName.SORT]: PiIcons.PiSortAscendingThin,
    [IconName.PRINT]: PiIcons.PiPrinterThin,
    [IconName.GRID]: PiIcons.PiGridFourThin,
    [IconName.LIST]: PiIcons.PiListBulletsThin,
    [IconName.CHAT]: PiIcons.PiChatCircleThin,
    [IconName.DOCUMENT]: PiIcons.PiFileThin,
    [IconName.FOLDER]: PiIcons.PiFolderThin,
    [IconName.GRAPH]: PiIcons.PiChartLineThin,
    [IconName.PLAY]: PiIcons.PiPlayThin,
    [IconName.PAUSE]: PiIcons.PiPauseThin,
    [IconName.STOP]: PiIcons.PiStopThin,
    [IconName.VOLUME]: PiIcons.PiSpeakerHighThin,
    [IconName.MUTE]: PiIcons.PiSpeakerXThin,
    [IconName.BLUETOOTH]: PiIcons.PiBluetoothThin,
    [IconName.POWER]: PiIcons.PiPowerThin,
    [IconName.CLOUD]: PiIcons.PiCloudThin,
    [IconName.DATABASE]: PiIcons.PiDatabaseThin,
    [IconName.CODE]: PiIcons.PiCodeThin,
    [IconName.GLOBE]: PiIcons.PiGlobeThin,
};

export enum IconSize {
    SMALL = '16px',
    MEDIUM = '24px',
    LARGE = '32px',
    XLARGE = '48px',
    XXLARGE = '64px'
}



