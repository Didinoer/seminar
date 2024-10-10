// import {useState, React} from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import List from "@mui/material/List";
// import Grid from "@mui/material/Grid";
// import DownloadIcon from '@mui/icons-material/Download';
// import UploadIcon from '@mui/icons-material/Upload';
// import { Button } from "@mui/material";
// import * as XLSX from "xlsx";
// import { importExcel } from "../util/api";
// import { toast } from "react-toastify";

// const ModalInvitations = ({ setIsOpen }) => {
//   var [array, setArray] = useState([]);

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "100%",
//     maxWidth: 550,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   const handleOnChange = (e) => {
//     e.preventDefault();
//     if (e.target.files) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const data = e.target.result;
//             const workbook = XLSX.read(data, { type: "array" });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const json = XLSX.utils.sheet_to_json(worksheet);
//             console.log(json);
//             setArray(json);
//         };
//         reader.readAsArrayBuffer(e.target.files[0]);
//     }
//   };
  

//   const handleOnSubmit = async () => {
//     console.log(array);
//     if (array.length === 0) {
//       const alertText = "Silahkan pilih file terlebih dahulu";
//       const notifString = `${alertText}`;
//       toast.success(notifString);
//     }
//     const data = await importExcel(array);
//     return data;
    
//   };

// return (
//     <Box sx={style}>
//       <Box
//           sx={{
//               display: "flex",
//               justifyContent: "space-between",
//           }}
//       >
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//             Import Data
//         </Typography>
//         <IconButton aria-label="delete"  onClick={() => setIsOpen(false)}>
//             <CloseIcon />
//         </IconButton>
//       </Box>
//         <List style={{ maxHeight: 550, overflow: "auto" }}>
//           <Grid container spacing={2} id="modal-modal-description">
//             <Grid item xs={6}>
//               <input
//                 type={"file"}
//                 id={"csvFileInput"}
//                 accept={".xlsx"}
//                 style={{
//                   border: "1px solid #ccc",
//                   display: "inline-block",
//                   padding: "6px 12px",
//                   cursor: "pointer",
//                 }}
//                 onChange={handleOnChange}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <Box sx={{ display: "flex", justifyContent: "end" }}>
//                 <Button
//                   onClick={(e) => {
//                     handleOnSubmit(e);
//                   }}
//                   variant="outlined">
//                     Import File <UploadIcon/>
//                 </Button>
//               </Box>
//             </Grid> 
//           </Grid>
//           <hr />
//           <Grid container spacing={2}>
//               <Grid item xs={12} >
//                 <Box sx={{ display: "flex", justifyContent: "center" }}>
//                   <a
//                     href={process.env.PUBLIC_URL+"/template_invitation.xlsx"}
//                     target="_blank"
//                     style={{textDecoration: "none" }}
//                     rel="noreferrer"
//                   >
//                     <Button 
//                       variant="outlined">
//                       Download Template <DownloadIcon/>
//                     </Button>
//                   </a>
//                 </Box>
//               </Grid>
//               <Grid item xs zeroMinWidth>
//               </Grid>
//           </Grid>
//         </List>
//     </Box>
//   )
// }
// export default ModalInvitations

// import {useState, React} from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import List from "@mui/material/List";
// import Grid from "@mui/material/Grid";
// import DownloadIcon from '@mui/icons-material/Download';
// import UploadIcon from '@mui/icons-material/Upload';
// import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
// import * as XLSX from "xlsx";
// import { importExcel } from "../util/api";
// import { toast } from "react-toastify";

// const ModalInvitations = ({ setIsOpen }) => {
//   var [array, setArray] = useState([]);

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "100%",
//     maxWidth: 550,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   const handleOnChange = (e) => {
//     e.preventDefault();
//     if (e.target.files) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const data = e.target.result;
//             const workbook = XLSX.read(data, { type: "array" });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const json = XLSX.utils.sheet_to_json(worksheet);
//             console.log(json);
//             setArray(json);
//         };
//         reader.readAsArrayBuffer(e.target.files[0]);
//     }
//   };
  

//   const handleOnSubmit = async () => {
//     console.log(array);
//     if (array.length === 0) {
//       const alertText = "Silahkan pilih file terlebih dahulu";
//       const notifString = `${alertText}`;
//       toast.success(notifString);
//     }
//     const data = await importExcel(array);
//     return data;
//   };

