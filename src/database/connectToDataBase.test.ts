import connectToDataBase from ".";

describe("Given a connectToDataBase function", () => {
  describe("When it receives an invalid url", () => {
    it("Should exit with code 1", async () => {
      const expectedCode = 1;
      const mockExit = jest.spyOn(process, "exit").mockImplementation();

      await connectToDataBase("invalid url");

      expect(mockExit).toHaveBeenCalledWith(expectedCode);
    });
  });
});
