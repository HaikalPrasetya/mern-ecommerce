const BACKEND_URL = "http://localhost:8000";

export const login = async (formInputs) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInputs),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error("Login Failed");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (formData) => {
  console.log(formData);
  try {
    const response = await fetch(`${BACKEND_URL}/api/product/add`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/product`);
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/product/delete/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/product/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/product/update/${id}`, {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessagesFromUser = async () => {
  const response = await fetch(`${BACKEND_URL}/api/message`);
  const data = await response.json();
  return data;
};

export const getMessageById = async (id) => {
  const response = await fetch(`${BACKEND_URL}/api/message/${id}`);
  const data = await response.json();
  return data;
};

export const replyMessage = async (id, message) => {
  const response = await fetch(`${BACKEND_URL}/api/message/reply/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data;
};

export const getAllOrdersDetails = async () => {
  const response = await fetch(`${BACKEND_URL}/api/order`);
  const data = await response.json();
  return data;
};

export const updateOrderStatus = async (id, status = "dikirim") => {
  const response = await fetch(
    `${BACKEND_URL}/api/order/update-status-order/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  return data;
};
