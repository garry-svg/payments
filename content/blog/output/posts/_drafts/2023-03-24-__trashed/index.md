---
title: "Useful SEPA Terms"
date: 2023-03-24
draft: true
---

Originator - Debtor creates a credit transfer. Uses Originating Bank

Debtor - the party that pays.

Creditor - the party that receives.

Debtor Agent - the bank of the debtor

Creditor Agent - the bank of the creditor

Beneficiary - Creditor who is receiving payments. Uses Beneficiary Bank.

BIC - Bank Identifier Code

PACS - Payment, Clearing and Settlement

PAIN - Payment Initiation. Used by originators to send instructions to the bank and receive status reports from the bank

CAMT - Cash management. Used to inform the customer about his cash position as a result of the execution of his instructions or received payments. CAMT can be used by customers to cancel transactions. In the interbank space they are used to cancel orders or transactions but also to reply on cancellation requests.

Settlement date - The real movement of money happens only after clearing and settlement. The date where the funds transfer is done from the originator bank to the beneficiary bank.

Context is important; A Payment Originator/Initiator is a Debtor/Payor in a credit transfer, while that Payment Originator/ Initiator is a Creditor/Payee in a direct debit.

https://www2.swift.com/knowledgecentre/rest/v1/publications/stdsmt\_mt\_mx\_eq\_tbl/\_latest/stdsmt\_mt\_mx\_eq\_tbl.pdf?logDownload=true

**Category 1 - Customer Payments and Cheques**

| MT101 | Request for Transfer | Pain.001 | CustomerCreditTransferInitiation |
| --- | --- | --- | --- |
| MT 102   MT 102 STP | Multiple Customer Credit Transfer | pacs.008 | FIToFICustomerCreditTransfer |
| MT 103   MT 103 STP   MT 103 REMIT | Single Customer Credit Transfer | pacs.008 | FIToFICustomerCreditTransfer |
| MT 104 | Direct Debit | pacs.003 | FIToFICustomerDirectDebit |
| MT 104 | Request for Debit Transfer | pain.008 | CustomerDirectDebitInitiation |
| MT 107 | General Direct Debit Message | pacs.003 | FIToFICustomerDirectDebit |
| MT 192 | Request for Cancellation | camt.055 | CustomerPaymentCancellationRequest |
| MT 195 | Queries | camt.026 | UnableToApply |
| MT 195    | Queries |  |  |
|  |  |  |  |

![](/images/2023-03-24-__trashed/image.png)

https://www.clearstream.com/resource/blob/3231256/c7b135d8e7da6dfda223b8b02810b43d/c22033-intro-note-data.pdf
