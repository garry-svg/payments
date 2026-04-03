---
title: "Pain.002 Message"
date: 2023-02-15
categories: 
  - "iso20022"
  - "sepa"
---

The Pain.002 message is a status message and is part of the Payment Initiation family of messages within [ISO 20022](https://davegarry.com/what-is-iso-20022/).

It is sent by an instructed agent to the previous party in the payment chain. It is used to inform the party about the success/failure of payment request.

The definition of the pain.002 schema and its message definition report can be found [here](https://www.iso20022.org/iso-20022-message-definitions?search=pain.002)

![pain.002 overview](/images/2023-02-15-pain-002-message/image-3.png "pain.002 overview")

## Building blocks of Pain.002

GroupHeader - contains all the common characteristics of all transactions contained within the Pain.002. The GroupHeader will contain the following elements:

- Message Id: A unique identifier assigned to the message group or batch.

- Creation Date and Time: The date and time when the message was created.

- Number of Transactions: The total count of individual transactions included in the message.

- Initiating Party: Information about the party initiating the message such as their name, address, and account details.

- Message Id of the original Pain.001 Message: If the pain.002 message is a response to a pain.001 message, it may contain the message identification of the original pain.001 message to which it refers.

OriginalGroupInformationAndStatus - Original group information concerning the group of transactions, to which the status report message refers to. The OriginalGroupInformationAndStatus will contain the following elements:

- Original Message Identification: The unique identifier assigned to the original message.

- Original Creation Date and Time: The date and time when the original message.

- Number of Transactions: The total count of individual transactions included in the original message.

- Initiating Party: Information about the party who initiated the original message, such as their name, address, and account details.

- Original Message Name Identification: The identification of the original message, such as pain.001, camt.056, or other relevant message types.

OriginalPaymentInformationAndStatus - Information concerning the original payment information, to which the status report message refers.

- Original Payment Information: Includes details about the original payment, such as the payment amount, currency, payment date, payment method, and other relevant payment-related information.

- Payment Status: Indicates the status of the original payment, providing information on whether the payment was successfully processed, partially processed, or rejected.

- Transaction Information: Provides additional details about the specific transaction within the original payment, such as a unique identifier for the transaction, the debtor and creditor involved, and any related payment references.
