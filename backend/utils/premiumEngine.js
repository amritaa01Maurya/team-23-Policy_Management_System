// simple premium engine for demo
export const calculatePremium = ({ product, age, vehicleYear, idv }) => {
  let premium = product.basePremium;

  if (age) {
    if (age > 50) premium *= 1.3;
    else if (age > 35) premium *= 1.15;
  }

  if (vehicleYear) {
    const currentYear = new Date().getFullYear();
    const ageOfVehicle = currentYear - vehicleYear;
    if (ageOfVehicle > 10) premium *= 1.25;
    else if (ageOfVehicle > 5) premium *= 1.1;
  }

  if (idv) {
    premium += idv * 0.01; // 1% of idv added
  }

  return Math.round(premium);
};
