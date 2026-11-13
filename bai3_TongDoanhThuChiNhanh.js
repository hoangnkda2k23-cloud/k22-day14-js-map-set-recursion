const saleReport = {
  branch: "Hà Nội",
  revenue: 500,
  subBranches: [
    {
      branch: "Cầu Giấy",
      revenue: 200,
      subBranches: [{ branch: "Cầu Giấy 1", revenue: 50, subBranches: [] }],
    },
    {
      branch: "Đống Đa",
      revenue: 150,
      subBranches: [],
    },
  ],
};

function calculateTotalRevenue(report) {
  let total = report.revenue;

  for (const subBranches of report.subBranches) {
    total += calculateTotalRevenue(subBranches);
  }

  return total;
}

console.log(calculateTotalRevenue(salesReport));

console.log(
  calculateTotalRevenue({
    branch: "Hải Phòng",
    revenue: 100,
    subBranches: [],
  }),
);
