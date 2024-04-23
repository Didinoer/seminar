import { useState, useRef, useEffect } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { getTicket } from "../../util/api";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Title from "../../components/Title";
// import { QrReader } from "react-qr-reader";
import { QrScanner } from "react-qrcode-scanner";
// import styles from "../../styles/Scanner.module.css";
import { useNavigate } from "react-router-dom";

// import { useRouter } from "next/router";
import { toast } from "react-toastify";
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(swal)

export default function Dashboard(props) {
  const [qrValue, setQrValue] = useState("No result");
  const [isChecking, setIsChecking] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
//   const router = useRouter();
  const navigate = useNavigate();
  const readerElement = useRef();

  const handleScan = (value) => {
    console.log(value);
    setQrValue(value);
    fetchTicket(value)
      .then((response) => {
        console.log(response);
        if (response && response.length > 0 && response[0].ticket_type === 'onsite') {
          MySwal.fire("Checking Data", `Ticket ${value} Ditemukan`, "info");
          // toast.success(`Ticket ${value} Ditemukan`, {
          //   toastId: "success-notification",
          // });
          stopCamera();
        //   router.replace(`/result/${value}`);
          navigate(`/result/${value}`, {replace: true});
          navigate(0);
        } else {
          if (response && response.length > 0 && response[0].ticket_type === 'online') {
            MySwal.fire("Error", `Ticket ${value} Bukan Ticket Onsite`, "error");
          } else {
            MySwal.fire("Error", `Ticket ${value} Tidak Ditemukan`, "error");
          }
          // toast.error(`Ticket ${value} Tidak Ditemukan`, {
          //   toastId: "error-notification",
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleError = (error) => {
    console.log({ error });
  };

  const handleResult = (result, error) => {
    if (!isScanning) {
      return;
    }

    if (!!result) {
      // setIsChecking(true);
      setQrValue(result?.text);
      fetchTicket(result?.text)
        .then((response) => {
          console.log(response);
          // setIsChecking(false);
          if (response && response.length > 0) {
            toast.success("Ticket Ditemukan", {
              toastId: "success-notification",
            });
            // stopCamera();
            // router.replace(`/result/${result?.text}`);
          } else {
            toast.error("Ticket Tidak Ditemukan", {
              toastId: "error-notification",
            });
          }
        })
        .catch((err) => {
          setIsChecking(false);
          console.log(err);
        });
    }

    if (!!error) {
      console.info(error);
    }
  };

//   useEffect(() => {
//     const handleRouteChangeError = (err, url) => {
//       if (err.cancelled) {
//         console.log(`Route to ${url} was cancelled!`);
//       }
//     };

//     router.events.on("routeChangeError", handleRouteChangeError);

//     // If the component is unmounted, unsubscribe
//     // from the event with the `off` method:
//     return () => {
//       router.events.off("routeChangeError", handleRouteChangeError);
//     };
//   }, []);

  const stopCamera = () => {
    const video = document.querySelector("video");
    console.log(video);
    let mediaStream;
    if (video) {
      mediaStream = video.srcObject;
      
      if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks[0].enabled = false;
        tracks[0].stop();
      }
    }


    setIsScanning(false);
  };

  const resetScanner = () => {
    setQrValue("No result");
  };

  const fetchTicket = async (value) => {
    if (isChecking) {
      return;
    }
    const data = await getTicket(value);
    return data;
  };

  return (
    <MainLayout>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        flipHorizontally={true}
        video={{
          width: "100%",
          height: "100%",
        }}
        viewFinder={{
          border: "12px solid rgba(255,255,255,0.3)",
          position: "absolute",
          borderRadius: "5px",
          width: "250px",
          height: "250px",
        }}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Title>Scanner</Title>
      </Box>
      {/* <div className={styles.container}>
        <div className={styles.container}> */}
      {/* {isScanning && ( */}
      {/* <QrReader
            ref={readerElement}
            className={styles.videoContainer}
            onResult={handleResult}
            constraints={{ facingMode: "environment" }}
            style={{ width: "100%", height: "100%" }}
            scanDelay={2000}
            videoId="videoEl"
          /> */}
      {/* )} */}
      {/* <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" gutterBottom component="div">
              {qrValue}
            </Typography>
          </Box> */}

      {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            mb={2}
          >
            <Button variant="outlined" color="error" onClick={resetScanner}>
              Reset
            </Button>
          </Box> */}
      {/* </div>
      </div> */}
    </MainLayout>
  );
}
