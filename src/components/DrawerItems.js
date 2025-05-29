import React from "react";
import { Link, useLocation } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HistoryIcon from "@mui/icons-material/History";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { PowerInput } from "@mui/icons-material";
const DrawerItems = () => {
	const location = useLocation();
	const session = JSON.parse(localStorage.getItem("user") || "null");

	if (!session) return null;

	// Define menu items with route, label, icon, and roles allowed
	const menuItems = [
		{
			to: "/orders",
			label: "orders",
			icon: <ShoppingCartIcon />,
			roles: ["admin"],
		},
		{
			to: "/tickets",
			label: "tickets",
			icon: <AirplaneTicketIcon />,
			roles: ["admin"],
		},
		{
			to: "/scanner",
			label: "scanner",
			icon: <QrCodeScannerIcon />,
			roles: ["admin", "officer"],
		},
		{
			to: "/history",
			label: "history",
			icon: <HistoryIcon />,
			roles: ["admin"],
		},
		{
			to: "/invitations",
			label: "invitations",
			icon: <InsertInvitationIcon />,
			roles: ["admin"],
		},
		{
			to: "/invitationcode",
			label: "invitation code",
			icon: <PowerInput />,
			roles: ["admin"],
		},
		{
			to: "/voucher",
			label: "voucher code",
			icon: <PowerInput />,
			roles: ["admin"],
		},
	];

	return (
		<>
			{menuItems.map(({ to, label, icon, roles }) =>
				roles.includes(session.role) ? (
					<Link to={to} key={to} className="text-link">
						<ListItemButton selected={location.pathname === to}>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText primary={label} />
						</ListItemButton>
					</Link>
				) : null
			)}
		</>
	);
};

export default DrawerItems;
