import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SummaryCard from "./SummaryCard";
import { getAllInvitationTotal } from "../util/api";

export default function InvitationSummary() {
  const [totalData, setTotalData] = useState(0);
  const [totalRedeem, setTotalRedeem] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);

  const fetchAllTotal = async () => {
    const data = await getAllInvitationTotal();
    return data;
  };

  function fetchData() {
    fetchAllTotal()
      .then((result) => {
        console.log(result);
        setTotalData(result.totalData);
        setTotalRedeem(result.totalRedeem);
        setTotalAvailable(result.totalAvailable);
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
      <Grid item xs={6} md={4}>
        <SummaryCard label="Redeem" count={totalRedeem} color="blue" />
      </Grid>
      <Grid item xs={6} md={4}>
        <SummaryCard label="Available" count={totalAvailable} color="green" />
      </Grid>
      <Grid item xs={6} md={4}>
        <SummaryCard label="Total" count={totalData} color="blueGrey" />
      </Grid>
    </Grid>
  );
}
