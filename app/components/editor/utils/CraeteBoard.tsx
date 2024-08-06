
import { DisplayType, IBoard, IButton, IDisplay, IHeaderBoard, IImageBoard, ImageStyle, IProduct, IProductBoard, IText, IThreeDModelStyle } from '@components/editor/interface/paramsType';
import { BaseSize, ButtonStyle } from '../interface/paramsType';

export const createBoardByType = (type: string, name:string): IBoard => {

    const baseStyle : IThreeDModelStyle ={
      textStyle: { scale: BaseSize.MEDIUM },
      buttonStyle: ButtonStyle.DARK,
      imageStyle: ImageStyle.CROP
    }

    const baseBoard: IBoard = {
      type: type,
      style: baseStyle,
      name: name ,
    };
  
    const defaultText: IText = {
      text: '',
    };
  
    const product: IProduct = {
      type: "Podium",
      title: { ...defaultText, text: 'Product Title' },
      description: { ...defaultText, text: 'Product Description' },
      SKU: { ...defaultText, text: 'Product SKU' },
    };
  
    const display: IDisplay = {
      type: "ProductBoard",
      title: { ...defaultText, text: 'Display Title' },
      products: [product],
    };
  
    const button: IButton ={
      text: { text: "button" },
      material: { color: "blue" },
      type: 'dddd'
  }
    switch (type) {
      case 'HeaderBoard':
        return {
          ...baseBoard,
          title: { text: 'New Header' },
          subTitle: { text: 'Subtitle' },
          buttonTitle: { text: 'Button' },
          button: button,
        } as IHeaderBoard;
      case 'ImageBoard':
        return {
          ...baseBoard,
          title: { text: 'Image Title' },
          subTitle: { text: 'Image Subtitle' },
          buttonTitle: { text: 'Button' },
        } as IImageBoard;
      case 'ProductBoard':
        return {
          ...baseBoard,
          title: { text: 'ProductBoard Title' },
          displayType: DisplayType.STANDS,
          displays: [display],
          maxDisplay: 6,
        } as IProductBoard;
      default:
        return baseBoard;
    }
  };
  