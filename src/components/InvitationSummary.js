import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SummaryCard from "./SummaryCard";
// import { getAllOrderTotal } from "../util/api";
import { getAllInvitationTotal } from "../util/api";
import Title from "./Title";
import { TableFooter } from '@mui/material';
// import SummaryCardToday from "./SummaryCardToday";

// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";

export default function OrderSummary({ handleFilterChange, selectedCard }) {
  const [selectedCard2, setSelectedCard2] = useState(null);
  const [totalData, setTotalData] = useState(0);
  const [totalInvitationToday, settotalInvitationToday] = useState(0);
  const [totalMD, setTotalMD] = useState(0);
  const [totalMRE, setTotalMRE] = useState(0);
  const [totalLIPPO, setTotalLIPPO] = useState(0);
  const [totalMRI, setTotalMRI] = useState(0);
  const [totalMEDIA, setTotalMEDIA] = useState(0);
  const [totalMR, setTotalMR] = useState(0);
  
  // Function to handle card click
  const handleCardClick = (cardName) => {
    // setSelectedCard(cardName); // Update selected card state
    handleFilterChange({ target: { value: 'today' } }, cardName); // Call filter change
  };

  const fetchAllTotal = async () => {
    const data = await getAllInvitationTotal();
    return data;
  };

  function fetchData() {
    fetchAllTotal()
      .then((result) => {
        console.log(result);
        setTotalData(result.totalData);
        settotalInvitationToday(result.totalInvitationToday);
        setTotalMD(result.totalMD);
        setTotalMRE(result.totalMRE);
        setTotalLIPPO(result.totalLIPPO);
        setTotalMRI(result.totalMRI);
        setTotalMEDIA(result.totalMEDIA);
        setTotalMR(result.totalMR);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const data = [
    {
      "name": "MD",
      "count": totalMD
    },
    {
      "name": "MRE",
      "count": totalMRE
    },
    {
      "name": "LIPPO",
      "count": totalLIPPO
    },
    {
      "name": "MRI",
      "count": totalMRI
    },
    {
      "name": "MEDIA",
      "count": totalMEDIA
    },
    {
      "name": "MR",
      "count": totalMR
    },
    
  ];



  useEffect(() => {
    fetchData();
  }, []);

  return (
    
    <Grid container spacing={2} mb={2} >
      <Grid item xs={12} md={12}>
        <Title>Invitations</Title>
      </Grid>

      <Grid item xs={12} md={6}>
        <SummaryCard label="Total Invitation Today" count={totalInvitationToday} color="blue" tooltip="Total Invitation Hari ini" onClick={() => handleFilterChange({ target: { value: 'today' } }, 'Total Orders')} 
          isSelected={selectedCard === 'Total Orders'}  />
      </Grid>
      <Grid item xs={12} md={6}>
        <SummaryCard label="Total Invitation" count={totalData} color="green" tooltip="Total invitation Inspirafest 2024" onClick={() => handleFilterChange({ target: { value: 'paid' } }, 'Paid')} isSelected={selectedCard === 'Paid'}/>
      </Grid>

      {/* <Grid item xs={12} md={12}>
        <Title>Invitation Code</Title>
      </Grid>
      
      <Grid item xs={4} md={2}>
        <SummaryCard label="MD" count={totalMD} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="MRE" count={totalMRE} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="LIPPO" count={totalLIPPO} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="MRI" count={totalMRI} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="MEDIA" count={totalMEDIA} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="MR" count={totalMR} color="black" />
      </Grid>  */}
      
      <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Source</TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Jumlah</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter sx={{ borderTop: '2px solid rgba(224, 224, 224, 1)' }}>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'black' }}>
                    Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'black' }}>
                    {data.reduce((acc, row) => acc + row.count, 0)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
      </Grid>

    </Grid>
  );
}

