---
title: "What is Cross-border Payments and Reporting Plus (CBPR+)"
date: 2023-07-07
---

CBPR+ is an acronym which stands for Cross-border payments and reporting plus. It defines how the [SWIFT](https://davegarry.com/who-are-swift/) network uses [ISO 20022](https://davegarry.com/what-is-iso-20022/) messages for cross-border payments and cash reporting.

ISO 20022 messages will replace MT ([ISO 15022](https://www.iso20022.org/welcome-iso-15022)) for cross-border payments. The ISO 20022 standard is the next generation of Swift instructions which will supersede the  
current MT standard.

## Rollout of Cross-border Payments and Reporting Plus

CBPR+ rollout has already started. SWIFT will facilitate translation from MT to MX and vice versa across a translation window that exists until November 2025. Mapping rules provide how MT messages are translated to Cross Border and Payments (CBPR+) messages and vice versa.

The rollout of CBPR+ is split into specific functional areas:

- Payment Transactions and Confirmation

- Account Statements and Advice

- Cash Management

- Cheques

- Interest, Fees and Charges

From March 2023, Swift will enable CBPR+ messages over the [FINplus](https://davegarry.com/who-are-swift/) service for the following:

- Category 1 - Customer Payments and Cheques. These are the MT1xx series of messages.

- Category 2 - Financial Institution Transfers. These are the MT2xx series of messages.

- Category 9 - Cash Management and Customer Status. These are the MT9xx series of messages.

After November 2025, MT1xx, MT2xx and MT9xx will become obsolete and will no longer will accepted on the SWIFT network.

![Cross-border payments and reporting plus](/images/2023-07-07-what-is-cross-border-payments-and-reporting-plus-cbpr/cbpr.png)

| **MT Message Type** | **CBPR+ ISO 20022 equivalent** | **Date** |
| --- | --- | --- |
| MT103 | pacs.008.001.08 | March 2023 |
| MT192 | camt.056.001.08 | March 2023 |
| MT200 | pacs.009.001.08 | March 2023 |
| MT202 | pacs.009.001.08 | March 2023 |
| MT210 | camt.057.001.06 | March 2023 |
| MT292 | camt.056.001.08 | March 2023 |
