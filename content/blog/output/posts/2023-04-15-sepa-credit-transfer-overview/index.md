---
title: "SEPA Credit Transfer Overview"
date: 2023-04-15
categories: 
  - "iso20022"
  - "sepa"
---

A SEPA Credit Transfer (SCT) is a payment instrument which facilitates the transfer of funds from the sending or originating bank to the receiving or beneficiary bank.

They generally used for once off payments and clear within a day. To send/receive a SEPA Credit Transfer, the originating and beneficiary banks must be [SEPA](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/index.en.html) participants.

Debtors and creditors use SCT Transfers conducted in Euro currency, which include IBANs and BICs for identification.

A SEPA Credit Transfer(SCT) involves the exchange of a number of messages between a debtor, their bank, the clearing and settlement ([CSM](https://davegarry.com/what-is-clearing-and-settlement/)) exchange and the beneficiary bank.

The SCT relies on 4 actors:

- Originator, i.e the person making the payment

- Originating bank, i.e the bank which contains the account of the originator

- Beneficiary, i.e. the person receiving the payment

- Beneficiary bank, i.e the bank which contains the account of the beneficiary

![SEPA Credit Transfer](/images/2023-04-15-sepa-credit-transfer-overview/image-3.png "SEPA Credit Transfer")

The originator and beneficiary use different ISO 20022 messages to initiate and complete the credit transfer. These messages are categorised as follows:

- Payment Initiation (Pain). Sent/received between the customer and their respective banks.

- Payment Clearing and Settlement (Pacs). Sent/received between the originating/beneficiary banks and the [CSM](https://davegarry.com/what-is-clearing-and-settlement/).

- Cash Management (Camt). Sent to the originator/beneficiary to inform them of their account balances as a result of payment transaction.
