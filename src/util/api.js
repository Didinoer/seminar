// const API_URL = "http://localhost:8000/";
//const API_URL = "http://192.168.55.12:80/";
const API_URL = "https://inspirafest.id/server/";
const bearerToken = "Bearer " + localStorage.getItem("token");

export async function login(credentials) {
  const response = await fetch(`${API_URL}api/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export async function logout() {
  const response = await fetch(`${API_URL}api/logout`, {
    method: "POST",
    body: null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });

  const data = await response.json();
  console.log(data);

  if (!response) {
    if (response.status === 401) {
      return response;
    }
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export async function checkToken() {
  const response = await fetch(`${API_URL}api/check-token`, {
    method: "POST",
    body: null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });

  const data = await response.json();
  console.log(data);

  if (!response) {
    if (response.status === 401) {
      return response;
    }
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export async function getAllOrders(params) {
  const response = await fetch(
    `${API_URL}api/orders?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function getAllOrderTotal() {
  const response = await fetch(`${API_URL}api/orders/total`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}



export async function getInvoice(invoiceCode) {
  const response = await fetch(`${API_URL}api/orders/${invoiceCode}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const order = result.data.order;

  return order;
}

export async function getDetailIdOrder(id) {
  const response = await fetch(`${API_URL}api/orders/detailid/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }
  const order = result.data.order;
  return order;
}

export async function getAllTickets(params) {
  const response = await fetch(
    `${API_URL}api/tickets?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }

  const tickets = result.data;

  return tickets;
}

export async function getAllTickets2(params) {
  const response = await fetch(
    `${API_URL}api/tickets2?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }

  const tickets = result.data;

  return tickets;
}

export async function getAllTicketTotal() {
  const response = await fetch(`${API_URL}api/tickets/total`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  const tickets = result.data;

  return tickets;
}

export async function getAllTicketSummaryTotal() {
  const response = await fetch(`${API_URL}api/tickets/summary`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  const tickets = result.data;

  return tickets;
}

export async function getAllHistories(params) {
  const response = await fetch(
    `${API_URL}api/history?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  const histories = result.data;

  return histories;
}

export async function getTicket(ticketCode) {
  const response = await fetch(`${API_URL}api/tickets/code/${ticketCode}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  const tickets = result.data.tickets;
  console.log(tickets);

  return tickets;
}

export async function submitCheckIn(ticketArray) {
  const response = await fetch(`${API_URL}api/tickets/checkin`, {
    method: "POST",
    body: JSON.stringify(ticketArray),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const tickets = result.data;

  return tickets;
}

export async function getTicketsByInvoiceCode(invoiceCode) {
  const response = await fetch(`${API_URL}api/tickets/${invoiceCode}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  console.log(result);

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const tickets = result.data.tickets;

  return tickets;
}

export async function getTicketsById(invoiceCode) {
  const response = await fetch(`${API_URL}api/tickets/detailtickets/${invoiceCode}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  console.log(result);

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const tickets = result.data.tickets;

  return tickets;
}

export async function getTicketsByIdTicket(idTicket) {
  const response = await fetch(`${API_URL}api/tickets/detailtickets3/${idTicket}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  console.log(result);

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const tickets = result.data.tickets;

  return tickets;
}

// Added Wafi
export async function getAllApproval(params) {
  const response = await fetch(
    `${API_URL}api/approval?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;
  return orders;
}


export async function getAllApprovalTotal() {
  const response = await fetch(`${API_URL}api/approval/total`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

// export async function getAllInvitation(params) {
//   const response = await fetch(
//     `${API_URL}api/invitation?` + new URLSearchParams(params), {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: bearerToken,
//       },
//     }
//   );
//   const result = await response.json();

//   if (!result.success) {
//     throw new Error(result.message || "Something went wrong!");
//   }

//   const orders = result.data;
//   return orders;
// }

export async function getAllInvitation(params) {
  const response = await fetch(
    `${API_URL}api/orders/Invitation?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}


export async function getAllInvitationTotal() {
  const response = await fetch(`${API_URL}api/orders/totalInvitation`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function getAllInvitationTotal2() {
  const response = await fetch(`${API_URL}api/orders/total2`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function submitApprove(invoiceCode) {
  console.log(JSON.stringify(invoiceCode));
  const response = await fetch(`${API_URL}api/approval/approve`, {
    method: "POST",
    body: JSON.stringify(invoiceCode),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const tickets = result.data;

  return tickets;
}

export async function getAllPartnershipTotal() {
  const response = await fetch(`${API_URL}api/partnerships/total`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function getAllPartnerships(params) {
  const response = await fetch(
    `${API_URL}api/partnerships?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function processPartnership(payload) {
  const response = await fetch(`${API_URL}api/partnerships/process`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const partnership = result.data;

  return partnership;
}

export async function getAllReferral(params) {
  const response = await fetch(
    `${API_URL}api/referral?` + new URLSearchParams(params), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function getAllVoucher() {
  const response = await fetch(
    `${API_URL}api/vouchers/getall`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function submitEditVoucher(invoiceCode) {
  console.log(JSON.stringify(invoiceCode));
  
  const response = await fetch(`${API_URL}api/vouchers/edit`, {
    method: "POST",
    body: JSON.stringify(invoiceCode),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const settingWA = result.data;

  return settingWA;
}

export async function getAllInvitationCode() {
  const response = await fetch(
    `${API_URL}api/invitationcode/getall`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
    }
  );
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Something went wrong!");
  }

  const orders = result.data;

  return orders;
}

export async function submitEditInvitationCode(invoiceCode) {
  console.log(JSON.stringify(invoiceCode));
  
  const response = await fetch(`${API_URL}api/invitationcode/edit`, {
    method: "POST",
    body: JSON.stringify(invoiceCode),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const settingWA = result.data;

  return settingWA;
}

export async function submitAddInvitationCode (invoiceCode) {
  console.log(JSON.stringify(invoiceCode));
  
  const response = await fetch(`${API_URL}api/invitationcode/add`, {
    method: "POST",
    body: JSON.stringify(invoiceCode),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const settingWA = result.data;

  return settingWA;
}

export async function submitAddVoucher(invoiceCode) {
  console.log(JSON.stringify(invoiceCode));
  
  const response = await fetch(`${API_URL}api/vouchers/add`, {
    method: "POST",
    body: JSON.stringify(invoiceCode),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const settingWA = result.data;

  return settingWA;
}

export async function getSettingWablas() {
  const response = await fetch(`${API_URL}api/notif/setting-wablas`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  const settingWA = result.data;

  return settingWA;
}

export async function submitSettingWablas(invoiceCode) {
  console.log(JSON.stringify(invoiceCode));
  
  const response = await fetch(`${API_URL}api/notif/edit`, {
    method: "POST",
    body: JSON.stringify(invoiceCode),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const settingWA = result.data;

  return settingWA;
}

export async function getCopywriting() {
  const response = await fetch(`${API_URL}api/copywritings`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();

  const settingCW = result.data;

  return settingCW;
}

export async function importExcel(array){
  console.log(JSON.stringify(array));
  const response = await fetch(`${API_URL}api/import/invitations`, {
    method: "POST",
    body: JSON.stringify(array),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  });
  const result = await response.json();
  console.log("APIII " + result);
  if (!result.success) {
    console.log(result);
    throw new Error(result.message || "Something went wrong!");
  }
  const imports = result;

  return imports;
}