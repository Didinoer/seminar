import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { getSession, useSession, signOut } from "next-auth/react";
import { useNavigate } from "react-router-dom";
import {
	styled,
	createTheme,
	useTheme,
	ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import MuiAppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerItems from "../DrawerItems";
import { logout, checkToken } from "../../util/api";

const drawerWidth = 240;
const mdTheme = createTheme();
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		// marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

export default function MainLayout(props) {
	//   const { data: session, status } = useSession()
	const session = JSON.parse(localStorage.getItem("user"));
	const theme = useTheme();
	const navigate = useNavigate();

	async function logoutHandler() {
		await logout();
		localStorage.clear();
		navigate("/login", { replace: true });
	}

	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const checkTokenExpiration = async () => {
		const result = await checkToken();
		if (!result.success) {
			navigate("/login", { replace: true });
		}
	};

	useEffect(() => {
		checkTokenExpiration();
	}, []);

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					open={mobileOpen}
					style={{ backgroundColor: "red" }}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							edge="start"
							sx={{ mr: 2, ...(mobileOpen && { display: "none" }) }}>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1 }}>
							{session && `Hallo, ${session.name + " as " + session.role}`}
						</Typography>
						<Button
							variant="text"
							size="medium"
							onClick={logoutHandler}
							color="inherit">
							<LogoutIcon />
							<Typography
								ml={1}
								variant="subtitle1"
								color="inherit"
								noWrap
								sx={{ flexGrow: 1 }}>
								Logout
							</Typography>
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer
					// container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					<DrawerHeader>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}>
							<h1>Eventnia</h1>
						</Typography>
						<IconButton onClick={handleDrawerToggle}>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List component="nav">
						<DrawerItems />
					</List>
				</Drawer>
				<Main
					open={mobileOpen}
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}>
					<DrawerHeader />
					<Box component="main">
						<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Paper
										sx={{ p: 2, display: "flex", flexDirection: "column" }}>
										{props.children}
									</Paper>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Main>
			</Box>
		</ThemeProvider>
	);
}
