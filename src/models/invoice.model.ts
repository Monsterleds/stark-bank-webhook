import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export type InvoiceStatus = 'created' | 'canceled' | 'paid' | 'voided' | 'overdue' | 'expired';

@Entity('Invoice')
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 20 })
    taxId: string;

    @Column({ type: 'float' })
    amount: number;

    @Column({ default: 'created' })
    status: InvoiceStatus;
    
    @Column()
    starkWebhookId: string;
}