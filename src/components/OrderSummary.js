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
import { getAllOrderTotal } from "../util/api";
import Title from "./Title";
import { TableFooter } from '@mui/material';
import SummaryCardToday from "./SummaryCardToday";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function OrderSummary({ handleFilterChange, selectedCard }) {
  const [totalData, setTotalData] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalExpired, setTotalExpired] = useState(0);
  const [totalGeneral, setTotalGeneral] = useState(0);
  const [totalVip, setTotalVip] = useState(0);
  const [totalPlatinum, setTotalPlatinum] = useState(0);

  const [totalNotComplete, setTotalNotComplete] = useState(0);

  const [totalAd, setTotalAd] = useState(0);
  const [totalLink, setTotalLink] = useState(0);
  const [totalSocmed, setTotalSocmed] = useState(0);
  const [totalWab, setTotalWab] = useState(0);
  const [totalWag, setTotalWag] = useState(0);
  const [totalEb, setTotalEb] = useState(0);
  const [totalJkt01, setTotalJkt01] = useState(0);
  const [totalMrlc, setTotalMrlc] = useState(0);

  const [totalDataToday, setTotalDataToday] = useState(0);
  const [totalNotCompleteToday, setTotalNotCompleteToday] = useState(0);
  const [totalPendingToday, setTotalPendingToday] = useState(0);
  const [totalPaidToday, setTotalPaidToday] = useState(0);
  const [totalExpiredToday, setTotalExpiredToday] = useState(0);

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
        setTotalGeneral(result.totalGeneral);
        setTotalVip(result.totalVip);
        setTotalPlatinum(result.totalPlatinum);

        setTotalAd(result.totalAd);
        setTotalLink(result.totalLink);
        setTotalSocmed(result.totalSocmed);
        setTotalWab(result.totalWab);
        setTotalWag(result.totalWag);
        setTotalEb(result.totalEb);

        setTotalJkt01(result.totalJkt01);
        setTotalMrlc(result.totalMrlc);

        setTotalNotComplete(result.totalNotComplete);

        setTotalDataToday(result.totalDataToday);
        setTotalNotCompleteToday(result.totalNotCompleteToday);
        setTotalPendingToday(result.totalPendingToday);
        setTotalPaidToday(result.totalPaidToday);
        setTotalExpiredToday(result.totalExpiredToday);
  
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }
  
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  const data = [
    {
      "name": "AD",
      "count": totalAd
    },
    {
      "name": "WEBSITE",
      "count": totalLink
    },
    {
      "name": "SOCMED",
      "count": totalSocmed
    },
    {
      "name": "WAB",
      "count": totalWab
    },
    {
      "name": "WAG",
      "count": totalWag
    },
    {
      "name": "EB",
      "count": totalEb
    },
    {
      "name": "JKT00001",
      "count": totalJkt01
    },
    {
      "name": "MRLC",
      "count": totalMrlc
    },
    
  ];

  const datatickets = [
    {
      "name": "General",
      "count": totalGeneral
    },
    {
      "name": "Gold",
      "count": totalVip
    },
    {
      "name": "Platinum",
      "count": totalPlatinum
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    
    <Grid container spacing={2} mb={2} >
      <Grid item xs={12} md={4}>
        <CardContent sx={{backgroundColor: '#E8F5E9'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14 }}>
            Total Orders Today
          </Typography>
          <Typography sx={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {totalDataToday}
          </Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14 }}>
            Total Not Complete Today
          </Typography>
          <Typography sx={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {totalNotCompleteToday}
          </Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14 }}>
            Total Pending Today
          </Typography>
          <Typography sx={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {totalPendingToday}
          </Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14 }}>
            Total Expired Today
          </Typography>
          <Typography sx={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {totalExpiredToday}
          </Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14 }}>
            Total Paid Today
          </Typography>
          <Typography sx={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {totalPaidToday}
          </Typography>
        </div>
    </CardContent>

        {/* <SummaryCardToday label="Total Orders Today" count={totalDataToday} color="blue" tooltip="Total data pemesan hari ini"/> */}
      </Grid>

      <Grid item xs={12} md={12}>
        <Title>Orders</Title>
      </Grid>

      <Grid item xs={6} md={2.4}>
        <SummaryCard label="Total Orders" count={totalData} color="blue" tooltip="Total data pemesan" onClick={() => handleFilterChange({ target: { value: 'all' } }, 'Total Orders')} 
          isSelected={selectedCard === 'Total Orders'}  />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <SummaryCard label="Not Complete" count={totalNotComplete} color="orange" tooltip="Data pemesan belum pesan tiket" onClick={() => handleFilterChange({ target: { value: 'pendingdataif2024' } }, 'Not Complete')} isSelected={selectedCard === 'Not Complete'}/>
      </Grid>
      <Grid item xs={6} md={2.4}>
        <SummaryCard label="Pending" count={totalPending} color="blueGrey" tooltip="Data pemesan belum bayar" onClick={() => handleFilterChange({ target: { value: 'pending' } }, 'Pending')} isSelected={selectedCard === 'Pending'}/>
      </Grid>
      <Grid item xs={6} md={2.4}>
        <SummaryCard label="Expired" count={totalExpired} color="red" tooltip="Data pemesan belum bayar (Link Exp)" onClick={() => handleFilterChange({ target: { value: 'expired' } }, 'Expired')} isSelected={selectedCard === 'Expired'}/>
      </Grid>
      <Grid item xs={6} md={2.4}>
        <SummaryCard label="Paid" count={totalPaid} color="green" tooltip="Data pemesan sudah bayar" onClick={() => handleFilterChange({ target: { value: 'paid' } }, 'Paid')} isSelected={selectedCard === 'Paid'}/>
      </Grid>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ flex: 1, margin: '0 8px' }}>
          <SummaryCard label="Total Orders" count={totalData} color="blue" tooltip="Total data pemesan" />
        </div>
        <div style={{ flex: 1, margin: '0 8px' }}>
          <SummaryCard label="Not Complete" count={totalNotComplete} color="orange" tooltip="Data pemesan belum pesan tiket"/>
        </div>
        <div style={{ flex: 1, margin: '0 8px' }}>
          <SummaryCard label="Pending" count={totalPending} color="blueGrey" tooltip="Data pemesan belum bayar"/>
        </div>
        <div style={{ flex: 1, margin: '0 8px' }}>
          <SummaryCard label="Expired" count={totalExpired} color="red" tooltip="Data pemesan belum bayar (Link Exp)"/>
        </div>
        <div style={{ flex: 1, margin: '0 8px' }}>
          <SummaryCard label="Paid" count={totalPaid} color="green" tooltip="Data pemesan sudah bayar"/>
        </div>
      </div>
      </Grid> */}
      
      {/* <Grid item xs={6} md={2}>
      <div style={{ padding: '8px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: 'blue', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ fontSize: '10px' }}>Total data pemesan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: 'orange', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ fontSize: '10px' }}>Data pemesan belum pesan tiket</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#607d8b', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ fontSize: '10px' }}>Data pemesan belum bayar</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ fontSize: '10px' }}>Data pemesan belum bayar (Link Exp)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%', marginRight: '8px' }}></div>
          <span style={{ fontSize: '10px' }}>Data pemesan sudah bayar</span>
        </div>
      </div>
    </Grid> */}

      {/* <Grid item xs={12} md={12}>
        <Title>Tickets</Title>
      </Grid>
      
      <Grid item xs={6} md={3}>
        <SummaryCard label="Total Tickets" count={totalData} color="blueGrey" />
      </Grid> */}

      {/* <Grid item xs={6} md={3}>
        <SummaryCard label="Expired" count={totalExpired} color="red" />
      </Grid> */}
      
      {/* <Grid item xs={6} md={3}>
        <SummaryCard label="General" count={totalGeneral} color="black" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="VIP" count={totalVip} color="deepPurple" />
      </Grid>
      <Grid item xs={6} md={3}>
        <SummaryCard label="Platinum" count={totalPlatinum} color="deepBlue" />
      </Grid> */}

      {/* <Grid item xs={12} md={12}>
        <Title>Source</Title>
      </Grid>
      
      <Grid item xs={4} md={2}>
        <SummaryCard label="AD" count={totalGeneral} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="LINK" count={totalVip} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="SOCMED" count={totalPlatinum} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="WAB" count={totalGeneral} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="WAG" count={totalVip} color="black" />
      </Grid>
      <Grid item xs={4} md={2}>
        <SummaryCard label="EB" count={totalPlatinum} color="black" />
      </Grid> */}
      
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

      <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Tickets</TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Jumlah</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datatickets.map((row) => (
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
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'green' }}>
                    Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'green' }}>
                    {datatickets.reduce((acc, row) => acc + row.count, 0)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
      </Grid>
      

    </Grid>
  );
}
