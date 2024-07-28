
import { DisplayType, IBoard, IDisplay, IHeaderBoard, IImageBoard, ImageStyle, IProduct, IProductBoard, IText, IThreeDModelStyle } from '@components/editor/interface/paramsType';
import { BaseSize, ButtonStyle } from '../interface/paramsType';

export const createBoardByType = (type: string): IBoard => {

    const baseStyle : IThreeDModelStyle ={
      textStyle: { scale: BaseSize.MEDIUM },
      buttonStyle: ButtonStyle.DEFAULT,
      imageStyle: ImageStyle.CROP
    }

    const baseBoard: IBoard = {
      type: type,
      style: baseStyle,
    };
  
    const defaultText: IText = {
      text: '',
    };
  
    const product: IProduct = {
      type: "product",
      title: { ...defaultText, text: 'Product Title' },
      description: { ...defaultText, text: 'Product Description' },
      SKU: { ...defaultText, text: 'Product SKU' },
      price: { text: '100' },
      buttons: {
        addToCart: 'Add to Cart',
        quickView: 'Quick View',
        buyNow: 'Buy Now',
      },
    };
  
    const display: IDisplay = {
      type: "display",
      title: { ...defaultText, text: 'Display Title' },
      products: [product],
    };
  
  
    switch (type) {
      case 'HeaderBoard':
        return {
          ...baseBoard,
          title: { text: 'New Header' },
          subTitle: { text: 'Subtitle' },
          buttonTitle: { text: 'Button' },
        } as IHeaderBoard;
      case 'Image':
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
  