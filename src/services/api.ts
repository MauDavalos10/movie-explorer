import axios from "axios";

export const searchMoviesAPI = async (query: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
  );
  return response.data;
};
