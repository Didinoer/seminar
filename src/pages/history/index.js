import { Fragment, useEffect, useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Histories from "../../components/Histories";
import { getAllTickets, getAllHistories } from "../../util/api";
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
import TicketSummary from "../../components/TicketSummary";
import AccordionItem from "../../components/AccordionItem";
import TicketTableSummary from "../../components/TicketTableSummary";

export default function HistoryPage(props) {
  const [loadedHistories, setLoadedHistories] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [search, setSearch] = useState("");
  const pageSizes = [10, 25, 50];
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  function onChangeSearch(e) {
    setSearch(e.target.value);
  }

  function getRequestParams(search, page, pageSize) {
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
    return params;
  }

  function handlePageChange(event, value) {
    setPage(value);
  }

  function handlePageSizeChange(event) {
    setPage(1);
    setPageSize(event.target.value);
  }

  const fetchAllHistories = async () => {
    const params = getRequestParams(search, page, pageSize);
    const data = await getAllHistories(params);
    return data;
  };

  function fetchData() {
    setIsLoading(true);
    fetchAllHistories()
      .then((result) => {
        console.log(result);
        setLoadedHistories(result.histories);
        setCount(result.totalPages);
        setTotalData(result.totalData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  return (
    <MainLayout>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Title>Check-In History</Title>
        <TicketSummary />
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <AccordionItem
              accordionSummary={
                <Typography variant="subtitle1" component="div">
                  Ticket Summary
                </Typography>
              }
              accordionDetails={<TicketTableSummary />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-search">
                Search by name, invoice code or ticket code
              </InputLabel>
              <OutlinedInput
                id="outlined-search"
                value={search}
                onChange={onChangeSearch}
                onKeyUp={(event) => {
                  if (event.key == "Enter") fetchData();
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
                {loadedHistories && (
                  <Histories
                    data={loadedHistories}
                    page={page}
                    size={pageSize}
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
