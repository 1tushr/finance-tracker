import React from "react";
import { Line, Pie } from "@ant-design/charts";
import "./styles.css";

export default function ChartComponent({ sortedTransaction }) {
  const data = sortedTransaction.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransaction
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => {
      return { tag: transaction.tag, amount: transaction.amount };
    });
  const aggregatedSpendingData = Object.values(
    spendingData.reduce((accumulator, transaction) => {
      const { tag, amount } = transaction;
      if (accumulator[tag]) {
        accumulator[tag].amount += amount;
      } else {
        accumulator[tag] = { tag, amount };
      }
      return accumulator;
    }, {})
  );

  console.log(spendingData);

  const config = {
    data: data,
    // width:900,
    autoFit: true,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: aggregatedSpendingData,
    width:400, // You can adjust this width as needed
    autoFit:true,
    angleField: "amount",
    colorField: "tag",
  };
  let chart;
  let pieChart;

  return (
    <div className="charts-wrapper">
      <div className="chart-wrapper">
        <h2 className="text">your analytics</h2>
        <div className="line-graph">
        <Line 
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
        </div>
       
      </div>
      <div className="spending">
        <h2 className="text">your spending</h2>
        <div className="pie">
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
        </div>
      
      </div>
    </div>
  );
}
