import { getCarList } from "../../api/api";

const getAllCarListByPage = async (page, perPage) => {
  const data = await getCarList();
  const totalPage = Math.ceil(data.length / perPage);
  const isLastPage = page === totalPage;

  const sliceCarList = (endpoint, isLastPage) => {
    const carList = data.slice(0, endpoint);
    return { carList, isLastPage };
  };

  return isLastPage
    ? sliceCarList(data.length, isLastPage)
    : sliceCarList(page * perPage, isLastPage);
};

export default getAllCarListByPage;
