const hoursInMonth = 720;
const num_increments = 50;

const getBreakEvenPriceAsPercentOfAWS = (
  totalNetworkSizeInEB,
  filecoinPriceInUSD,
  vars
) => {
  const hdCostPerPBMonth = vars.hdCostPerPB / vars.hdDepreciationInMonths;
  const blockRewardPerPBMonthInUSD =
    (vars.totalBlockRewardPerMonth * filecoinPriceInUSD) /
    (totalNetworkSizeInEB * 1e3);
  const hwCost =
    (1e6 * vars.sealingHwCostPerGBHr) /
    (vars.avgContractDurationInMonths * hoursInMonth) /
    vars.sealingHwDepreciationInMonths;
  const expansionHdAdvantage = 1 / (vars.expansionFactor - 1);

  return Math.min(
    ((hdCostPerPBMonth + blockRewardPerPBMonthInUSD - hwCost) *
      expansionHdAdvantage) /
      vars.AWSPricePerPB,
    1.2
  );
};

export const getPricesForRanges = vars => {
  const size_increment =
    (vars.maxNetworkSizeInEB - vars.minNetworkSizeInEB) / num_increments;
  let x = [];
  let y = [];
  let z = [];
  for (
    let networkSize = vars.minNetworkSizeInEB;
    networkSize <= vars.maxNetworkSizeInEB;
    networkSize += size_increment
  ) {
    let x_row = [];
    let y_row = [];
    let z_row = [];
    for (
      let filecoinPrice = vars.minFilPriceInUSD;
      filecoinPrice <= vars.maxFilPriceInUSD + 1;
      filecoinPrice++
    ) {
      x_row.push(filecoinPrice);
      y_row.push(networkSize);
      z_row.push(
        getBreakEvenPriceAsPercentOfAWS(networkSize, filecoinPrice, vars)
      );
    }
    x.push(x_row);
    y.push(y_row);
    z.push(z_row);
  }
  return {
    x,
    y,
    z
  };
};
