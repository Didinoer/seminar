import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const FormPengajuanBarang = ({ setIsOpen, onSubmit }) => {
  const [formData, setFormData] = useState({
    namaBarang: "",
    jumlah: "",
    deskripsi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.namaBarang || !formData.jumlah) {
      toast.error("Nama barang dan jumlah wajib diisi!");
      return;
    }

    const jsondata = JSON.stringify(formData);

    onSubmit(jsondata); // Kirim data ke parent melalui onSubmit
    setIsOpen(false); // Tutup modal
  };

  return (
    <Box
      sx={{
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
        zIndex: 10000,
      }}
    >
      <Paper sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Form Pengajuan Barang</Typography>
          <IconButton aria-label="close" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nama Barang"
              name="namaBarang"
              fullWidth
              value={formData.namaBarang}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Jumlah"
              name="jumlah"
              type="number"
              fullWidth
              value={formData.jumlah}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Deskripsi"
              name="deskripsi"
              fullWidth
              multiline
              rows={4}
              value={formData.deskripsi}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormPengajuanBarang;
