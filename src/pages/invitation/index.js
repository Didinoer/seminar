import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import InvitationSummary from "../../components/InvitationSummary";
import MainLayout from "../../components/layouts/MainLayout";
import Invitation from "../../components/Invitations";
import ModalInvitations from "../../components/ModalInvitations";
import { getAllInvitation } from "../../util/api";
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
import Button from "@mui/material/Button";
import UploadIcon from '@mui/icons-material/Upload';

export default function InvitationPage(props) {
  const navigate = useNavigate();
  const [loadedInvitations, setLoadedInvitations] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countDisplayedData, setCountDisplayedData] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [totalRedeem, setTotalRedeem] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pageSizes = [10, 25, 50];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [isOpen, setIsOpen] = useState(false);

  const filterStatus = [
    {
      code: "all",
      label: "Semua",
    },
    {
      code: "available",
      label: "Belum Redeem",
    },
    {
      code: "redeem",
      label: "Sudah Redeem",
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
    const data = await getAllInvitation(params);
    return data;
  };

  
  function fetchData() {
    setIsLoading(true);
    fetchAllApproval()
      .then((result) => {
        console.log(result);
        setLoadedInvitations(result.invitations);
        setCountDisplayedData(result.invitations.length);
        setCount(result.totalPages);
        setTotalData(result.totalData);
        setTotalRedeem(result.totalPending);
        setTotalAvailable(result.totalPaid);
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
        <Title>Invitation</Title>
        <InvitationSummary />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-search">
                Search by name, email or phone
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
          <Grid item xs={9} md={3}>
            <FormControl fullWidth variant="standard">
              <TextField
                select
                label="Status"
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
          <Grid item xs={3} md={1}>
            <Button variant="outlined" sx={{ height: 55 }} fullWidth={true}  onClick={() => setIsOpen(true)} > <UploadIcon /> </Button>
          </Grid>

          {isOpen && <ModalInvitations setIsOpen={setIsOpen} />}


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
                {loadedInvitations && (
                  <Invitation
                    data={loadedInvitations}
                    page={page}
                    count={count}
                    size={pageSize}
                    pageSizeArray={pageSizes}
                    countDisplayedData={countDisplayedData}
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                    fetchData={fetchData}
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
      </Box>
    </MainLayout>
  );
}
