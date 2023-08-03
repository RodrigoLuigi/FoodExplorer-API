const isValidPriceFormat = (price) => {
  //const regex = /^\d+(,\d{2})?$/;
  // const regex = /^\d{1,3}(\.\d{3})*(,\d{2})?$/;
  const regex = /^[1-9]\d{0,2}(\.\d{3})*(,\d{2})?$/;

  return regex.test(price);
};

module.exports = { isValidPriceFormat };
