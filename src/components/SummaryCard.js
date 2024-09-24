import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red, blue, green, blueGrey, deepPurple, indigo, orange } from '@mui/material/colors';

export default function SummaryCard({ label, count, color }) {
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
      sx={{ width: "100%" }}
      style={{ backgroundColor: colorArray[color], color: "white" }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {label}
        </Typography>
        <Typography variant="h5" style={{ textAlign: "right" }} component="div">
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}
