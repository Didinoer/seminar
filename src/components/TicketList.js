import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import TicketItem from "./TicketItem";

export default function TicketList({ loadedTickets, checked, handleToggle }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {loadedTickets && (
          <List sx={{ width: "100%" }}>
            {loadedTickets.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.ticket_code}`;
              return (
                <TicketItem
                  key={value.ticket_code}
                  value={value}
                  checked={checked}
                  handleToggle={handleToggle}
                  labelId={labelId}
                />
              );
            })}
          </List>
        )}
      </Grid>
    </Grid>
  );
}
