import { useEffect, useState, Fragment } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "../../components/Title";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LoadingButton from "@mui/lab/LoadingButton";
import { submitCheckIn, getTicket, getDetailIdOrder } from "../../util/api";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { useRouter } from "next/router";
// import Link from "next/link";
import TicketList from "../../components/TicketList";
import AccordionItem from "../../components/AccordionItem";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(swal);

export default function Result(props) {
  const [loadedTickets, setLoadedTickets] = useState();
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  //   const router = useRouter();
  const navigate = useNavigate();
  const params = useParams();
  const { ticketCode } = params;

  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    assignValue(value);
  };

  function assignValue(value) {
    if (value.check_in_status === "hadir" || value.ticket_type === "online") {
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

  const fetchTicket = async () => {
    const data = await getTicket(ticketCode);
    return data;
  };

  const fetchInvoice = async () => {
    if (loadedTickets) {
      const orderid = loadedTickets[0].order_id;
      setOwnerName(loadedTickets[0].owner_name);
      const phone =
        loadedTickets[0].owner_phone &&
        loadedTickets[0].owner_phone !== "+NULL" &&
        loadedTickets[0].owner_phone !== "NULL"
          ? loadedTickets[0].owner_phone
          : "-";
      const email =
        loadedTickets[0].owner_email &&
        loadedTickets[0].owner_email !== "+NULL" &&
        loadedTickets[0].owner_email !== "NULL"
          ? loadedTickets[0].owner_email
          : "-";
      setOwnerPhone(phone);
      setOwnerEmail(email);
      const data = await getDetailIdOrder(orderid);
      return data;
    }
    return;
  };

  function assignFirstTicket(result) {
    assignValue(result[0]);
  }

  function fetchData() {
    fetchTicket()
      .then((result) => {
        if (result && result.length > 0) {
          console.log(result);
          setLoadedTickets(result);
          assignFirstTicket(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchDataInvoice() {
    fetchInvoice()
      .then((result) => {
        if (result) {
          setSelectedInvoice(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, [ticketCode]);

  useEffect(() => {
    fetchDataInvoice();
  }, [loadedTickets]);

  const handleCheckIn = async () => {
    if (!checked && !isSubmitLoading) {
      return;
    }
    setIsSubmitLoading(true);
    const payload = {
      ticketArray: JSON.stringify(checked),
    };
    try {
      const jumlahTicket = await submitCheckIn(payload);
      if (jumlahTicket > 0) {
        const alertText = "Pengunjung Berhasil Check-In!";
        const notifString = `${alertText} ${selectedInvoice.invoice_code} - ${selectedInvoice.customer_name} - ${jumlahTicket} tiket`;
        // toast.success(notifString);
        MySwal.fire("Success", notifString, "success");
        // fetchData();
        //   router.push("/scanner");
        // navigate("/scanner");
        fetchData();
        setChecked([]);
      }
      setIsSubmitLoading(false);
    } catch (error) {
      MySwal.fire("Error", error.message, "error");
      setIsSubmitLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
        mb={2}
      >
        <Title>Scan Result</Title>
        <Link to={"/scanner"} className="text-link">
          <Button variant="outlined" startIcon={<QrCodeScannerIcon />}>
            Scan
          </Button>
        </Link>
      </Box>
      {selectedInvoice && (
        <AccordionItem
          selectedInvoice={selectedInvoice}
          accordionSummary={
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="subtitle1" component="div">
                  {/* {selectedInvoice.customer.name} */}
                  {ownerName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { md: "flex-end", xs: "flex-start" },
                  }}
                >
                  <Typography
                    variant="overline"
                    display="block"
                    sx={{ color: "text.secondary" }}
                  >
                    {selectedInvoice.invoice_code}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          }
          accordionDetails={
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="div">
                  {/* No HP : {selectedInvoice.customer.phone} */}
                  No HP : {ownerPhone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="div">
                  {/* Email : {selectedInvoice.customer.email} */}
                  Email : {ownerEmail}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      )}
      <TicketList
        loadedTickets={loadedTickets}
        checked={checked}
        handleToggle={handleToggle}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
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
    </MainLayout>
  );
}
