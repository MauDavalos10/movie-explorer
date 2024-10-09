import axios from "axios";

export const searchMoviesAPI = async (query: string, pageIndex: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}&s=${query}&page=${pageIndex}`,
    );
    if (response.status !== 200) {
      return [];
    }
    return response.data;
  } catch (e) {
    console.log("Error: ", e);
  }
};
