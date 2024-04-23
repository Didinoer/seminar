import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import Approval from "../../components/Approval";
import SettingNotif from "../../components/SettingNotif";
import Copywritings from "../../components/Copywritings";
import { getAllApproval,getCopywriting,getSettingWablas } from "../../util/api";
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
import CircularProgress from "@mui/material/CircularProgress";
import Title from "../../components/Title";

export default function NotifPage(props) {
  const navigate = useNavigate();
  const [loadedApproval, setLoadedApproval] = useState();
  const [loadedSettingNotif, setLoadedSettingNotif] = useState();
  const [loadedCopywritings, setloadedCopywritings] = useState();
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
      code: "null",
      label: "Pending",
    },
    {
      code: "approved",
      label: "Sudah Approve",
    },
  ];
  const [filter, setFilter] = useState(filterStatus[0].code);

  const handleChange = (event, value) => {
    setPage(value);
  };

  function onChangeSearch(e) {
    setSearch(e.target.value);
  }

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

  function handleFilterChange(event) {
    setPage(1);
    setFilter(event.target.value);
  }

  const fetchAllApproval = async () => {
    const params = getRequestParams(search, page, pageSize, filter);
    const data = await getAllApproval(params);
    return data;
  };

  const fetchSettingNotif = async () => {
    const data = await getSettingWablas();
    return data;
  };

  
  const fetchCopywritings = async () => {
    const data = await getCopywriting();
    return data;
  };

  function fetchData() {
    setIsLoading(true);

    fetchCopywritings()
      .then((result) => {
        console.log(result);
        setloadedCopywritings(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    fetchSettingNotif()
    .then((result) => {
      console.log(result);
      setLoadedSettingNotif(result.data);
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
        <Box sx={{ display: "flex", flexWrap: "wrap" }} mb={3}>
        <Title>WABlas Setup</Title>
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
              <Grid item xs={12}>
                {loadedSettingNotif && (
                  <SettingNotif
                    data={loadedSettingNotif}
                    fetchData={fetchData}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                  />
                )}
              </Grid>
            </Grid>
           
          </Fragment>
        )}
      </Box>

      {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Title>Copywriting</Title>
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
                label="Status Approve"
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
              <Grid item xs={12}>
                {loadedCopywritings && (
                  <Copywritings
                    data={loadedCopywritings}
                    fetchData={fetchData}
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
                </Box>
              </Grid>
            </Grid>
          </Fragment>
        )}
      </Box> */}
    </MainLayout>
  );
}
