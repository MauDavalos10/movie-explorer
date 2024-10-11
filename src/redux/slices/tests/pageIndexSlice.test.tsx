import pageIndexReducer, { setPageIndex } from "../pageIndexSlice";
import { RootState } from "../../store";

describe("pageIndex reducer", () => {
  it("should return the initial state", () => {
    expect(pageIndexReducer(undefined, { type: "" })).toEqual(1);
  });

  it("should handle setPageIndex", () => {
    const previousState = 1;
    expect(pageIndexReducer(previousState, setPageIndex(2))).toEqual(2);
  });

  it("should handle multiple setPageIndex actions", () => {
    let state = pageIndexReducer(undefined, { type: "" });
    state = pageIndexReducer(state, setPageIndex(3));
    expect(state).toEqual(3);
    state = pageIndexReducer(state, setPageIndex(1));
    expect(state).toEqual(1);
  });

  it("should handle setting the same page index", () => {
    const previousState = 2;
    expect(pageIndexReducer(previousState, setPageIndex(2))).toEqual(2);
  });
});

describe("pageIndex selectors", () => {
  it("should select the pageIndex from the root state", () => {
    const mockRootState = {
      pageIndex: 3,
    } as RootState;

    expect(mockRootState.pageIndex).toEqual(3);
  });
});
