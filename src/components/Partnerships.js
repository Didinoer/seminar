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
import {processPartnership } from "../util/api";
import { toast } from "react-toastify";


function statusComponent(status) {
  if (status === "pending") {
    return (
      <Typography variant="button" color="blueGrey" gutterBottom>
        Pending
      </Typography>
    );
  } else if (status === "contacted") {
    return (
      <Typography variant="button" color="blue" gutterBottom>
       Contacted
      </Typography>
    );
  } else if (status === "canceled") {
    return (
      <Typography variant="button" color="red" gutterBottom>
       Canceled
      </Typography>
    );
  } else if (status === "accepted") {
    return (
      <Typography variant="button" color="green" gutterBottom>
       Accepted
      </Typography>
    );
  } else {
    return ( 
      <Typography variant="button" color="red" gutterBottom>
       Error
      </Typography>
    );
  }
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

export default function Partnerships({ data, page, size,fetchData }) {
  const [open, setOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
  }, [selectedData]);

  const handleContact = async () => {
    console.log(selectedData.id);
    setIsSubmitLoading(true);
    const payload = {
        idPartnership: selectedData.id,
        status: 'contacted',
    }
      await processPartnership(payload);
      const alertText = "Berhasil Update, ";
      const notifString = `${alertText} ${selectedData.partner_brand} `;
      toast.success(notifString);
      handleClose();
      fetchData();
      setIsSubmitLoading(false);
  };

  const handleAccept = async () => {
    console.log(selectedData.id);
    setIsSubmitLoading(true);
    const payload = {
        idPartnership: selectedData.id,
        status: 'accepted',
    }
      await processPartnership(payload);
      const alertText = "Berhasil Update, ";
      const notifString = `${alertText} ${selectedData.partner_brand} `;
      toast.success(notifString);
      handleClose();
      fetchData();
      setIsSubmitLoading(false);
  };

  const handleCancel = async () => {
    console.log(selectedData.id);
    setIsSubmitLoading(true);
    const payload = {
        idPartnership: selectedData.id,
        status: 'canceled',
    }
      await processPartnership(payload);
      const alertText = "Berhasil Update, ";
      const notifString = `${alertText} ${selectedData.partner_brand} `;
      toast.success(notifString);
      handleClose();
      fetchData();
      setIsSubmitLoading(false);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tanggal Daftar</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
                  <TableCell>{row.partner_name}</TableCell>
                  <TableCell>{row.partner_email}</TableCell>
                  <TableCell>{row.partner_phone}</TableCell>
                  <TableCell>{row.partner_brand}</TableCell>
                  <TableCell>
                    {statusComponent(row.status)}
                  </TableCell>
                  <TableCell>{formatDate(row.createdAt) }</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(row)}
                      >
                        Process
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
                  {selectedData.partner_name}
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
                  {selectedData.partner_phone}
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
                  {selectedData.partner_email}
                </Grid>
              </Grid>
              <hr />
              <Grid container spacing={2}>
              <Grid item xs={4}>
                  Status
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {statusComponent(selectedData.status)}
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
                  {" "}
                  {selectedData.createdAt
                    ? formatDate(selectedData.createdAt)
                    : "-"}
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    
                      <Button
                        disabled={
                            selectedData.status === "contacted" ||
                            selectedData.status === "accepted"  ||
                            selectedData.status === "canceled"  
                        }
                        variant="outlined"
                        onClick={handleContact}
                      >
                        Contacted
                      </Button>
                        &nbsp;
                      <Button
                        color="error"
                        disabled={
                            selectedData.status === "accepted" ||
                            selectedData.status === "canceled" 
                        }
                        variant="outlined"
                        onClick={handleCancel}
                      >
                        Canceled
                      </Button>
                        &nbsp;
                      <Button
                        color="success"
                        disabled={
                            selectedData.status === "accepted" ||
                            selectedData.status === "canceled" 
                        }
                        variant="outlined"
                        onClick={handleAccept}
                      >
                        Accepted
                      </Button>
                      
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
