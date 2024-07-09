import { Router } from "express";

import invoiceRouter from "./invoice.routes";

const router = Router();

router.use('/invoice', invoiceRouter)

export default router;
