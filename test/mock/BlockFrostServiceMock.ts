import { IBlockFrostService } from "../../src/service/BlockFrostService";
import { NOT_CORRECTLY_MOCKED_ERROR } from "./_constant";

const BlockFrostServiceMock: IBlockFrostService = {
  blocksLatest: function (): Promise<{ height: number; hash: string }> {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
};

BlockFrostServiceMock.blocksLatest = jest.fn();

export { BlockFrostServiceMock };
