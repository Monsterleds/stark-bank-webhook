import { Router } from "express";
import { container } from "tsyringe";
import cron from "node-cron";

import { InvoiceController } from "../controllers/invoice.controller";

const invoiceRouter = Router();

const invoiceController = container.resolve(InvoiceController);

cron.schedule("* */3 * * *", () => invoiceController.createBetween8And12());

// adicionar alguma segurança?
invoiceRouter.post("/webhook",
  (req, res) => invoiceController.webhook(req, res)
);

export default invoiceRouter;
