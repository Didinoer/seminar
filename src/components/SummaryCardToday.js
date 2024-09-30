import React, { useState } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red, blue, green, blueGrey, deepPurple, indigo, orange } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function SummaryCardToday({ label, count, color, tooltip, onClick }) {
  const [openTooltip, setOpenTooltip] = useState(false);

  const colorArray = {
    blue: blue[500],
    green: green[500],
    red: red[500],
    blueGrey: blueGrey[500],
    deepPurple: deepPurple[500],
    deepBlue: indigo[900],
    black: '#000000', 
    orange: orange[500],
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  return (
    <Card
        sx={{ 
            width: "100%",
            backgroundColor: 'transparent',
            borderBottom: `8px solid ${colorArray[color]}`, 
            mb: 2, // margin bottom untuk jarak antar kartu
        }}
        onClick={onClick}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {label}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Tooltip
            title={tooltip}
            open={openTooltip}
            onClose={handleTooltipClose}
            disableHoverListener
            onClick={handleTooltipOpen}
          >
            <IconButton onClick={handleTooltipOpen}>
              <InfoIcon style={{ color: 'black' }} />
            </IconButton>
          </Tooltip>
          <span style={{ textAlign: 'right', color: 'black' }}>{count}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
