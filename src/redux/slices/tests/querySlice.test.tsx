import queryReducer, { setQuery } from "../querySlice";
import { RootState } from "../../store";

describe("query reducer", () => {
  it("should return the initial state", () => {
    expect(queryReducer(undefined, { type: "" })).toEqual("");
  });

  it("should handle setQuery", () => {
    const previousState = "";
    expect(queryReducer(previousState, setQuery("test query"))).toEqual(
      "test query",
    );
  });

  it("should handle multiple setQuery actions", () => {
    let state = queryReducer(undefined, { type: "" });
    state = queryReducer(state, setQuery("first query"));
    expect(state).toEqual("first query");
    state = queryReducer(state, setQuery("second query"));
    expect(state).toEqual("second query");
  });
});

describe("query selectors", () => {
  it("should select the query from the root state", () => {
    const mockRootState = {
      query: "test query",
    } as RootState;

    expect(mockRootState.query).toEqual("test query");
  });
});
