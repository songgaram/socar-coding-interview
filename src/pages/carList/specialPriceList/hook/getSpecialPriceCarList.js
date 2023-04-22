import { getCarList } from "../../api/api";

const getSpecialPriceList = async () => {
  const SEARCH_TAG = "특가";
  const carList = await getCarList();
  const filtedList = carList.filter((car) =>
    car.carTypeTags.includes(SEARCH_TAG)
  );
  return filtedList;
};

export default getSpecialPriceList;
