import Axios from "api/apiController";

export const getCarList = async () => {
  const URL = "/carClasses";
  const { data } = await Axios.get(URL);

  return data;
};
