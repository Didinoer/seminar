// import { Fragment, useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableContainer from "@mui/material/TableContainer";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import Modal from "@mui/material/Modal";
// import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { getSettingWablas,submitEditInvitationCode, submitAddInvitationCode } from "../util/api";
// import { toast } from "react-toastify";
// import TextField from '@mui/material/TextField';
// import Chip from "@mui/material/Chip";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import * as React from 'react';
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "100%",
//   maxWidth: 550,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const ticketTypesList = ["general", "vip", "platinum"];

// function statusComponent(paymentStatus) {
//   if (paymentStatus === "active") {
//     return (
//       <Chip label="Active" sx={{ backgroundColor: 'rgb(76, 175, 80)', color: 'white' }}/>
//     );
//   } else {
//     return (
//       <Chip label="Inactive" sx={{ backgroundColor: 'rgb(244, 67, 54)', color: 'white' }} />
//     );
//   }
// }

// export default function SettingNotif({ data, page, size, fetchData }) {
//   const [open, setOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedData, setSelectedData] = useState({});
//   const [invitationForm, setInvitationCodeForm] = useState({
//     invitation_code: "",
//     status: "inactive",
//   });
  
//   const [isSubmitLoading, setIsSubmitLoading] = useState(false);

//   const handleOpen = (data) => {
//     setOpen(true);
//     if (data) {
//       setIsEditMode(true);
//       setSelectedData(data);
//       setInvitationCodeForm({
//         invitation_code: data.invitation_code,
//         status: data.status,
//         // voucher_name: data.voucher_name,
//         // voucher_code: data.voucher_code,
//         // kuota: data.kuota,
//         // status: data.status,
//         // ticket_types: data.ticket_types.split(","),
//         // discount: data.discount,
//       });
//     } else {
//       setIsEditMode(false);
//       setSelectedData({});
//       setInvitationCodeForm({
//         invitation_code: "",
//         status: "inactive",
//       });
//     }
//   };

//   const handleClose = () => setOpen(false);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setInvitationCodeForm({
//       ...invitationForm,
//       ticket_types: typeof value === 'string' ? value.split(',') : value,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInvitationCodeForm({
//       ...invitationForm,
//       [name]: value,
//     });
//   };

//   const handleAdd = async () => {
//     setIsSubmitLoading(true);
//     try {
//       // const updatedTicketTypes = invitationForm.ticket_types.map(type => type === 'gold' ? 'vip' : type);
//       //   const ticketTypesString = updatedTicketTypes.join(",");
//       // const ticketTypesString = voucherForm.ticket_types.join(",");
//       await submitAddInvitationCode({ ...invitationForm});
//       toast.success("Invitation Code successfully added");
//       handleClose();
//       fetchData();
//     } catch (error) {
//           toast.error("Failed to add Invitation Code");
//     } finally {
//       setIsSubmitLoading(false);
//     }
//   };

//   const handleEdit = async () => {
//     setIsSubmitLoading(true);
//     try {
//       const updatedTicketTypes = invitationForm.ticket_types.map(type => type === 'gold' ? 'vip' : type);
//       const ticketTypesString = updatedTicketTypes.join(",");
//       // const ticketTypesString = voucherForm.ticket_types.join(",");
//       await submitEditInvitationCode({ ...invitationForm, ticket_types: ticketTypesString, id: selectedData.id });
//       toast.success("Invitation Code successfully edited");
//       handleClose();
//       fetchData();
//     } catch (error) {
//       toast.error("Failed to edit Invitation Code");
//     } finally {
//       setIsSubmitLoading(false);
//     }
//   };

