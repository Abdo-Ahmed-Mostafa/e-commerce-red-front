const DisplayCurrency = ({ num }) => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  });
  return formatter.format(num);
};

export default DisplayCurrency;
