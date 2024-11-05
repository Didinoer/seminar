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
import { getTicketsById, getTicketsByIdTicket, submitCheckIn } from "../util/api";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TextField from "@mui/material/TextField";

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



function handleWhatsAppMessage(phone) {
  const message = encodeURIComponent("");
  const whatsappLink = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappLink, '_blank');
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
  const [openEdit, setOpenEdit] = useState(false);
  const [editedPhone, setEditedPhone] = useState("");
  const [selectedEditName, setSelectedEditName] = useState("");
  const [selectedEditPhone, setSelectedEditPhone] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  // const [selectedTicketId, setSelectedTicketId] = useState("");

  const [selectedTicketId, setSelectedTicketId] = useState();

  const bearerToken = "Bearer " + localStorage.getItem("token");
  const handleOpen = (invoiceCode, ownerName, ticketId) => {
    setSelectedOwnerName(ownerName);
    const prevInvoiceCode = selectedInvoiceCode;
    setSelectedInvoiceCode(invoiceCode);
    setSelectedTicketId(ticketId);
    if (prevInvoiceCode === invoiceCode) {
      fetchTickets();
    }
    setChecked([]);
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
    const data = await getTicketsByIdTicket(selectedTicketId);
    return data;
  };

  const handleEditPhoneNumber = async () => {
    console.log(selectedEditName, selectedEditPhone, selectedTicketId, selectedOrderId);
    try {
      const response = await fetch("https://inspirafest.id/server/api/tickets/editphone", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
        body: JSON.stringify({
          phone : selectedEditPhone,
          ticketid :selectedTicketId,
          orderid : selectedOrderId, // assuming you’re using `selectedTicketId` to identify the user
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        toast.success("Nomor HP berhasil diperbarui!");
        handleEditClose();
        fetchData(); // Refresh data after edit
      } else {
        toast.error(result.message || "Gagal memperbarui nomor HP.");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      toast.error("Terjadi kesalahan, coba lagi.");
    }
  };

  const handleEditOpen = (name, phone, idticket, orderid) => {
    setSelectedEditName(name);
    setSelectedEditPhone(phone);
    setSelectedTicketId(idticket);
    setSelectedOrderId(orderid);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSubmit = () => {
    // Here you would make an API call to update the phone number
    console.log(`Updated phone number for ${selectedEditName}: ${editedPhone}`);
    handleEditClose();
    fetchData(); // To refresh the data
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
              <TableCell>No HP</TableCell>
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
                <TableRow key={`${row.id}-${idx}`}>
                  <TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
                  <TableCell>{row.owner_name}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <WhatsAppIcon sx={{ marginRight: 1 }} />
                          {row.owner_phone}
                        </span>
                      }
                      sx={{
                        backgroundColor: '#25D366',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#20b358',
                        },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleWhatsAppMessage(row.owner_phone)}
                    />
                  </TableCell>
                  <TableCell>
                    {ticketTypeComponent(row.ticket_jenis === 'VIP' ? 'Gold' : row.ticket_jenis)}
                  </TableCell>
                  <TableCell>{row.invoice_code}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>
                    {statusCheckIn(row.check_in_status)}
                  </TableCell>
                  <TableCell>{row.check_in_time}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleOpen(row.order_id, row.owner_name, row.id_ticket)
                        }
                      >
                        Check-In
                      </Button>
                      {/* <Button variant="outlined" color="primary" onClick={() => handleEditOpen(row.owner_name,row.owner_phone,row.id_ticket,row.order_id)}>
                        Edit Phone
                      </Button> */}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>
                  <Grid container>
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
                Ticket ID {selectedInvoiceCode} - {selectedOwnerName}
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
      <Modal open={openEdit} onClose={handleEditClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Phone Number
          </Typography>
          <Typography variant="body1">Name: {selectedEditName}</Typography>
          <TextField
            label="Phone Number"
            variant="outlined"
            value={selectedEditPhone}
            onChange={(e) => setSelectedEditPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleEditPhoneNumber}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleEditClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}
