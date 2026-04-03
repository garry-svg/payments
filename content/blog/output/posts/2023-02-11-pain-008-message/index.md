---
title: "Pain.008 Message"
date: 2023-02-11
categories: 
  - "iso20022"
---

The Pain.008 message initiates a direct debit and is part of the ISO-20022 message format. It is used to request single or bulk collection(s) of funds from one or various debtor's account(s) for a creditor. It is sent by the initiating party to the forwarding agent or  
creditor agent.

Pain.008 is the initiation message for the [SDD](https://davegarry.com/life-cycle-of-a-sepa-direct-debit-sdd-message/) message flow. You can download the Pain.008 Message Definition Report and XML Schema from [here](https://www.iso20022.org/iso-20022-message-definitions?search=pain.008).

Pain.008 will contain one or more direct debit instructions.

## Building blocks of Pain.008

#### GroupHeader

A Pain.008 will contain a GroupHeader which contains the common characteristics of all individual transactions included in the message.

![Pain.008 GroupHeader](/images/2023-02-11-pain-008-message/image-2.png "Pain.008 GroupHeader")

The GroupHeader contains the following elements:

- Message Identification - unique identifier for the message

- Creation Date and Time - message creation date and time

- Number of Transactions - total number of individual payment transactions

- Control Sum - sum of control amounts of all the transactions within the message

- Initiating Party - initiating party that initiated the payment transaction

- Batch Booking - indicates whether the payments in the message should be booked as a batch or individually.

- Payment Category Purpose - category of the payment transactions

#### PaymentInformation

A Pain.008 will contain a PaymentInformation block which provides information on individual payment transactions within the message.

<figure>

![Pain.008 PaymentInformation](/images/2023-02-11-pain-008-message/image-5-368x1024.png "Pain.008 PaymentInformation")

<figcaption>

Payment Information

</figcaption>

</figure>

The PaymentInformation element will contain the following elements:

- Payment Information Identification - unique identifier for the payment information

- Payment Method - payment execution method i,e direct debit.

- Payment Type Information - provides additional details about the type of payment

- Requested Execution Date - provides requested date for the payment transaction execution.

- Debtor - party initiating the payment

- Creditor - party receiving the payment

- Amount - currency and monetary value of the transaction

- Remittance Information - provides additional information related to the payment
