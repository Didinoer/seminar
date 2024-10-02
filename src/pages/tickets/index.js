import { Fragment, useEffect, useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Tickets from "../../components/Tickets";
import { getAllTickets2 } from "../../util/api";
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

import {ExportToExcel} from '../../components/ExportToExcel'

export default function TicketPage(props) {
  const [loadedTickets, setLoadedTickets] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const pageSizes = [10, 25, 50];
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  const [totalData, setTotalData] = useState(0);
  const [totalDataAll, setTotalDataAll] = useState(0);

  const [loadedTicketsExport, setLoadedTicketsExport] = useState();

  const filterStatus = [
    {
      code: "all",
      label: "Semua",
    },
    {
      code: "belum_hadir",
      label: "Belum Check-In",
    },
    {
      code: "hadir",
      label: "Sudah Check-In",
    },
  ];
  const [filter, setFilter] = useState(filterStatus[0].code);
  const filterJenisTicket = [
    {
      code: "all",
      label: "Semua",
    },
    {
      code: "General",
      label: "General",
    },
    {
      code: "Gold",
      label: "Gold",
    },
    {
      code: "Platinum",
      label: "Platinum",
    },
  ];
  const [jenisTicket, setJenisTicket] = useState(filterJenisTicket[0].code);

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
    if (filter) {
      params["filter"] = filter;
    }
    if (filter) {
      params["type"] = jenisTicket;
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

  function handleFilterChange(event) {
    setPage(1);
    setFilter(event.target.value);
  }

  function handleFilterJenisTicketChange(event) {
    setPage(1);
    setJenisTicket(event.target.value);
  }

  const fetchAllTickets = async () => {
    const params = getRequestParams(search, page, pageSize);
    const data = await getAllTickets2(params);
    return data;
  };

  function fetchData() {
    setIsLoading(true);
    fetchAllTickets()
      .then((result) => {
        console.log(result);
        setLoadedTickets(result.orders);
        setCount(result.totalPages);
        setTotalData(result.totalData);
        setTotalDataAll(result.totalDataAll);

        setLoadedTicketsExport(result.ordersExport);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, [page, pageSize, filter, jenisTicket]);

  return (
    <MainLayout>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Title>Tickets</Title>
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
          <Grid item xs={12} md={11}>
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
          <Grid item xs={3} md={1}>
              <ExportToExcel apiData={loadedTicketsExport} fileName={'Export-Tickets'} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                select
                label="Jenis Ticket"
                value={jenisTicket}
                onChange={handleFilterJenisTicketChange}
              >
                {filterJenisTicket.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="standard">
              <TextField
                select
                label="Status Kehadiran"
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
                {loadedTickets && (
                  <Tickets
                    data={loadedTickets}
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
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption" display="block" gutterBottom>
            <b>Jumlah Data Terfilter: {totalData} dari {totalDataAll} Total Data</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
