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
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "../util/date";
import { getTicketsByInvoiceCode } from "../util/api";

function paymentStatusComponent(paymentStatus) {
  if (paymentStatus === "paid") {
    return (
      <Typography variant="button" color="green" gutterBottom>
        Pembayaran Berhasil
      </Typography>
    );
  } else if (paymentStatus === "expired") {
    return (
      <Typography variant="button" color="red" gutterBottom>
        Pembayaran Dibatalkan
      </Typography>
    );
  } else {
    return (
      <Typography variant="button" color="primary" gutterBottom>
        Menunggu Pembayaran
      </Typography>
    );
  }
}

function countTicket(ticketData) {
  let counterString = "";
  if (!ticketData) {
    return;
  }

  const onsiteTickets = ticketData.filter(
    (ticket) => ticket.ticket_type === "onsite"
  );
  const onlineTickets = ticketData.filter(
    (ticket) => ticket.ticket_type === "online"
  );

  if (onsiteTickets.length > 0) {
    counterString += `${onsiteTickets.length} x ONSITE`;
  }
  if (onsiteTickets.length > 0 && onlineTickets.length > 0) {
    counterString += ", ";
  }
  if (onlineTickets.length > 0) {
    counterString += `${onlineTickets.length} x ONLINE`;
  }

  return counterString;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Orders({ data, page, size }) {
  const [open, setOpen] = useState(false);
  // const [sortBy, setSortBy] = useState("name");
  // const [sortDir, setSortDir] = useState("asc");
  const [selectedData, setSelectedData] = useState();
  const [ticketData, setTicketData] = useState();
  const [loadTicket, setLoadTicket] = useState(false);
  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // const handleSorting = (columnName) => {
  //   setSortBy(columnName);
  //   setSortDir(sortDir == "asc" ? "desc" : "asc");
  // };

  // const sortingComponent = (columnName) => {
  //   if (columnName === sortBy) {
  //     if (sortDir === "asc") {
  //       return <ArrowDropUpIcon />;
  //     } else {
  //       return <ArrowDropDownIcon />;
  //     }
  //   }
  //   return;
  // };

  const fetchAllTicketsByInvoiceCode = async () => {
    if (!selectedData) {
      return;
    }
    const data = await getTicketsByInvoiceCode(selectedData.invoice_code);
    return data;
  };

  function ownerPhone(ticketOwnerPhone) {
    const phone = (ticketOwnerPhone && ticketOwnerPhone !== '+NULL' && ticketOwnerPhone !== 'NULL') ? ticketOwnerPhone : '-';
    return phone;
  }

  function ownerEmail(ticketOwnerEmail) {
    const email = (ticketOwnerEmail && ticketOwnerEmail !== '+NULL' && ticketOwnerEmail !== 'NULL') ? ticketOwnerEmail : '-';
    return email;
  }

  function fetchTickets() {
    fetchAllTicketsByInvoiceCode()
      .then((result) => {
        console.log(result);
        setTicketData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setLoadTicket(true);
    fetchTickets();
    setLoadTicket(false);
  }, [selectedData]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>
                Nama
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Nama</span>
                  {sortingComponent("name")}
                </Box> */}
              </TableCell>
              <TableCell>ID Reference</TableCell>
              <TableCell>Tanggal Daftar</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
                  <TableCell>{row.customer.name}</TableCell>
                  <TableCell>{row.invoice_code}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>
                    {paymentStatusComponent(row.payment_status)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(row)}
                      >
                        Detail
                      </Button>
                      {/* {row.payment_status === "paid" && (
                      <Button variant="outlined" color="success">
                        Check-In
                      </Button>
                    )} */}
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
      {selectedData && (
        <Modal
          open={open}
          onClose={handleClose}
          style={{
            overflow: "scroll",
          }}
          disableScrollLock
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
                Data Customer
              </Typography>
              <IconButton aria-label="delete" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List style={{ maxHeight: 550, overflow: "auto" }}>
              <Grid container spacing={2} id="modal-modal-description">
                <Grid item xs={4}>
                  Nama
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {selectedData.customer.name}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  No HP
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {selectedData.customer.phone}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Email
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {selectedData.customer.email}
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  ID Reference
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {selectedData.invoice_code}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Tiket
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {" "}
                  {ticketData && !loadTicket
                    ? countTicket(ticketData)
                    : "Loading..."}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Total Harga
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  Rp {Number(selectedData.total).toLocaleString("ID-id")}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Source
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {selectedData.source}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Information
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {selectedData.information}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Referral
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {" "}
                  {selectedData.referror
                    ? selectedData.fighter_id + " - " + selectedData.referror
                    : "-"}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Status
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {paymentStatusComponent(selectedData.payment_status)}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Tanggal Daftar
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {formatDate(selectedData.createdAt)}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Tanggal Bayar
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {" "}
                  {selectedData.date_paid
                    ? formatDate(selectedData.date_paid)
                    : "-"}
                </Grid>
              </Grid>
              { selectedData && selectedData.payment_status === 'paid' && (
              <Fragment>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={12} mb={1}>
                    <Typography variant="h6" component="h2">
                      List Ticket
                    </Typography>
                  </Grid>
                </Grid>
                {ticketData && !loadTicket
                  ? ticketData.map((ticket, index) => (
                      <Fragment key={index}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <b>Ticket {index + 1}</b>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            Nama
                          </Grid>
                          <Grid item xs="auto">
                            :
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            {ticket.owner_name}
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            No HP
                          </Grid>
                          <Grid item xs="auto">
                            :
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            {ownerPhone(ticket.owner_phone)}
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            Email
                          </Grid>
                          <Grid item xs="auto">
                            :
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            {ownerEmail(ticket.owner_email)}
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            Ticket Type
                          </Grid>
                          <Grid item xs="auto">
                            :
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            {" "}
                            {ticket.ticket_type === "onsite"
                              ? "ONSITE"
                              : "ONLINE"}
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} mb={1}>
                          <Grid item xs={4}>
                            Ticket Code
                          </Grid>
                          <Grid item xs="auto">
                            :
                          </Grid>
                          <Grid item xs zeroMinWidth>
                            {ticket.ticket_code}
                          </Grid>
                        </Grid>
                      </Fragment>
                    ))
                  : "Loading..."}
              </Fragment>
              )}
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <a
                      href={`https://inspirafest.id/e-ticket?referenceId=${selectedData.invoice_code}`}
                      //href={`http://localhost/production/inspirafest/e-ticket?referenceId=${selectedData.invoice_code}`}

                      target="_blank"
                      style={{
                        textDecoration: "none",
                        pointerEvents:
                          (selectedData.payment_status === "pending" ||
                            selectedData.payment_status === "expired") && 
                          "none",
                      }}
                      rel="noreferrer"
                    >
                      <Button
                        disabled={
                          selectedData.payment_status === "pending" ||
                          selectedData.payment_status === "expired"
                        }
                        variant="outlined"
                      >
                        Cetak E-Ticket
                      </Button>
                    </a>
                  </Box>
                </Grid>
              </Grid>
            </List>
          </Box>
        </Modal>
      )}
    </Fragment>
  );
}
 