import { Fragment, useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "../util/date";
import { getTicketsByInvoiceCode, submitCheckIn } from "../util/api";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const columns = [
	{ field: "ticket_type", headerName: "Jenis Ticket", flex: 1 },
	{ field: "ticket_code", headerName: "Kode Ticket", flex: 1 },
	{
		field: "check_in_status",
		headerName: "Check-In",
		flex: 1,
		valueGetter: (params) =>
			`${
				params.row.check_in_status === "hadir"
					? formatDate(params.row.check_in_time)
					: "Belum Check-In"
			}`,
	},
];

let rows = [];

function checkInStatusComponent(checkInStatus, checkInTime) {
	if (checkInStatus === "success") {
		return (
			<Typography variant="button" color="green" gutterBottom>
				{formatDate(checkInTime)}
			</Typography>
		);
	} else {
		return (
			<Typography variant="button" color="error" gutterBottom>
				Check-In Gagal
			</Typography>
		);
	}
}

function ticketTypeComponent(ticketType) {
	let fontColor = "primary";
	// if (ticketType === "onsite") {
	//   fontColor = "green";
	// }
	// else {
	// return (
	//   <Typography variant="button" color="danger" gutterBottom>
	//     {ticketType}
	//   </Typography>
	// );
	// }
	return (
		<Typography variant="button" color={fontColor} gutterBottom>
			{ticketType}
		</Typography>
	);
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "100%",
	maxWidth: 800,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function Tickets({ data, page, size, fetchData }) {
	return (
		<Fragment>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>No</TableCell>
							<TableCell>Nama</TableCell>
							<TableCell>ID Reference</TableCell>
							<TableCell>Ticket Type</TableCell>
							<TableCell>Ticket Code</TableCell>
							<TableCell>Check-In</TableCell>
							<TableCell>User</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{data.length > 0 ? (
							data.map((row, idx) => (
								<TableRow key={row.id}>
									<TableCell>{size * (page - 1) + (idx + 1)}</TableCell>
									<TableCell>{row.ticket.owner_name}</TableCell>
									<TableCell>{row.invoice_code}</TableCell>
									<TableCell>
										{ticketTypeComponent(row.ticket.ticket_jenis)}
									</TableCell>
									<TableCell>{row.ticket_code}</TableCell>
									<TableCell>
										{checkInStatusComponent(row.status, row.createdAt)}
									</TableCell>
									<TableCell>{row.user.name}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={10}>
									<Grid
										container
										// my={2}
									>
										<Grid item xs={12}>
											<Box sx={{ display: "flex", justifyContent: "center" }}>
												<Typography variant="button" color="red">
													Data Tidak Ditemukan
												</Typography>
											</Box>
										</Grid>
									</Grid>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Fragment>
	);
}
