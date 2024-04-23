import React from "react";
import Login from "./pages/Login";
import Order from "./pages/orders/index";
import Ticket from "./pages/tickets/index";
import Scanner from "./pages/scanner/index";
import Result from "./pages/result/index";
import History from "./pages/history/index";
import Approval from "./pages/approval/index";
import Invitation from "./pages/invitation/index";
import Partnership from "./pages/partnership/index";
import Referral from "./pages/referral/index";
import Notif from "./pages/notif/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router basename="/event">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/tickets" element={<Ticket />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/result/:ticketCode" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/invitations" element={<Invitation />} />
          <Route path="/partnerships" element={<Partnership />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/notif" element={<Notif />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
