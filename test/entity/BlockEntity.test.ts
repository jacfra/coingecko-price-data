import { BlockEntity } from "../../src/entity/BlockEntity";

jest.mock("../../src/entity/BlockEntity");

const BlockEntityMock = <jest.Mock<BlockEntity>>BlockEntity;

describe("BlockEntity", () => {
  const blockEntityMock = new BlockEntityMock();

  test("BlockEntity.id", () => {
    blockEntityMock.id = "1";
    expect(blockEntityMock.id).toBe("1");
  });

  test("BlockEntity.hash", () => {
    blockEntityMock.hash = "hash";
    expect(blockEntityMock.hash).toBe("hash");
  });

  test("BlockEntity.height", () => {
    blockEntityMock.height = "1";
    expect(blockEntityMock.height).toBe("1");
  });

  test("BlockEntity.price", () => {
    blockEntityMock.price = "1";
    expect(blockEntityMock.price).toBe("1");
  });
});
