export const loggerMiddleware = (req, res, next) => {
  console.log(req.method);
  next();
};
