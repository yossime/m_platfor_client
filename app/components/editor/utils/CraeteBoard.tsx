import { Board } from "../viewport/models/boards/Board";
import { ProductDouBoard } from "../viewport/models/boards/productBoards/ProductDouBoard";
import { BoardType } from "../types";
import { MasterBoard } from "../viewport/models/boards/MasterBoard";

export const createBoardByType = (type: string, name:string): Board => {

    switch (type) {
      case 'HeaderBoard':
        return new ProductDouBoard(BoardType.Header, { name: name });

      case 'ImageBoard':
     return new ProductDouBoard(BoardType.Image, { name: name });

      case 'ProductBoard':
        return new ProductDouBoard(BoardType.Product, { name: name });

      default:
        
        return   new MasterBoard(BoardType.Header, {name: name});
        ;
    }
  };
  

