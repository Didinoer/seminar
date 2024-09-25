import { Fragment, useState, useEffect } from "react";
import Link from "@mui/material/Link";
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
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "../util/date";
import { getTicketsByInvoiceCode, submitCheckIn } from "../util/api";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const columns = [
  { field: "ticket_type", headerName: "Jenis Ticket", flex: 1 },
  { field: "ticket_code", headerName: "Kode Ticket", flex: 1 },
  {
    field: "check_in_status",
    headerName: "Check-In",
    flex: 1,
    valueGetter: (params) =>
      `${
        params.row.check_in_status === "hadir"
          ? formatDate(params.row.check_in_time)
          : "Belum Check-In"
      }`,
  },
];

let rows = [];

function checkInStatusComponent(checkInStatus, checkInTime) {
  if (checkInStatus === "success") {
    return (
      <Typography variant="button" color="green" gutterBottom>
        {formatDate(checkInTime)}
      </Typography>
    );
  } else {
    return (
      <Typography variant="button" color="error" gutterBottom>
        Check-In Gagal
      </Typography>
    );
  }
}

function ticketTypeComponent(ticketType) {
  let fontColor = "primary";
  // if (ticketType === "onsite") {
  //   fontColor = "green";
  // } 
  // else {
    // return (
    //   <Typography variant="button" color="danger" gutterBottom>
    //     {ticketType}
    //   </Typography>
    // );
  // }
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
  const [selectedData, setSelectedData] = useState();
  const [selectedInvoiceCode, setSelectedInvoiceCode] = useState();
  const [selectedOwnerName, setSelectedOwnerName] = useState();
  const [ticketData, setTicketData] = useState();
  const [selectedTicketArray, setSelectedTicketArray] = useState();
//   const handleOpen = (invoiceCode, ownerName) => {
//     setSelectedOwnerName(ownerName);
//     setSelectedInvoiceCode(invoiceCode);
//     setOpen(true);
//   };
  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCheckIn = async () => {
    console.log(selectedTicketArray);
    if (!selectedTicketArray && !isSubmitLoading) {
      return;
    }
    setIsSubmitLoading(true);
    const jumlahTicket = await submitCheckIn(selectedTicketArray);
    if (jumlahTicket > 0) {
      const alertText = "Pengunjung Berhasil Check-In!";
      const notifString = `${alertText} ${selectedInvoiceCode} - ${selectedOwnerName} - ${jumlahTicket} tiket`;
      toast.success(notifString);
      handleClose();
      fetchData();
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
        setTicketData(result);
        rows = result;
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
              <TableCell>ID Reference</TableCell>
              <TableCell>Ticket Type</TableCell>
              <TableCell>Ticket Code</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>User</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
                <TableCell>{row.ticket.owner_name}</TableCell>
                <TableCell>{row.invoice_code}</TableCell>
                <TableCell>{ticketTypeComponent(row.ticket.ticket_jenis)}</TableCell>
                <TableCell>{row.ticket_code}</TableCell>
                <TableCell>
                  {checkInStatusComponent(row.status, row.createdAt)}
                </TableCell>
                <TableCell>{row.user.name}</TableCell>
                {/* <TableCell>
                  <Stack direction="row" spacing={1}> */}
                    {/* <Button
                      variant="outlined"
                      onClick={() =>
                        handleOpen(row.invoice_code, row.owner_name)
                      }
                    >
                      Check-In
                    </Button> */}
                    {/* <Button variant="outlined" onClick={() => handleOpen(row)}>
                      Detail
                    </Button> */}
                  {/* </Stack>
                </TableCell> */}
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
      {/* {ticketData && (
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
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                let ticketCodeArray = [];
                rows.forEach((row) => {
                  if (selectedIDs.has(row.id)) {
                    ticketCodeArray.push(row.ticket_code);
                  }
                });
                setSelectedTicketArray(ticketCodeArray);
              }}
              isRowSelectable={(params) =>
                params.row.check_in_status === "belum_hadir"
              }
            />
            <Box
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoadingButton
                disabled={
                  !selectedTicketArray || selectedTicketArray.length <= 0
                }
                loading={isSubmitLoading}
                variant="outlined"
                onClick={handleCheckIn}
              >
                Check-In
              </LoadingButton>
            </Box>
          </Box>
        </Modal>
      )} */}
      {/* {selectedData && (
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
                Data Customer
              </Typography>
              <IconButton aria-label="delete" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} id="modal-modal-description">
              <Grid item xs={4}>
                Nama
              </Grid>
              <Grid item xs={8}>
                : {selectedData.customer.name}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                No HP
              </Grid>
              <Grid item xs={8}>
                : {selectedData.customer.phone}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Email
              </Grid>
              <Grid item xs={8}>
                : {selectedData.customer.email}
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                ID Reference
              </Grid>
              <Grid item xs={8}>
                : {selectedData.invoice_code}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Waktu Pemesanan
              </Grid>
              <Grid item xs={8}>
                : {formatDate(selectedData.createdAt)}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Tiket
              </Grid>
              <Grid item xs={8}>
                : {countTicket(ticketData)}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Referral
              </Grid>
              <Grid item xs={8}>
                : {selectedData.referror ? selectedData.referror : "-"}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Status
              </Grid>
              <Grid item xs={8}>
                : {paymentStatusComponent(selectedData.payment_status)}
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )} */}
    </Fragment>
  );
}
