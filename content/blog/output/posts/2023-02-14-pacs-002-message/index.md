---
title: "Pacs.002 Message"
date: 2023-02-14
categories: 
  - "iso20022"
---

The Pacs.002 message is a payment status report message used in [ISO 20022](https://davegarry.com/what-is-iso-20022/). It is sent by an instructed agent to the previous party in the payment chain indicating the status of the payment instruction. It will indicate whether a payment was successful or not.

The Pacs.002 can provide status information on:

- Credit Transfer instruction

- Direct Debit instruction

- Cancellation requests.

The XML Schema and Message Definition Report for Pacs.002 can be downloaded from [here](https://www.iso20022.org/iso-20022-message-definitions).

<figure>

![Pacs.002 message](/images/2023-02-14-pacs-002-message/pacs2-703x1024.png "Pacs.002 message")

<figcaption>

pacs.002

</figcaption>

</figure>

## Building blocks of Pacs.002 Message

#### GroupHeader

Set of characteristics shared by all transactions in the status report. The GroupHeader contains the following elements:

- Message Identification: A unique identifier assigned to the message group or batch for tracking and referencing purposes.

- Creation Date and Time: The date and time when the message group or batch was created.

- Number of Transactions: The total count of individual transactions included in the message group or batch

- Initiating Party: Information about the party initiating the message group or batch, such as their name, address, and account details.

- Message Identification of the original pacs.008 message

#### OriginalGroupInformationAndStatus

Original group information concerning the group of transactions, to which the status report message refers to. It contains the following elements:

- Original Message Identification: The unique identifier assigned to the original message.

- Original Creation Date and Time: The date and time when the original message was created.

- Number of Transactions: The total count of individual transactions included in the original message.

- Original Initiating Party: Information about the party who initiated the original message group or batch, such as their name, address, and account details.

- Original Message Name Identification: The identification of the original message, such as pacs.008 or other relevant message types.

- Status: The status of the original message indicating whether it was successfully processed, partially processed, or encountered any errors or rejections.

#### TransactionInformationAndStatus

Information concerning the original transactions, to which the status report message refers. It contains the following elements:

- Transaction Identification: A unique identifier assigned to the transaction.

- Payment Information: Details about the payment, such as the payment amount, currency, payment date, and other relevant payment-related information.

- Status: The status of the transaction, indicating whether it was successfully processed, partially processed, or encountered any errors or rejections.

- Status Reason Information: Additional information regarding the status of the transaction, providing more context or explanation for the status code or status description.
