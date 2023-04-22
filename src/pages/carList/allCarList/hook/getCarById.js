import Axios from "api/apiController";

const getCarById = async (id) => {
  const URL = `/carClasses/${id}`;
  const { data } = await Axios.get(URL);

  return data;
};

export default getCarById;
