---
title: "What is SEPA?"
date: 2025-08-05
categories: 
  - "sepa"
tags: 
  - "iso20022"
  - "payments"
  - "sepa"
---

<figure>

![What is SEPA?](/images/2025-08-05-what-is-sepa/image-1.png "What is SEPA?")

<figcaption>

What is SEPA?

</figcaption>

</figure>

SEPA stands for Single Euro Payments Area. It was created to simplify international euro transfers between EU member states. It allows you to send and receive payments in euros between two cross-border bank accounts in the eurozone. You can read more about Single Euro Payments Area from the ECB [here](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/index.en.html).

The Single Euro Payments Area now includes **41 countries** as of mid‑2025, including EU & EFTA members as well as EU-accession states like Moldova, Serbia, Montenegro, North Macedonia, and Albania.

It ensures that payments made across the eurozone are as simple as domestic transactions. This promotes economic integration and the mobility of people within the eurozone. A single market for payments services increases competition thereby reducing costs of moving money throughout the eurozone.

The primary instrument for making payments in the Single Euro Payments Area is the **[SEPA Credit Transfer (SCT)](https://davegarry.com/life-cycle-of-a-sepa-credit-transfer-sct-message/)**. Other instruments include **SEPA Instant Credit Transfer (SCT Inst)** and **[SEPA Direct Debit (SDD)](https://davegarry.com/life-cycle-of-a-sepa-direct-debit-sdd-message/)**:

In order to make an SCT Payment, you need:

- IBAN of the person you want to pay

- The bank receiving the payment must be a Single Euro Payments Area member

- The payment must be in euro

The Single Euro Payments Area is regulated by the European Payments Council (EPC).

## Table of SEPA Schemes

| **Scheme Type** | **Purpose** | **Processing Time** | **Refund Rights** | **Who Uses It** |
| --- | --- | --- | --- | --- |
| SCT | One-off transfer | ≤ 1 business day | N/A | Individuals & businesses |
| SCT Inst | On-demand instant pay | ≤ 10 seconds, any time | N/A | Supported by participating banks |
| SDD Core | Recurring direct debit | 1–2 days (with mandate) | 8‑week refund window | Consumer debit mandates |
| SDD B2B | Business direct debit | Similar to Core | No refund rights | Business-only mandates |

## Advantages of SEPA

<figure>

![Advantages of SEPA](/images/2025-08-05-what-is-sepa/sepa-advantages-6-1024x337.png "Advantages of SEPA")

<figcaption>

Advantages of SEPA

</figcaption>

</figure>

#### Four types of SEPA payment

There are four different types of SEPA payment. All of these payment types have their message definitions defined in the ISO 20022 framework.

##### SEPA Credit Transfer

Usually used for one-off transfers, while PSPs move payments from one bank account to another within the eurozone. For more information, please see [here](https://davegarry.com/life-cycle-of-a-sepa-credit-transfer-sct-message/)

##### SEPA Instant Credit Transfer

Unlike an SCT, an instant credit transfer can move money from one account to another in less than ten seconds.

##### SEPA Direct Debit Transfer Core

Used for subscription services as well as monthly items like utility bills. These are fundamentally different to credit transfers, as it is the recipient that requests the money transfer from the sender rather than the other way around. For more information, please see [here](https://davegarry.com/life-cycle-of-a-sepa-direct-debit-sdd-message/)

##### SEPA Direct Debit Business-to-Business

Available if you are collecting Direct Debit payments from other businesses
