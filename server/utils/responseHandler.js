const handleResponse = (res, success, message, data = null) => {
  if (success) {
    res.json({ success, message, data });
  } else {
    res.status(500).json({ success, message });
  }
};

module.exports = handleResponse;
