import { Board } from "../viewport/models/boards/Board";
import { ProductDouBoard } from "../viewport/models/boards/productBoards/ProductDouBoard";
import { BoardType } from "../types";
import { MasterBoard } from "../viewport/models/boards/MasterBoard";
import { HeaderBoard } from "../viewport/models/boards/Header.bord";
import { ImageBoard } from "../viewport/models/boards/Image.bord";
import { VideoBoard } from "../viewport/models/boards/Video.bord";

export const createBoardByType = (type: string, name: string): Board => {
  switch (type) {
    case "HeaderBoard":
      return new HeaderBoard(BoardType.Header, { name: name });

    case "ImageBoard":
      return new ImageBoard(BoardType.Image, { name: name });

    case "ProductBoard":
      return new ProductDouBoard(BoardType.Product, { name: name });

    case "VideoBoard":
      return new VideoBoard(BoardType.Product, { name: name });
    default:
      return new MasterBoard(BoardType.Header, { name: name });
  }
};
