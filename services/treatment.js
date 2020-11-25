const response = (res) => {
  try {
    return {
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    return {
      status: err.status || 500,
      message: 'Internal server error',
      error: err.message,
    };
  }
};

const error = (err) => {
  try {
    return {
      status: err.response.status,
      message: err.response.statusText,
      error: err.response.data,
    };
  } catch (err) {
    return {
      status: err.status || 500,
      message: 'Internal server error',
      error: err.message,
    };
  }
};

export { response, error };
