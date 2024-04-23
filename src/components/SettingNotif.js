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
import CloseIcon from "@mui/icons-material/Close";
import { getSettingWablas,submitSettingWablas } from "../util/api";
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';

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

export default function SettingNotif({ data, page, size,fetchData }) {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [editNilai, setEditNilai] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [selectedID, setSelectedSetting] = useState();
  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
    setSelectedSetting(data.id);
  };
  const handleClose = () => setOpen(false);
  
  function onChangeEdit(e) {
    setEditNilai(e.target.value);
  }

  const fetchSettingWablas = async () => {
    if (!selectedData) {
      return;
    }
    const data = await getSettingWablas(selectedData.id);
    return data;
  };


  useEffect(() => {
   
  }, [selectedData]);

  const handleEdit = async () => {

    if (editNilai === ''){
      toast.success('Value belum diganti');
      return;
    }
    setIsSubmitLoading(true);
    await submitSettingWablas({
      id: selectedData.id,
      nilai: editNilai,
    });
    const alertText = "Berhasil Edit Data";
    const notifString = `${alertText}`;
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
              <TableCell>Setting</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.nilai}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleOpen(row)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Grid
                    container
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
                Setting Notification
              </Typography>
             
              <IconButton aria-label="delete" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List style={{ maxHeight: 550, overflow: "auto" }}>
              <Grid container spacing={2} id="modal-modal-description">

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="standard-required"
                    label="Value"
                    defaultValue={selectedData.nilai}
                    variant="standard"
                    onChange={onChangeEdit}
                />
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    
                      <Button
                        variant="outlined"
                        onClick={handleEdit}
                      >
                        Edit
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