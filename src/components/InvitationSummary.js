// import { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import SummaryCard from "./SummaryCard";
// // import { getAllOrderTotal } from "../util/api";
// import { getAllInvitationTotal } from "../util/api";
// import Title from "./Title";
// import { TableFooter } from '@mui/material';
// // import SummaryCardToday from "./SummaryCardToday";

// // import CardContent from "@mui/material/CardContent";
// // import Typography from "@mui/material/Typography";

// export default function OrderSummary({ handleFilterChange, selectedCard }) {
//   const [selectedCard2, setSelectedCard2] = useState(null);
//   const [totalData, setTotalData] = useState(0);
//   const [totalInvitationToday, settotalInvitationToday] = useState(0);
//   const [totalMD, setTotalMD] = useState(0);
//   const [totalMRE, setTotalMRE] = useState(0);
//   const [totalSIP, setTotalSIP] = useState(0);
//   const [totalMRI, setTotalMRI] = useState(0);
//   const [totalMEDIA, setTotalMEDIA] = useState(0);
//   const [totalMR, setTotalMR] = useState(0);
//   const [totalDPDL, setTotalDPDL] = useState(0);
//   const [totalDPICF, setTotalDPICF] = useState(0);
//   const [totalDPIDEA, setTotalDPIDEA] = useState(0);
//   const [totalDPLIOC, setTotalDPLIOC] = useState(0);
//   const [totalMDDANA, setTotalMDDANA] = useState(0);
//   const [totalKD, setTotalKD] = useState(0);
//   const [totalJOE, setTotalJOE] = useState(0);
//   const [totalBM, setTotalBM] = useState(0);
//   const [totalOTG, setTotalOTG] = useState(0);
//   const [totalMLI, setTotalMLI] = useState(0);
//   const [totalSPEAKER, setTotalSPEAKER] = useState(0);
//   // Function to handle card click

//   const handleCardClick = (cardName) => {
//     // setSelectedCard(cardName); // Update selected card state
//     handleFilterChange({ target: { value: 'today' } }, cardName); // Call filter change
//   };

//   const fetchAllTotal = async () => {
//     const data = await getAllInvitationTotal();
//     return data;
//   };

