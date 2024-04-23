import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SummaryCard from "./SummaryCard";
import { getAllTicketTotal } from "../util/api";

export default function TicketSummary() {
  const [totalData, setTotalData] = useState(0);
  const [totalPemesan, setTotalPemesan] = useState(0);
  const [totalBelumCheckIn, setTotalBelumCheckIn] = useState(0);
  const [totalSudahCheckIn, setSudahCheckIn] = useState(0);

  const fetchAllTotal = async () => {
    const data = await getAllTicketTotal();
    return data;
  };

  function fetchData() {
    fetchAllTotal()
      .then((result) => {
        console.log(result);
        setTotalData(result.totalData);
        setTotalPemesan(result.totalPemesan);
        setTotalBelumCheckIn(result.totalTicketBelumCheckIn);
        setSudahCheckIn(result.totalTicketSudahCheckIn);
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
        <SummaryCard label="Belum Check-In" count={totalBelumCheckIn} color="blue" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Sudah Check-In" count={totalSudahCheckIn} color="green" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Total Ticket" count={totalData} color="blueGrey" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Total Customer" count={totalPemesan} color="deepPurple" />
      </Grid>
    </Grid>
  );
}
