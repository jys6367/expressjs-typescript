import { Router } from 'express';
const router = Router();

// Catch 404 and forward to error handler
router.use((req, res, next) => {
  res.send(404)
});

// Error handler
router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(500)
    .send(err.message)
});

export default router