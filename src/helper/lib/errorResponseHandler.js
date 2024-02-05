const errorCodes = require("./errorCodes"); // Import error codes module

const errorResponseHandler = (res, err) => {
  // Define getErrData function within errorResponseHandler
  function getErrData(err) {
    if (err) {
      if (err.response && err.response.data) {
        return err.response.data.data || err.response.data;
      } else if (err.data) {
        return err.data.errors || err.data;
      } else if (err.errors) {
        return err.errors;
      }
    }
    return {};
  }

  // Define getErrError function within errorResponseHandler
  function getErrError(err) {
    if (err) {
      let errorData = {};
      if (err.error) {
        errorData = err.error;
      } else if (err.response && err.response.error) {
        errorData = err.response.error;
      }

      if (errorCodes[errorData.code]) {
        errorData = { ...errorData, ...errorCodes[errorData.code] };
      }

      return errorData;
    }
    return {};
  }

  const {
    status = 500, // Set a default status code of 500 if err.status is undefined
    title = null,
    request = {},
    statusText = null,
    message,
  } = err.response ? err.response : err;
  const instance =
    request && request.path !== undefined ? request.path : null;
  let errorTitle;

  const data = getErrData(err);
  const error = getErrError(err);

  if (error.code === 400) {
    // Handle the 400 status code specifically
    res.status(400).json({
      title: message || "Bad Request",
      instance,
      ...data,
      error,
    });
  } else {
    // Handle other status codes here
    switch (status) {
      case 401:
        res.status(401).json({
          title: title || "Unauthorized",
          instance,
          ...data,
          error,
        });
        break;
      case 403:
        res.status(403).json({
          title: message || "Forbidden",
          instance,
          error,
        });
        break;
      case 404:
        res.status(404).json({
          title: title || "Not Found",
          instance,
          ...data,
          error,
        });
        break;
      case 409:
        res.status(409).json({
          title: title || "Conflict",
          instance,
          ...data,
          error,
        });
        break;
      case 503:
        errorTitle =
          title ||
          statusText ||
          (err.source !== undefined
            ? `${err.source} unavailable`
            : "Service unavailable");
        res.status(503).json({
          title: errorTitle,
          instance,
          error,
        });
        break;
      default:
        errorTitle =
          title ||
          statusText ||
          (err.source !== undefined
            ? `${err.source} Internal Error`
            : "Internal Server Error");
        res.status(500).json({ // Set the status code to 500 for undefined status codes
          title: errorTitle,
          instance,
          ...data,
          error,
        });
    }
  }
};

module.exports = errorResponseHandler;
