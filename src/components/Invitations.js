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

function paymentStatusComponent(paymentStatus) {
  if (paymentStatus === "redeem") {
    return (
      <Typography variant="button" color="green" gutterBottom>
        Sudah Redeem
      </Typography>
    );
  } else if (paymentStatus === "available") {
    return (
      <Typography variant="button" color="red" gutterBottom>
       Belum Redeem
      </Typography>
    );
  } else {
    return ( 
      <Typography variant="button" color="red" gutterBottom>
       Belum Redeem
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

export default function Invitations({ data, page, size }) {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
  }, [selectedData]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Invitation Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Ticket Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
                  <TableCell>{row.invitation_code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.ticket_type}</TableCell>
                  <TableCell>
                    {paymentStatusComponent(row.status)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(row)}
                      >
                        Detail
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
                  {selectedData.name}
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
                  {selectedData.phone}
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
                  {selectedData.email}
                </Grid>
              </Grid>
              <hr />
                <Grid item xs zeroMinWidth>
                  {paymentStatusComponent(selectedData.status)}
                </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  Tanggal Redeem
                </Grid>
                <Grid item xs="auto">
                  :
                </Grid>
                <Grid item xs zeroMinWidth>
                  {" "}
                  {selectedData.process_date
                    ? formatDate(selectedData.process_date)
                    : "-"}
                </Grid>
              </Grid>
            </List>
          </Box>
        </Modal>
      )}
    </Fragment>
  );
}
