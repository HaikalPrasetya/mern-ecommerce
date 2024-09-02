const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;
export const getLatestProducts = async () => {
  const response = await fetch(`${BACKEND_URL}/api/product/latest`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const getPopularProducts = async () => {
  const response = await fetch(`${BACKEND_URL}/api/product/popular`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${BACKEND_URL}/api/product/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const getMensProducts = async (queryParams) => {
  const query = new URLSearchParams();
  query.append("sortOptions", queryParams.sortOptions);
  query.append("increaseCard", queryParams.increaseCard);
  query.append("category", queryParams.category);
  query.append("price", queryParams.price);
  queryParams.sizes.forEach((size) => {
    query.append("sizes", size);
  });
  const response = await fetch(`${BACKEND_URL}/api/product/mens?${query}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const register = async (inputsData) => {
  const response = await fetch(`${BACKEND_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(inputsData),
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const login = async (inputsData) => {
  const response = await fetch(`${BACKEND_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(inputsData),
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const getMe = async () => {
  const response = await fetch(`${BACKEND_URL}/api/user/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const logout = async () => {
  const response = await fetch(`${BACKEND_URL}/api/user/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const addToCart = async (productId, size) => {
  const response = await fetch(
    `${BACKEND_URL}/api/product/addToCart/${productId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ size }),
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const getProductsInCart = async () => {
  const response = await fetch(`${BACKEND_URL}/api/product/myCart`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const removeProductFromMyCart = async (productId) => {
  const response = await fetch(
    `${BACKEND_URL}/api/user/remove-products/${productId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const updateQty = async (productId, quantity) => {
  const response = await fetch(
    `${BACKEND_URL}/api/user/update-qty/${productId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const getWishlistProducts = async (queryParams) => {
  const query = new URLSearchParams();
  query.append("sortOptions", queryParams.sortOptions);
  const response = await fetch(
    `${BACKEND_URL}/api/user/wishlistCollections?${query}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const updateWishlist = async (productId) => {
  const response = await fetch(
    `${BACKEND_URL}/api/user/wishlist/${productId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const sendMessageToAdmin = async (message) => {
  const response = await fetch(`${BACKEND_URL}/api/message/send`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const getNotifications = async () => {
  const response = await fetch(`${BACKEND_URL}/api/user/notifications`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const updateUser = async (updateData) => {
  const response = await fetch(`${BACKEND_URL}/api/user/update-user`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const updateProfilePic = async (formData) => {
  const response = await fetch(`${BACKEND_URL}/api/user/update-user`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const handlePaymentIntent = async (query) => {
  const response = await fetch(
    `${BACKEND_URL}/api/product/order/payment-intent`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const handleConfirmationPayment = async (data) => {
  const response = await fetch(
    `${BACKEND_URL}/api/product/confirmationPayment`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const responseBody = await response.json();
  return responseBody;
};

export const getMyOrdersDetails = async () => {
  const response = await fetch(`${BACKEND_URL}/api/order/my-orders`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};

export const completeOrderStatus = async (orderId) => {
  const response = await fetch(
    `${BACKEND_URL}/api/order/complete-order/${orderId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(response.message);
  }
  const data = await response.json();
  return data;
};
