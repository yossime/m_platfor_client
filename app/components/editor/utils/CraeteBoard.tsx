import { Board } from "../viewport/models/boards/Board";
import { ProductMaster } from "../viewport/models/boards/productBoards/ProductMaster.board";
import { BoardType, ISceneObjectOptions } from "../types";
import { HeaderBoard } from "../viewport/models/boards/Header.bord";
import { ImageBoard } from "../viewport/models/boards/Image.bord";
import { VideoBoard } from "../viewport/models/boards/Video.bord";

export const createBoardByType = (type: BoardType, options?: ISceneObjectOptions): Board => {
  switch (type) {
    case BoardType.Header:
      return new HeaderBoard(BoardType.Header, options);

    case BoardType.Image:
      return new ImageBoard(BoardType.Image, options);

    case BoardType.Video:
      return new VideoBoard(BoardType.Video, options);

    case BoardType.Product:
      return new ProductMaster(BoardType.Product, options);

    default:
      return new HeaderBoard(BoardType.Header, options);

  }
};
