import React from "react";
import { Card, Title, LineChart } from "@tremor/react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);
  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

  const salesData = sales?.map((sale) => ({
    date: sale.createds,
    sales: sale.price_total,
  }));
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <Typography>Daily Sales (USD)</Typography>
          <LineChart
            data={salesData}
            dataKey="year"
            categories={["Sales"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            marginTop="mt-6"
            yAxisWidth="w-10"
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
