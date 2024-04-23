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
  let fontColor = "primary";
  if (ticketType === "onsite" || ticketType === "general") {
    fontColor = "green";
  } else if (ticketType === "vip"){
    fontColor = "orange";
  }
  
  return (
    <Typography variant="button" color={fontColor} gutterBottom>
      {ticketType}
    </Typography>
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
  const handleOpen = (invoiceCode, ownerName) => {
    setSelectedOwnerName(ownerName);
    const prevInvoiceCode = selectedInvoiceCode;
    setSelectedInvoiceCode(invoiceCode);
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
    if (!selectedInvoiceCode) {
      return;
    }
    const data = await getTicketsByInvoiceCode(selectedInvoiceCode);
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
  }, [selectedInvoiceCode]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jenis Ticket</TableCell>
              <TableCell>Jumlah Ticket</TableCell>
              <TableCell>ID Reference</TableCell>
              <TableCell>Tanggal Daftar</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
                  <TableCell>{row.customer.name}</TableCell>
                  <TableCell>
                    {ticketTypeComponent(row.tickets[0].ticket_type)}
                  </TableCell>
                  <TableCell>
                    {row.totalSudahCheckIn}/{row.totalTicket}
                  </TableCell>
                  <TableCell>{row.invoice_code}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>
                    {checkInStatusComponent(row.latestCheckIn)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleOpen(row.invoice_code, row.customer.name)
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
