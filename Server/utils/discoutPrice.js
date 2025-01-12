const discountPrice = (price, dis = 1) => {
  const discountAmount = (Number(price) * Number(dis)) / 100;
  const actualPrice = Number(price) - discountAmount;
  return Math.round(actualPrice); // Round to the nearest whole number
};

export default discountPrice;