// return (
//     <Box sx={style}>
//       <Box
//           sx={{
//               display: "flex",
//               justifyContent: "space-between",
//           }}
//       >
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//             Import Data
//         </Typography>
//         <IconButton aria-label="delete"  onClick={() => setIsOpen(false)}>
//             <CloseIcon />
//         </IconButton>
//       </Box>
//         <List style={{ maxHeight: 550, overflow: "auto" }}>
//           <Grid container spacing={2} id="modal-modal-description">
//             <Grid item xs={6}>
//               <input
//                 type={"file"}
//                 id={"csvFileInput"}
//                 accept={".xlsx"}
//                 style={{
//                   border: "1px solid #ccc",
//                   display: "inline-block",
//                   padding: "6px 12px",
//                   cursor: "pointer",
//                 }}
//                 onChange={handleOnChange}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <Box sx={{ display: "flex", justifyContent: "end" }}>
//                 <Button
//                   onClick={(e) => {
//                     handleOnSubmit(e);
//                   }}
//                   variant="outlined">
//                     Import File <UploadIcon/>
//                 </Button>
//               </Box>
//             </Grid> 
//           </Grid>
//           <hr />
//           <Grid container spacing={2}>
//               <Grid item xs={12} >
//                 <Box sx={{ display: "flex", justifyContent: "center" }}>
//                   <a
//                     href={process.env.PUBLIC_URL+"/template_invitation.xlsx"}
//                     target="_blank"
//                     style={{textDecoration: "none" }}
//                     rel="noreferrer"
//                   >
//                     <Button 
//                       variant="outlined">
//                       Download Template <DownloadIcon/>
//                     </Button>
//                   </a>
//                 </Box>
//               </Grid>
//           </Grid>
          
//           {/* Tambahkan Tabel di bawah tombol Download */}
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Paper>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>No</TableCell>
//                       <TableCell>Invitation Code</TableCell>
//                       <TableCell>Nama</TableCell>
//                       <TableCell>Phone</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Status Error</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {array.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell></TableCell>
//                         <TableCell></TableCell>
//                         <TableCell></TableCell>
//                         <TableCell></TableCell>
//                         <TableCell></TableCell>
//                         <TableCell></TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </Paper>
//             </Grid>
//           </Grid>

//         </List>
//     </Box>
//   )
// }
// export default ModalInvitations;

import { useState, React } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import * as XLSX from "xlsx";
import { importExcel } from "../util/api";
import { toast } from "react-toastify";

const ModalInvitations = ({ setIsOpen }) => {
  const [array, setArray] = useState([]);
  const [errorData, setErrorData] = useState([]); // State untuk menyimpan data error
  const [message, setMessage] = useState([]); 

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
      return;
    }

    try {
      // console.log("SEBELUM AWAIT IMPORT");

      const response = await importExcel(array); // API call untuk mengimpor data
      console.log("SETELAH " + response);
      console.log("SETELAH AWAIT IMPORT" + response?.message);

      // Jika ada data yang tidak berhasil diimpor, simpan di state errorData
      if (response.invalid_data && response.invalid_data.length > 0) {
        // setErrorData(response.invalid_data); // Simpan data error di state
        // setMessage(response.message);
        // toast.error("Beberapa data gagal diimpor.");
        const invalidDataCount = response.invalid_data.length; // Menghitung jumlah data invalid
        setErrorData(response.invalid_data); // Simpan data error di state
        setMessage(response.message);
        
        // Menampilkan toast dengan jumlah invalid data
        toast.error(`${response.message} (${invalidDataCount} item(s) invalid)`); // Menambahkan count ke dalam pesan toast
      } else {
        toast.success("Semua data berhasil diimpor.");
      }
    } catch (error) {
      console.error("Error saat mengimpor:", error);
      toast.error("Gagal mengimpor data.");
    }
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
          </Grid>
          
          {/* Tabel untuk menampilkan data yang gagal diimpor */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Message */}
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {message}
              </Grid>

              {/* Table */}
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Invitation Code</TableCell>
                      <TableCell>Nama</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Email</TableCell>
                      {/* <TableCell>Status Error</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {errorData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.invitation_code}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        {/* <TableCell>{row.error_message}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>


        </List>
    </Box>
  );
}

export default ModalInvitations;

