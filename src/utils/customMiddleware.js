const logger = require('../utils/logger');

const accessLog = (req, res, next) => {
  // logger.info('Info');
  // logger.debug('Debug');
  // logger.warn('Warn');
  // logger.error('Error');
  // logger.fatal('Fatal');
  const { method, path, ip, protocol, headers, query, params } = req;
  //   const log = {
  //     method,
  //     url: protocol + '://' + headers.host + path,
  //     ip: ip,
  //     query,
  //     params,
  //   };
  logger.info(
    `ACCESS LOG: [${method}] ${protocol}://${
      headers.host
    }${path} - ${ip}; QUERY:${JSON.stringify(query)}; PARAMS:${JSON.stringify(
      params,
    )}`,
  );
  //   console.log('ACCESS LOG: ' + log);
  next();
};

const errorLog = (err, req, res, next) => {
  const { method, path, ip, protocol, headers, query, params } = req;
  //   const log = {
  //     method,
  //     url: protocol + '://' + headers.host + path,
  //     ip: ip,
  //     query,
  //     params,
  //   };
  //   `ERROR LOG: [${method}] ${protocol}://${headers.host}${path} - ${ip}`,
  logger.error(
    `ERROR LOG: [${method}] ${protocol}://${
      headers.host
    }${path} - ${ip}; QUERY:${JSON.stringify(query)}; PARAMS:${JSON.stringify(
      params,
    )}; ERR: ${err}`,
  );

  // next(); // you can call either next or send a uniform error response
  res
    .status(500)
    .send({ status: 'server-error', error: err, message: err.message });
  //   res.response.fail({ status: 'server-error', error: err }, err.message);
};

module.exports = { accessLog, errorLog };
