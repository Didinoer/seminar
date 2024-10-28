import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAllTicketSummaryTotal } from "../util/api";

export default function TicketTableSummary() {
  const session = JSON.parse(localStorage.getItem('user'));
  const [totalTicketOnsite, setTotalTicketOnsite] = useState(0);
  const [totalTicketOnline, setTotalTicketOnline] = useState(0);
  const [totalTicketOnsiteBelumCheckIn, setTotalTicketOnsiteBelumCheckIn] =
    useState(0);
  const [totalTicketOnsiteSudahCheckIn, setTotalTicketOnsiteSudahCheckIn] =
    useState(0);
  const [totalTicketOnlineBelumCheckIn, setTotalTicketOnlineBelumCheckIn] =
    useState(0);
  const [totalTicketOnlineSudahCheckIn, setTotalTicketOnlineSudahCheckIn] =
    useState(0);
  const [totalSudahScanOlehUser, setTotalSudahScanOlehUser] =
    useState(0);

  const [totalTicketGeneral, setTotalTicketGeneral] = useState(0);
  const [totalTicketGeneralBelumCheckIn, setTotalTicketGeneralBelumCheckIn] =
  useState(0);
  const [totalTicketGeneralSudahCheckIn, setTotalTicketGeneralSudahCheckIn] =
    useState(0);

  const [totalTicketGold, setTotalTicketGold] = useState(0);
  const [totalTicketGoldBelumCheckIn, setTotalTicketGoldBelumCheckIn] =
  useState(0);
  const [totalTicketGoldSudahCheckIn, setTotalTicketGoldSudahCheckIn] =
    useState(0);

  const [totalTicketPlatinum, setTotalTicketPlatinum] = useState(0);
  const [totalTicketPlatinumBelumCheckIn, setTotalTicketPlatinumBelumCheckIn] =
  useState(0);
  const [totalTicketPlatinumSudahCheckIn, setTotalTicketPlatinumSudahCheckIn] =
      useState(0);

  const [totalTicketInvitation, setTotalTicketInvitation] = useState(0);
  const [totalTicketInvitationBelumCheckIn, setTotalTicketInvitationBelumCheckIn] =
  useState(0);
  const [totalTicketInvitationSudahCheckIn, setTotalTicketInvitationSudahCheckIn] =
      useState(0);

  const fetchAllTotal = async () => {
    const data = await getAllTicketSummaryTotal();
    return data;
  };

  function fetchData() {
    fetchAllTotal()
      .then((result) => {
        console.log(result);
        setTotalTicketOnsite(result.totalTicketOnsite);
        setTotalTicketOnline(result.totalTicketOnline);
        setTotalTicketOnsiteBelumCheckIn(result.totalTicketOnsiteBelumCheckIn);
        setTotalTicketOnsiteSudahCheckIn(result.totalTicketOnsiteSudahCheckIn);
        setTotalTicketOnlineBelumCheckIn(result.totalTicketOnlineBelumCheckIn);
        setTotalTicketOnlineSudahCheckIn(result.totalTicketOnlineSudahCheckIn);
        setTotalSudahScanOlehUser(result.totalSudahScanOlehUser);

        setTotalTicketGeneral(result.totalTicketGeneral);
        setTotalTicketGeneralBelumCheckIn(result.totalTicketGeneralBelumCheckIn);
        setTotalTicketGeneralSudahCheckIn(result.totalTicketGeneralSudahCheckIn);

        setTotalTicketGold(result.totalTicketGold);
        setTotalTicketGoldBelumCheckIn(result.totalTicketGoldBelumCheckIn);
        setTotalTicketGoldSudahCheckIn(result.totalTicketGoldSudahCheckIn);

        setTotalTicketPlatinum(result.totalTicketPlatinum);
        setTotalTicketPlatinumBelumCheckIn(result.totalTicketPlatinumBelumCheckIn);
        setTotalTicketPlatinumSudahCheckIn(result.totalTicketPlatinumSudahCheckIn);

        setTotalTicketInvitation(result.totalTicketInvitation);
        setTotalTicketInvitationBelumCheckIn(result.totalTicketInvitationBelumCheckIn);
        setTotalTicketInvitationSudahCheckIn(result.totalTicketInvitationSudahCheckIn);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Jenis Ticket</TableCell>
            <TableCell>Ticket Terjual</TableCell>
            <TableCell>Sudah Check-In</TableCell>
            <TableCell>Belum Check-In</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>General</TableCell>
            <TableCell>{totalTicketGeneral}</TableCell>
            <TableCell>{totalTicketGeneralSudahCheckIn}</TableCell>
            <TableCell>{totalTicketGeneralBelumCheckIn}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>Gold</TableCell>
            <TableCell>{totalTicketGold}</TableCell>
            <TableCell>{totalTicketGoldSudahCheckIn}</TableCell>
            <TableCell>{totalTicketGoldBelumCheckIn}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>Platinum</TableCell>
            <TableCell>{totalTicketPlatinum}</TableCell>
            <TableCell>{totalTicketPlatinumSudahCheckIn}</TableCell>
            <TableCell>{totalTicketPlatinumBelumCheckIn}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >

            <TableCell>Invitation</TableCell>
            <TableCell>{totalTicketInvitation}</TableCell>
            <TableCell>{totalTicketInvitationSudahCheckIn}</TableCell>
            <TableCell>{totalTicketInvitationBelumCheckIn}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell>Total Ticket yang discan oleh {session && session.name }</TableCell>
            <TableCell></TableCell>
            <TableCell>{totalSudahScanOlehUser}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
