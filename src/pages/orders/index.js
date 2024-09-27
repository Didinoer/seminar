import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import Orders from "../../components/Orders";
import { getAllOrders } from "../../util/api";
import Pagination from "@mui/material/Pagination";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Title from "../../components/Title";
import SummaryCard from "../../components/SummaryCard";
import OrderSummary from "../../components/OrderSummary";

export default function OrderPage(props) {
  const navigate = useNavigate();
  const [loadedOrders, setLoadedOrders] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countDisplayedData, setCountDisplayedData] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalExpired, setTotalExpired] = useState(0);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pageSizes = [10, 25, 50];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const filterStatus = [
    {
      code: "all",
      label: "Semua",
    },
    {
      code: "pendingdataif2024",
      label: "Not Complete",
    },
    {
      code: "pending",
      label: "Menunggu Pembayaran",
    },
    {
      code: "paid",
      label: "Pembayaran Berhasil",
    },
    {
      code: "expired",
      label: "Pembayaran Dibatalkan",
    },
  ];
  const [filter, setFilter] = useState(filterStatus[0].code);

  const handleChange = (event, value) => {
    setPage(value);
  };

  function onChangeSearch(e) {
    setSearch(e.target.value);
  }

  const tableRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);

  function getRequestParams(search, page, pageSize, filter) {
    let params = {};
    if (search) {
      params["search"] = search;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (filter) {
      params["filter"] = filter;
    }
    console.log(params);
    return params;
  }

  function handlePageChange(event, value) {
    setPage(value);
  }

  function handlePageSizeChange(event) {
    setPage(1);
    setPageSize(event.target.value);
  }

  function handleFilterChange(event, cardLabel) {
    setSelectedCard(cardLabel);

    setPage(1);
    setFilter(event.target.value);

    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("Table reference not available yet.");
    }
  }

  const fetchAllOrders = async () => {
    const params = getRequestParams(search, page, pageSize, filter);
    const data = await getAllOrders(params);
    return data;
  };

  function fetchData() {
    setIsLoading(true);
    fetchAllOrders()
      .then((result) => {
        console.log(result);
        setLoadedOrders(result.orders);
        setCountDisplayedData(result.orders.length);
        setCount(result.totalPages);
        setTotalData(result.totalData);
        setTotalPending(result.totalPending);
        setTotalPaid(result.totalPaid);
        setTotalExpired(result.totalExpired);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', {replace: true});
    }
    fetchData();
  }, [page, pageSize, filter]);

  return (
    <MainLayout>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Title>Today</Title>
        <OrderSummary handleFilterChange={handleFilterChange} selectedCard={selectedCard}/>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-search">
                Search by name or invoice code
              </InputLabel>
              <OutlinedInput
                id="outlined-search"
                value={search}
                onChange={onChangeSearch}
                onKeyUp={(event) => {
                  if (event.key === "Enter") fetchData();
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={fetchData} edge="end" color="primary">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search by name or invoice code"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="standard">
              <TextField
                select
                label="Status Pembayaran"
                value={filter}
                onChange={handleFilterChange}
              >
                {filterStatus.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
        {isLoading ? (
          <Grid container spacing={2} my={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Fragment>
            <Grid container my={2}>
              <Grid item xs={12} ref={tableRef}>
                {loadedOrders && (
                  <Orders
                    data={loadedOrders}
                    page={page}
                    count={count}
                    size={pageSize}
                    pageSizeArray={pageSizes}
                    countDisplayedData={countDisplayedData}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container mb={1}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-end", md: "flex-start" },
                    "& .MuiTextField-root": { mb: 1, width: "15ch" },
                  }}
                >
                  <FormControl variant="standard">
                    <TextField
                      label="Items per page"
                      select
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      size="small"
                    >
                      {pageSizes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} mb={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Pagination
                    count={count}
                    color="primary"
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Fragment>
        )}
        {/* <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption" display="block" gutterBottom>
              <b>
                Jumlah Data Terfilter: {count} dari {totalData} Total Data
              </b>
            </Typography>
          </Grid>
        </Grid> */}
      </Box>
    </MainLayout>
  );
}
