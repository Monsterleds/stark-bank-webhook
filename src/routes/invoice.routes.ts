import { Router } from "express";
import { container } from "tsyringe";

import { InvoiceController } from "../controllers/invoice.controller";
import { CreateInvoiceDTO } from "../controllers/dtos/invoice.dto";
import { validateDTO } from "../utils/validate";

const invoiceRouter = Router();

const invoiceController = container.resolve(InvoiceController);

invoiceRouter.post("/",
  (req, res, next) => validateDTO(req, res, next, CreateInvoiceDTO),
  (req, res) => invoiceController.create(req, res)
);

// adicionar alguma segurança?
invoiceRouter.post("/webhook",
  (req, res) => invoiceController.webhook(req, res)
);

export default invoiceRouter;
