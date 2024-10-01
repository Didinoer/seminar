import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red, blue, green, blueGrey, deepPurple, indigo, orange } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function SummaryCard({ label, count, color, tooltip, onClick, isSelected }) {
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

  return (
    <Card
      sx={{ width: "100%", cursor: "pointer" }}
      style={{ 
        backgroundColor: colorArray[color], 
        color: "white", 
        border: isSelected ? '2px solid #000' : '2px solid transparent',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14, fontWeight: isSelected ? 'bold' : 'normal' }} gutterBottom>
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
            arrow
          >
            <IconButton>
              <InfoIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
          <span style={{ textAlign: 'right', color: 'white' }}>{count}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
