import { Fragment } from "react";
import { formatDate } from "../util/date";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export default function TicketItem({value, checked, handleToggle, labelId}) {
  return (
    <ListItem
      key={value.ticket_code}
      secondaryAction={
        value.check_in_status === "belum_hadir" &&  (
          (value.ticket_type === 'onsite' ||  value.ticket_type === 'vip')  ? (
            <Checkbox
              edge="end"
              onChange={handleToggle(value)}
              checked={checked.indexOf(value.ticket_code) !== -1}
              inputProps={{ "aria-labelledby": labelId }}
              disabled={value.check_in_status === "hadir" || value.ticket_type === "online"}
            />
          ) :
          (
            <Typography variant="subtitle2" color="red" display="block">
              Bukan Ticket Onsite
            </Typography>
          )
        )
      }
      disablePadding
    >
      <ListItemButton
        disabled={value.check_in_status === "hadir" || value.ticket_type === "online"}
        onClick={handleToggle(value)}
      >
        <ListItemIcon>
          <ConfirmationNumberIcon />
        </ListItemIcon>
        <Grid container alignItems="center">
          <Grid item xs={12} md={8}>
            <ListItemText
              primary={
                <Typography variant="button" display="block">
                  {value.ticket_jenis === 'VIP' ? 'Gold' : value.ticket_jenis} - {value.owner_name}
                </Typography>
              }
              secondary={<Fragment>{value.ticket_code}</Fragment>}
            />
          </Grid>
          {(value.check_in_status === "hadir" && (value.ticket_type === 'onsite' || value.ticket_type === 'vip')) &&  (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    md: "flex-end",
                    xs: "flex-start",
                  },
                }}
              >
                <Typography variant="subtitle2" color="green" display="block">
                  Sudah Check-In ({formatDate(value.check_in_time)})
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}
