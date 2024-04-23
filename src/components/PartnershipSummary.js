import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SummaryCard from "./SummaryCard";
import { getAllPartnershipTotal } from "../util/api";

export default function ApprovalSummary() {
  const [totalData, setTotalData] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalContacted, setTotalContacted] = useState(0);
  const [totalAccepted, setTotallAccepted] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0);

  const fetchAllTotal = async () => {
    const data = await getAllPartnershipTotal();
    return data;
  };

  function fetchData() {
    fetchAllTotal()
      .then((result) => {
        console.log(result);
        setTotalData(result.totalData);
        setTotalPending(result.totalPending);
        setTotalContacted(result.totalContacted);
        setTotallAccepted(result.totalAccepted);
        setTotalCanceled(result.totalCanceled);
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
        <SummaryCard label="Pending" count={totalPending} color="blueGrey" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Contacted" count={totalContacted} color="blue" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Cancelled" count={totalCanceled} color="red" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Accepted" count={totalAccepted} color="green" />
      </Grid>
    </Grid>
  );
}
