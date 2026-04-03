---
title: "Pacs.003 Message"
date: 2023-02-16
categories: 
  - "iso20022"
  - "sepa"
---

The creditor agent sends the Pacs.003 message to the debtor agent, either directly or through other agents and/or a payment clearing and settlement system.

The Pacs.003 is a financial institution to financial institution customer direct debit message. It can contain 1 or many customer direct debit instructions.

A creditor bank will initiate the Pacs.003 in response to a [Pain.008](https://davegarry.com/pain-008-message/) direct debit initiation request to collect funds from a debtor account for a creditor. You can find the XML Schema and Message Definition Report [here](https://www.iso20022.org/iso-20022-message-definitions?search=Pacs.003).

<figure>

![Pacs.003 overview](/images/2023-02-16-pacs-003-message/image-6.png "Pacs.003 overview")

<figcaption>

Pacs.003 flow

</figcaption>

</figure>

The Pacs.003 will contain:

## GroupHeader

  
All transactions in the message share a set of common elements within the GroupHeader. It will contain the following elements:

- Message Identification - A unique identifier assigned to the entire group of payment cancellations within the message

- Creation Date and Time - Date and time of the creation of the payment cancellation message

- Number of Transactions - The total count of payment cancellation instructions included in the group

- Original Group Identification - The identification of the original group of payment instructions to which the cancellation instructions belong. It links the cancellation instructions to the original payment instructions

- Original Message Identification: The identification of the original payment instruction within the original group to be cancelled. It specifies the specific payment instruction targeted for cancellation

## DirectDebitTransactionInformation

The DirectDebitTransactionInformation will contain information about each direct debit transaction.

- Mandate Identification: A unique identifier assigned to the direct debit mandate authorizing the payment that is being canceled.

- Creditor Scheme Identification: Specifies the scheme or system used for the direct debit payment

- Original Debtor Account: Debtor account which the original direct debit payment debited

- Original Creditor Account: Creditor account which the original direct debit payment credited.

- Original Payment Information: The cancellation of the original direct debit payment includes the payment amount, payment date, and any additional payment details.

- Cancellation Status: Indicates the status of the cancellation instruction, such as accepted, rejected, or pending

- Cancellation Reason Information: Provides additional details or reasons for the cancellation status
