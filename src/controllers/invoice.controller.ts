import { injectable } from "tsyringe";
import { Request, Response } from "express";

import { InvoiceService } from "../services/invoice.service";

@injectable()
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  async create(req: Request, res: Response) {
    const invoice = await this.invoiceService.create(req.body);
  
    return res.send(invoice);
  }

  async webhook(req: Request, res: Response) {
    const { id, status } = req.body.event.log.invoice;

    await this.invoiceService.updateByStarkWebhookId({
      starkWebhookId: id,
      status
    });

    return res.send();
  }
}
