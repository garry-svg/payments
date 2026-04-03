---
title: "Life-cycle of a SEPA Direct Debit (SDD) Message"
date: 2022-11-12
categories: 
  - "sepa"
tags: 
  - "iso20022"
  - "payments"
---

[SEPA](https://davegarry.com/what-is-sepa/) Direct Debit (SDD) is a Europe-wide Direct Debit system that allows merchants to collect euro payments from accounts. Regular payments, such as subscriptions and bills, use SDD (SEPA Direct Debits).

SDD works as follows: the merchant issues a mandate with all the details about the direct debit. Once the debtor agrees, the merchant pulls the payments on a regular basis, notifying them 14 days before the payment is due.

The merchant controls the entire payment process. They issue the SEPA Direct Debit mandates, they notify the customer and they are the ones to pull the payments whenever they are due.

![SEPA Direct Debit Payment Scheme](/images/2022-11-12-life-cycle-of-a-sepa-direct-debit-sdd-message/SDD-payment-scheme-1024x673.png "SEPA Direct Debit Payment Scheme")

The [European Payments Council](https://www.europeanpaymentscouncil.eu/) has created two SDD schemes, one designed primarily for consumers (SDD Core), one exclusively for businesses (SDD B2B).

- **SDD Core.** Designed primarily for consumers. Mandatory for all banks offering Euro-denominated Direct Debits

- **SDD B2B.** Optional scheme offered exclusively for business. Not all banks are able to offer it.

The following describes the flow of messages between debtor and creditor

![SEPA Direct Debit Message Flow](/images/2022-11-12-life-cycle-of-a-sepa-direct-debit-sdd-message/direct-debit.png "SEPA Direct Debit Message Flow")

- **Pain.002** - is a payment status report indicating acceptance or rejection of SEPA Direct Debit

- **Pacs.003** - a direct debit request posted by a client to a direct participant.

- **Pain.008** \-  direct debit initiation request.

- **Pacs.002** - Status Report message – is sent by an instructed agent to the previous party in the payment chain. It is used to inform this party about the positive or negative outcome of a payment instruction.
