import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SummaryCard from "./SummaryCard";
import { getAllApprovalTotal } from "../util/api";

export default function ApprovalSummary() {
  const [totalPending, setTotalPending] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);

  const fetchAllTotal = async () => {
    const data = await getAllApprovalTotal();
    return data;
  };

  function fetchData() {
    fetchAllTotal()
      .then((result) => {
        console.log(result);
        setTotalPending(result.totalPending);
        setTotalApproved(result.totalApproved);
        setTotalRejected(result.totalRejected);
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
        <SummaryCard label="Pending" count={totalPending} color="blue" />
      </Grid>
      <Grid item xs={6} md={4}>
        <SummaryCard label="Approved" count={totalApproved} color="green" />
      </Grid>
      <Grid item xs={6} md={4}>
        <SummaryCard label="Rejected" count={totalRejected} color="red" />
      </Grid>
    </Grid>
  );
}
