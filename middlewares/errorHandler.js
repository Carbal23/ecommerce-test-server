const errorHandler = (err, req, res, next) => {
  console.error(err);

  const response = {
    success: false,
    status: err.statusCode || 500,
    message: err.message || "Error interno del servidor",
    code: err.code || "INTERNAL_SERVER_ERROR",
    details: [],
  };

  if (err.details && Array.isArray(err.details)) {
    response.details = err.details.map(e => ({
      field: e.path || e.field, 
      error: e.msg || e.error,
    }));
  }

  res.status(response.status).json(response);
};

export default errorHandler;