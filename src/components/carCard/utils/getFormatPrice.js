const getFormatPrice = (price) => {
  const ceilPrice = Math.round(price / 100) * 100;
  return (
    ceilPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원"
  );
};

const getFormatYear = (year) => {
  return year.toString() + "년";
};

const getFormatDrivDistance = (distance) => {
  const tenThousand = Math.floor(distance / 10000);
  const formatTenThousand = tenThousand ? tenThousand.toString() + "만" : "";

  const thousand = Math.floor(distance / 1000)
    .toString()
    .slice(-1);
  const formatThousand = Number(thousand) ? thousand + "천" : "";

  const rest = distance % 1000;
  const formatRest = rest ? rest.toString() : "";

  const answer = formatTenThousand + formatThousand + formatRest;
  return answer;
};

const getFormatRegion = (region) => {
  return region
    .reduce((acc, cur) => {
      acc.push(...cur.split("/"));

      return acc;
    }, [])
    .join(", ");
};

const getFormatCarData = (data) => {
  const { price, year, drivingDistance, regionGroups } = data;

  const formatPrice = getFormatPrice(price);
  const formatYear = getFormatYear(year);
  const formatDistance = getFormatDrivDistance(drivingDistance);
  const formatRegion = getFormatRegion(regionGroups);

  const formatFooter = `${formatYear} | ${formatDistance}km | ${formatRegion}`;
  return {
    formatPrice,
    formatFooter,
  };
};

export default getFormatCarData;
