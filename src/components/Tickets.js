import { Fragment, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import TicketList from "./TicketList";
import { formatDate } from "../util/date";
import { getTicketsByInvoiceCode, submitCheckIn } from "../util/api";
import { toast } from "react-toastify";

import Chip from "@mui/material/Chip";

function checkInStatusComponent(checkInObject) {
  if (checkInObject) {
    return (
      <Typography variant="button" color="green" gutterBottom>
        {formatDate(checkInObject.check_in_time)}
      </Typography>
    );
  } else {
    return (
      <Typography variant="button" color="primary" gutterBottom>
        Belum Check-In
      </Typography>
    );
  }
}

function ticketTypeComponent(ticketType) {
  let chipColor = "#dddedf"; // Warna dasar
  let textColor = "black"; // Warna tulisan dasar

  if (ticketType === "Platinum") {
    chipColor = "#0e0f2a"; // Warna untuk platinum
    textColor = "white";
  } else if (ticketType === "Gold" || ticketType === "VIP") {
    chipColor = "#bc851b";    // Warna chip untuk gold
    textColor = "white"; 
  }
  
  return (
    <Chip
      label={ticketType}
      style={{
        backgroundColor: chipColor,
        color: textColor,
        fontWeight: 'bold', // Menebalkan tulisan
      }}
    />
  );
}

function statusCheckIn(status) {
  let chipColor = "red"; // Warna dasar
  let label = "Belum Check-In"; // Warna tulisan dasar

  if (status === "hadir") {
    chipColor = "green"; // Warna untuk platinum
    label = "Sudah Check-In";
  }
  
  return (
    <Chip
      label={label}
      style={{
        backgroundColor: chipColor,
        color: "white",
      }}
    />
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Tickets({ data, page, size, fetchData }) {
  const [open, setOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [loadedTickets, setLoadedTickets] = useState();
  const [selectedInvoiceCode, setSelectedInvoiceCode] = useState();
  const [selectedOwnerName, setSelectedOwnerName] = useState();
  const [selectedTicketArray, setSelectedTicketArray] = useState();
  const [checked, setChecked] = useState([]);

  const [selectedTicketId, setSelectedTicketId] = useState();

  const handleOpen = (invoiceCode, ownerName, ticketId) => {
    setSelectedOwnerName(ownerName);
    const prevInvoiceCode = selectedInvoiceCode;
    setSelectedInvoiceCode(invoiceCode);
    setSelectedTicketId(ticketId);
    if (prevInvoiceCode === invoiceCode) {
      fetchTickets();
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleToggle = (value) => () => {
    assignValue(value);
  };

  function assignValue(value) {
    if (value.check_in_status === "hadir") {
      return;
    }
    const ticketCode = value.ticket_code;
    const currentIndex = checked.indexOf(ticketCode);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(ticketCode);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }

  const handleCheckIn = async () => {
    console.log(selectedTicketArray);
    if (!checked && !isSubmitLoading) {
      return;
    }
    setIsSubmitLoading(true);
    const payload = {
      ticketArray: JSON.stringify(checked),
    }
    const jumlahTicket = await submitCheckIn(payload);
    if (jumlahTicket > 0) {
      const alertText = "Pengunjung Berhasil Check-In!";
      const notifString = `${alertText} ${selectedInvoiceCode} - ${selectedOwnerName} - ${jumlahTicket} tiket`;
      toast.success(notifString);
      handleClose();
      fetchData();
      setChecked([]);
    }
    setIsSubmitLoading(false);
  };

  const fetchAllTicketsByInvoiceCode = async () => {
    if (!selectedTicketId) {
      return;
    }
    const data = await getTicketsByInvoiceCode(selectedTicketId);
    return data;
  };

  function fetchTickets() {
    fetchAllTicketsByInvoiceCode()
      .then((result) => {
        console.log(result);
        setLoadedTickets(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchTickets();
  }, [selectedTicketId]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jenis Ticket</TableCell>
              {/* <TableCell>Jumlah Ticket</TableCell> */}
              <TableCell>ID Reference</TableCell>
              <TableCell>Tanggal Daftar</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
                  <TableCell>{row.owner_name}</TableCell>
                  <TableCell>
                    {ticketTypeComponent(row.ticket_jenis === 'VIP' ? 'Gold' : row.ticket_jenis)}
                  </TableCell>
                  {/* <TableCell>
                    {row.totalSudahCheckIn}/{row.totalTicket}
                  </TableCell> */}
                  <TableCell>{row.invoice_code}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>
                    {statusCheckIn(row.check_in_status)}
                  </TableCell>
                  <TableCell>
                    {/* {checkInStatusComponent(row.latestCheckIn)} */}
                    {row.check_in_time}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleOpen(row.invoice_code, row.owner_name, row.id_ticket)
                        }
                      >
                        Check-In
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>
                  <Grid
                    container
                    // my={2}
                  >
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="button" color="red">
                          Data Tidak Ditemukan
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {loadedTickets && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Invoice {selectedInvoiceCode} - {selectedOwnerName}
              </Typography>
              <IconButton aria-label="delete" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TicketList
              loadedTickets={loadedTickets}
              checked={checked}
              handleToggle={handleToggle}
            />
            <Box
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingButton
                disabled={!checked || checked.length <= 0}
                loading={isSubmitLoading}
                variant="outlined"
                onClick={handleCheckIn}
              >
                Check-In
              </LoadingButton>
            </Box>
          </Box>
        </Modal>
      )}
    </Fragment>
  );
}
