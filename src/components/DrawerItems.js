import * as React from "react";
// import { useRouter } from "next/router";
import { Link, useNavigate, useLocation} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HistoryIcon from "@mui/icons-material/History";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
// import Link from "next/link";
// import styled from 'styled-components';

// const StyledLink = styled(Link)`
//     text-decoration: none;

//     &:focus, &:hover, &:visited, &:link, &:active {
//         text-decoration: none;
//     }
// `;

export default function DrawerItems() {
//   const router = useNavigate();
  const location = useLocation();
  const session = JSON.parse(localStorage.getItem('user'));

  return (
    <React.Fragment>
      { session.role !== 'finance' && 
      <Link to={"/orders"} className="text-link">
        <ListItemButton selected={location.pathname === "/orders"}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'finance' ||  session.role  === 'admin')  && 
      <Link to={"/approval"} className="text-link">
        <ListItemButton selected={location.pathname === "/approval"}>
          <ListItemIcon>
            <PriceCheckIcon />
          </ListItemIcon>
          <ListItemText primary="Approval" />
        </ListItemButton>
      </Link>
       }
      { (session.role  === 'admin' ||  session.role === 'officer')  && 
      <Link to={"/invitations"} className="text-link">
        <ListItemButton selected={location.pathname === "/invitation"}>
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Invitation" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/tickets"} className="text-link">
        <ListItemButton selected={location.pathname === "/tickets"}>
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText primary="Tickets" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/scanner"} className="text-link">
        <ListItemButton selected={location.pathname === "/scanner"}>
          <ListItemIcon>
            <QrCodeScannerIcon />
          </ListItemIcon>
          <ListItemText primary="Scanner" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/history"} className="text-link">
        <ListItemButton selected={location.pathname === "/history"}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/partnerships"} className="text-link">
        <ListItemButton selected={location.pathname === "/partnerships"}>
          <ListItemIcon>
            <HandshakeIcon />
          </ListItemIcon>
          <ListItemText primary="Partnership" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/referral"} className="text-link">
        <ListItemButton selected={location.pathname === "/Referral"}>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Referral" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/notif"} className="text-link">
        <ListItemButton selected={location.pathname === "/Notif"}>
          <ListItemIcon>
            <MarkChatUnreadIcon />
          </ListItemIcon>
          <ListItemText primary="Notif" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/voucher"} className="text-link">
        <ListItemButton selected={location.pathname === "/Voucher"}>
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText primary="Voucher" />
        </ListItemButton>
      </Link>
      }
      { (session.role  === 'admin' ||  session.role === 'officer') && 
      <Link to={"/invitationcode"} className="text-link">
        <ListItemButton selected={location.pathname === "/invitationcode"}>
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
          <ListItemText primary="Invitation Code" />
        </ListItemButton>
      </Link>
      }
    </React.Fragment>
  );
}