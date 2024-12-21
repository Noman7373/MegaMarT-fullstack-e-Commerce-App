export const convertPriceBD = (price) => {
  return new Intl.NumberFormat("en-BH", {
    style: "currency",
    currency: "BHD",
  }).format(price);
};
