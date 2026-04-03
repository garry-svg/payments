---
title: "Life-cycle of a SEPA Credit Transfer (SCT) Message"
date: 2022-11-03
categories: 
  - "sepa"
tags: 
  - "payments"
  - "sct"
  - "sepa"
draft: true
---

A SEPA Credit Transfer (SCT) is a payment message which facilitates the transfer of funds from the sending or originating bank to the receiving or beneficiary bank.

They generally used for once off payments and clear within a day. To send/receive a SEPA Credit Transfer, the originating and beneficiary banks must be SEPA participants.

SCT Transfers are conducted in Euro currency and will include IBANs and BICs to identify debtor/creditor.

A SEPA Credit Transfer involves the exchange of a number of messages between a debtor, their bank, the clearing and settlement (CSM) exchange and the beneficiary bank.

This blog post will describe the flow of messages needed to complete a successful transaction.

![](/images/2022-11-03-life-cycle-of-a-sepa-credit-transfer-sct-message/svg-1-1024x456.png)

A payment initiation message initiates the SCT. Upon receipt of a pain.001 message, the debtor or originating bank will issue a Pacs.008, a payment and clearing message, which is sent to the Clearing and Settlement.

The pacs series of messages are interbank messages and used between banks to process payments between debtor and receiver.

Finally the beneficiary bank will send a pacs.002 message to the CSM. The pacs.002 indicates the success or failure of the financial transaction.

The following briefly describes the purpose of each of those messages described above:

- **_Pain.001.001.03_** This is the payment initiation message. Used to initiate the credit transfer. For more information on Pain.001, please see [here](https://davegarry.com/pain-001-message/)

- **_Pacs.008.001.02_** This message is used to transfer money between financial institutions. For more information on Pacs.008, please see [here](https://davegarry.com/pacs-008-message/)

- **_Pacs.002.001.01_** This message is a payment status report message. It is used to indicate whether a financial transaction was successful or not. For more information on Pacs.002, please see [here](https://davegarry.com/pacs-002-message/)

- _**Pain.002.001.03**_ This message is used to inform a customer whether their transaction was successful or not. For more information on Pain.002, please see [here](https://davegarry.com/pain-002-message/)
