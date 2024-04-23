import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SummaryCard from "./SummaryCard";
import { getAllOrderTotal } from "../util/api";

export default function OrderSummary() {
  const [totalData, setTotalData] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalExpired, setTotalExpired] = useState(0);

  const fetchAllTotal = async () => {
    const data = await getAllOrderTotal();
    return data;
  };

  function fetchData() {
    fetchAllTotal()
      .then((result) => {
        console.log(result);
        setTotalData(result.totalData);
        setTotalPending(result.totalPending);
        setTotalPaid(result.totalPaid);
        setTotalExpired(result.totalExpired);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Pending" count={totalPending} color="blue" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Paid" count={totalPaid} color="green" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Expired" count={totalExpired} color="red" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Total" count={totalData} color="blueGrey" />
      </Grid>
    </Grid>
  );
}
