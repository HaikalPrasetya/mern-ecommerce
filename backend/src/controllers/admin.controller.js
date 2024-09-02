export const login = (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.USERNAME_ADMIN &&
    password === process.env.PASSWORD_ADMIN
  ) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ success: true });
};