//   return (
//     <Fragment>
//       <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={() => handleOpen()}>
//         Add Invitation Code
//       </Button>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>No</TableCell>
//               <TableCell>Invitation Code</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.length > 0 ? (
//               data.map((row, idx) => (
//                 <TableRow key={row.id}>
//                   <TableCell>
//                     {(size || 1) * ((page || 1) - 1) + (idx + 1)}
//                   </TableCell>
//                   <TableCell>{row.invitation_code}</TableCell>
//                   <TableCell>{statusComponent(row.status)}</TableCell>
//                   <TableCell>
//                     <Button variant="outlined" color="success" onClick={() => handleOpen(row)}>
//                       Edit
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4}>
//                   <Grid container>
//                     <Grid item xs={12}>
//                       <Box sx={{ display: "flex", justifyContent: "center" }}>
//                         <Typography variant="button" color="red">
//                           Data Tidak Ditemukan
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         disableScrollLock
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box sx={style}>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography id="modal-title" variant="h6" component="h2">
//               {isEditMode ? "Edit Invitation Code" : "Add Invitation Code"}
//             </Typography>
//             <IconButton aria-label="close" onClick={handleClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <List>
//             <Grid container spacing={2}>
//               {/* <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Voucher Nameasdasd"
//                   name="voucher_name"
//                   value={voucherForm.voucher_name}
//                   variant="outlined"
//                   onChange={handleInputChange}
//                 />
//               </Grid> */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Invitation Code"
//                   name="invitation_code"
//                   value={invitationForm.invitation_code}
//                   variant="outlined"
//                   inputProps={{ style: { textTransform: "uppercase" } }}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               {/* <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Quota"
//                   name="kuota"
//                   type="number"
//                   value={voucherForm.kuota}
//                   variant="outlined"
//                   onChange={handleInputChange}
//                 />
//               </Grid> */}
//               <Grid item xs={12}>
//                 <FormControl required fullWidth variant="outlined">
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     name="status"
//                     value={invitationForm.status}
//                     onChange={handleInputChange}
//                     label="Status"
//                   >
//                     <MenuItem value="active">Active</MenuItem>
//                     <MenuItem value="inactive">Inactive</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               {/* <Grid item xs={12}>
//                 <FormControl required fullWidth variant="outlined">
//                   <InputLabel id="demo-multiple-chip-label">Ticket Types</InputLabel>
//                   <Select
//                     labelId="demo-multiple-chip-label"
//                     multiple
//                     value={voucherForm.ticket_types}
//                     onChange={handleChange}
//                     input={<OutlinedInput label="Ticket Types" />}
//                   >
//                     {ticketTypesList.map((type) => (
//                       <MenuItem key={type} value={type}>
//                         {type}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid> */}
//               {/* <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Discount"
//                   name="discount"
//                   value={voucherForm.discount}
//                   variant="outlined"
//                   onChange={handleInputChange}
//                 />
//               </Grid> */}
//             </Grid>
//           </List>
//           <Button
//             sx={{ mt: 2 }}
//             variant="contained"
//             color="primary"
//             onClick={isEditMode ? handleEdit : handleAdd}
//             disabled={isSubmitLoading}
//           >
//             {isEditMode ? "Update Invitation Code" : "Add Invitation Code"}
//           </Button>
//         </Box>
//       </Modal>
//     </Fragment>
//   );
// }


import { Fragment, useState } from "react";
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
import { getSettingWablas, submitEditInvitationCode, submitAddInvitationCode } from "../util/api";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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

// Helper function to display status
function statusComponent(paymentStatus) {
  if (paymentStatus === "active") {
    return (
      <Chip label="Active" sx={{ backgroundColor: "rgb(76, 175, 80)", color: "white" }} />
    );
  } else if (paymentStatus === "inactive") {
    return (
      <Chip label="Inactive" sx={{ backgroundColor: "rgb(244, 67, 54)", color: "white" }} />
    );
  } else {
    return (
      <Chip label="Unknown" sx={{ backgroundColor: "rgb(158, 158, 158)", color: "white" }} />
    );
  }
}

export default function SettingNotif({ data, page, size, fetchData }) {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [invitationForm, setInvitationCodeForm] = useState({
    invitation_code: "",
    status: "inactive",
  });
  
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Function to open the modal, either in add or edit mode
  const handleOpen = (data) => {
    setOpen(true);
    if (data) {
      setIsEditMode(true);
      setSelectedData(data);
      setInvitationCodeForm({
        invitation_code: data.invitation_code,
        status: data.status,
      });
    } else {
      setIsEditMode(false);
      setSelectedData({});
      setInvitationCodeForm({
        invitation_code: "",
        status: "inactive",
      });
    }
  };

  const handleClose = () => setOpen(false);

  // Input change handler for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvitationCodeForm({
      ...invitationForm,
      [name]: value,
    });
  };

  // Handler for adding a new invitation code
  const handleAdd = async () => {
    setIsSubmitLoading(true);
    try {
      await submitAddInvitationCode({ ...invitationForm });
      toast.success("Invitation Code successfully added");
      handleClose();
      fetchData();
    } catch (error) {
      toast.error("Failed to add Invitation Code");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Handler for editing an existing invitation code
  const handleEdit = async () => {
    setIsSubmitLoading(true);
    try {
      await submitEditInvitationCode({ ...invitationForm, id: selectedData.id });
      toast.success("Invitation Code successfully edited");
      handleClose();
      fetchData();
    } catch (error) {
      toast.error("Failed to edit Invitation Code");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <Fragment>
      <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Invitation Code
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Invitation Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {(size || 1) * ((page || 1) - 1) + (idx + 1)}
                  </TableCell>
                  <TableCell>{row.invitation_code}</TableCell>
                  <TableCell>{statusComponent(row.status)}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="success" onClick={() => handleOpen(row)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
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

      <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-title" variant="h6" component="h2">
              {isEditMode ? "Edit Invitation Code" : "Add Invitation Code"}
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Invitation Code"
                  name="invitation_code"
                  value={invitationForm.invitation_code}
                  variant="outlined"
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={invitationForm.status}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </List>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={isEditMode ? handleEdit : handleAdd}
            disabled={isSubmitLoading}
          >
            {isEditMode ? "Update Invitation Code" : "Add Invitation Code"}
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}