//   function fetchData() {
//     fetchAllTotal()
//       .then((result) => {
//         console.log(result);
//         setTotalData(result.totalData);
//         settotalInvitationToday(result.totalInvitationToday);
//         setTotalMD(result.totalMD);
//         setTotalMRE(result.totalMRE);
//         setTotalSIP(result.totalSIP);
//         setTotalMRI(result.totalMRI);
//         setTotalMEDIA(result.totalMEDIA);
//         setTotalMR(result.totalMR);
//         setTotalDPDL(result.totalDPDL);
//         setTotalDPICF(result.totalDPICF);
//         setTotalDPIDEA(result.totalDPIDEA);
//         setTotalDPLIOC(result.totalDPLIOC);
//         setTotalMDDANA(result.totalMDDANA);
//         setTotalKD(result.totalKD);
//         setTotalJOE(result.totalJOE);
//         setTotalBM(result.totalBM);
//         setTotalOTG(result.totalOTG);
//         setTotalMLI(result.totalMLI);
//         setTotalSPEAKER(result.totalSPEAKER);
        
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   const data = [
//     {
//       "name": "MR",
//       "count": totalMR
//     },
//     {
//       "name": "MRE",
//       "count": totalMRE
//     },
//     {
//       "name": "MEDIA",
//       "count": totalMEDIA
//     },
//     {
//       "name": "SPEAKER",
//       "count": totalSPEAKER
//     },
//     {
//       "name": "SIP",
//       "count": totalSIP
//     },
//     {
//       "name": "DP-DL",
//       "count": totalDPDL
//     },
//     {
//       "name": "DP-ICF",
//       "count": totalDPICF
//     },
//     {
//       "name": "DP-IDEAPRENEURS",
//       "count": totalDPIDEA
//     },
//     {
//       "name": "DP-LIOC",
//       "count": totalDPLIOC
//     },
//     {
//       "name": "DP-ICF",
//       "count": totalDPICF
//     },
//     {
//       "name": "MD",
//       "count": totalMD
//     },
//     {
//       "name": "MD-DANA",
//       "count": totalMDDANA
//     },
//     {
//       "name": "KD",
//       "count": totalKD
//     },
//     {
//       "name": "JOE",
//       "count": totalJOE
//     },
//     {
//       "name": "BM",
//       "count": totalBM
//     },
//     {
//       "name": "OTG",
//       "count": totalOTG
//     },
//     {
//       "name": "MLI",
//       "count": totalMLI
//     },
    
    
    
//   ];

//   const MainComponent = ({ data }) => {
//     const midIndex = Math.ceil(data.length / 2);
//     const leftData = data.slice(0, midIndex);
//     const rightData = data.slice(midIndex);

//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
    
//     <Grid container spacing={2} mb={2} >
//       <Grid item xs={12} md={12}>
//         <Title>Invitations</Title>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <SummaryCard label="Total Invitation Today" count={totalInvitationToday} color="blue" tooltip="Total Invitation Hari ini" onClick={() => handleFilterChange({ target: { value: 'today' } }, 'Total Orders')} 
//           isSelected={selectedCard === 'Total Orders'}  />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <SummaryCard label="Total Invitation" count={totalData} color="green" tooltip="Total invitation Inspirafest 2024" onClick={() => handleFilterChange({ target: { value: 'paid' } }, 'Paid')} isSelected={selectedCard === 'Paid'}/>
//       </Grid>

//       {/* <Grid item xs={12} md={12}>
//         <Title>Invitation Code</Title>
//       </Grid>
      
//       <Grid item xs={4} md={2}>
//         <SummaryCard label="MD" count={totalMD} color="black" />
//       </Grid>
//       <Grid item xs={4} md={2}>
//         <SummaryCard label="MRE" count={totalMRE} color="black" />
//       </Grid>
//       <Grid item xs={4} md={2}>
//         <SummaryCard label="SIP" count={totalSIP} color="black" />
//       </Grid>
//       <Grid item xs={4} md={2}>
//         <SummaryCard label="MRI" count={totalMRI} color="black" />
//       </Grid>
//       <Grid item xs={4} md={2}>
//         <SummaryCard label="MEDIA" count={totalMEDIA} color="black" />
//       </Grid>
//       <Grid item xs={4} md={2}>
//         <SummaryCard label="MR" count={totalMR} color="black" />
//       </Grid>  */}
      
//       <Grid item xs={12} md={6}>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 250 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Source</TableCell>
//                   <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Jumlah</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {data.map((row) => (
//                   <TableRow
//                     key={row.name}
//                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                   >
//                     <TableCell component="th" scope="row">{row.name}</TableCell>
//                     <TableCell align="right">{row.count}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//               <TableFooter sx={{ borderTop: '2px solid rgba(224, 224, 224, 1)' }}>
//                 <TableRow>
//                   <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'black' }}>
//                     Total
//                   </TableCell>
//                   <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'black' }}>
//                     {data.reduce((acc, row) => acc + row.count, 0)}
//                   </TableCell>
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </TableContainer>
//       </Grid>

//     </Grid>
//   );
// }


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
import { getAllInvitationTotal } from "../util/api";
import Title from "./Title";
import { TableFooter } from '@mui/material';

export default function OrderSummary({ handleFilterChange, selectedCard }) {
  const [totalData, setTotalData] = useState(0);
  const [totalInvitationToday, setTotalInvitationToday] = useState(0);
  const [totals, setTotals] = useState({
    totalMD: 0,
    totalMRE: 0,
    totalSIP: 0,
    totalMRI: 0,
    totalMEDIA: 0,
    totalMR: 0,
    totalDPDL: 0,
    totalDPICF: 0,
    totalDPIDEA: 0,
    totalDPLIOC: 0,
    totalMDDANA: 0,
    totalKD: 0,
    totalJOE: 0,
    totalBM: 0,
    totalOTG: 0,
    totalMLI: 0,
    totalSPEAKER: 0,
    totalDTINV: 0,
    totalDTVIP: 0,
    totalFRD: 0,
    totalMDVIP: 0,

  });

  const fetchData = async () => {
    try {
      const result = await getAllInvitationTotal();
      setTotalData(result.totalData);
      setTotalInvitationToday(result.totalInvitationToday);
      setTotals(result); // Assume result contains all total fields
    } catch (error) {
      console.error(error);
    }
  };

  const data = [
    { name: "MR", count: totals.totalMR },
    { name: "MRE", count: totals.totalMRE },
    { name: "MEDIA", count: totals.totalMEDIA },
    { name: "SPEAKER", count: totals.totalSPEAKER },
    { name: "SIP", count: totals.totalSIP },
    { name: "DPDL", count: totals.totalDPDL },
    { name: "DPICF", count: totals.totalDPICF },
    { name: "DPIDEA", count: totals.totalDPIDEA },
    { name: "DPLIOC", count: totals.totalDPLIOC },
    { name: "MD", count: totals.totalMD },
    { name: "MDDANA", count: totals.totalMDDANA },
    { name: "KD", count: totals.totalKD },
    { name: "JOE", count: totals.totalJOE },
    { name: "BM", count: totals.totalBM },
    { name: "OTG", count: totals.totalOTG },
    { name: "MLI", count: totals.totalMLI },
    { name: "DTINV", count: totals.totalDTINV },
    { name: "DTVIP", count: totals.totalDTVIP },
    { name: "FRD", count: totals.totalFRD },
    { name: "MDVIP", count: totals.totalMDVIP },
  ];


  const midIndex = Math.ceil(data.length / 2);
  const leftData = data.slice(0, midIndex);
  const rightData = data.slice(midIndex);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12}>
        <Title>Invitations</Title>
      </Grid>

      <Grid item xs={12} md={6}>
        <SummaryCard 
          label="Total Invitation Today" 
          count={totalInvitationToday} 
          color="blue" 
          tooltip="Total Invitation Hari ini" 
          onClick={() => handleFilterChange({ target: { value: 'today' } }, 'Total Orders')} 
          isSelected={selectedCard === 'Total Orders'} 
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SummaryCard 
          label="Total Invitation" 
          count={totalData} 
          color="green" 
          tooltip="Total invitation Inspirafest 2024" 
          onClick={() => handleFilterChange({ target: { value: 'paid' } }, 'Paid')} 
          isSelected={selectedCard === 'Paid'}
        />
      </Grid>

      <Grid item xs={12} md={12} >
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Jumlah</TableCell>
                <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Jumlah</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leftData.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  {rightData[index] ? (
                    <>
                      <TableCell component="th" scope="row">{rightData[index].name}</TableCell>
                      <TableCell align="right">{rightData[index].count}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell />
                      <TableCell />
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'black' }}>
                  Total
                </TableCell>
                <TableCell colSpan={2} align="right" sx={{ fontWeight: 'bold', fontSize: '2rem', color: 'black' }}>
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

