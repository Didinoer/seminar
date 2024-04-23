import {useState, React} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { importExcel } from "../util/api";
import { toast } from "react-toastify";

const ModalInvitations = ({ setIsOpen }) => {
  var [array, setArray] = useState([]);

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

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            console.log(json);
            setArray(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  

  const handleOnSubmit = async () => {
    console.log(array);
    if (array.length === 0) {
      const alertText = "Silahkan pilih file terlebih dahulu";
      const notifString = `${alertText}`;
      toast.success(notifString);
    }
    const data = await importExcel(array);
    return data;
    
  };

return (
    <Box sx={style}>
      <Box
          sx={{
              display: "flex",
              justifyContent: "space-between",
          }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Import Data
        </Typography>
        <IconButton aria-label="delete"  onClick={() => setIsOpen(false)}>
            <CloseIcon />
        </IconButton>
      </Box>
        <List style={{ maxHeight: 550, overflow: "auto" }}>
          <Grid container spacing={2} id="modal-modal-description">
            <Grid item xs={6}>
              <input
                type={"file"}
                id={"csvFileInput"}
                accept={".xlsx"}
                style={{
                  border: "1px solid #ccc",
                  display: "inline-block",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
                onChange={handleOnChange}
              />
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}
                  variant="outlined">
                    Import File <UploadIcon/>
                </Button>
              </Box>
            </Grid> 
          </Grid>
          <hr />
          <Grid container spacing={2}>
              <Grid item xs={12} >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <a
                    href={process.env.PUBLIC_URL+"/template_invitation.xlsx"}
                    target="_blank"
                    style={{textDecoration: "none" }}
                    rel="noreferrer"
                  >
                    <Button 
                      variant="outlined">
                      Download Template <DownloadIcon/>
                    </Button>
                  </a>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
              </Grid>
          </Grid>
        </List>
    </Box>
  )
}
export default ModalInvitations