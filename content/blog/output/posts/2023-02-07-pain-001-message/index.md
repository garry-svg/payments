---
title: "Pain.001 Message"
date: 2023-02-07
categories: 
  - "iso20022"
---

### Overview

The Pain.001 message is initiates a [SEPA Credit Transfer](https://davegarry.com/sepa-credit-transfer-overview/). It is sent by an initiating party to the debtor/forwarding agent to request the transfer of money from debtor to creditor. It is the initiation message for the SCT flow.

Like all, ISO-20022 messages, Pain.001 is specified in XML.

The XML Schema and Message Definition Report can be downloaded [here](https://www.iso20022.org/iso-20022-message-definitions).

The Message Definition Report will additionally specify business rules governing the relationships between elements in the pain.001.

Pain.001 will contain one or more credit transfer instructions.

### Building blocks of Pain.001 message

#### GroupHeader

The GroupHeader block will contain all the common characteristics of all transactions contained within the Pain.001.

![GroupHeader pain.001](/images/2023-02-07-pain-001-message/image.png "GroupHeader pain.001")

The most elements within the GroupHeader are:

- MsgId - This is a unique identifier identifying all payments within the message.

- CreDtTm - this indicates the creation date and time of the message.

- NbOfTxs - this indicates the number of transactions contained within the message.

#### PaymentInformation

The PaymentInformation block will contain all the common characteristics that apply to the debit side of the payment transactions included in the credit transfer

![PaymentInformation pain.001](/images/2023-02-07-pain-001-message/image-1-431x1024.png "PaymentInformation pain.001")

The PaymentInformation block will contain information such as:

- Debtor Agent - contains information about the financial agent acting on behalf of the debtor

- Creditor Agent - contains information about the financial agent acting on behalf of the creditor.

- Amount - specifies the value of this payment.

- Payment Identification - unique identifier used to identify the payment transaction.

- Remittance Information - contains additional information regarding the purpose of the payment

- Payment Method - indicates the payment type such as Credit transfer or direct debit.

- Payment Type Information - provides details about the purpose of the payment

#### SupplementaryData

The supplementary data element contains additional information not captured in PaymentInformation or GroupHeader blocks. It can include non-standardised information related to the payment.
