---
title: "Pacs.008 Message"
date: 2023-02-13
categories: 
  - "iso-20022"
  - "iso20022"
  - "sepa"
---

The Pacs.008 message belongs to the Payment Clearing and Settlement family of messages. The Pacs messages are used within the bank to bank interface.

Pacs.008 is sent by the debtor agent to the creditor agent, directly or through other agents and/or a payment [clearing and settlement](https://davegarry.com/what-is-clearing-and-settlement/) system. It is used to move funds from a debtor account to a creditor account.

The actual movement of funds will only happen after the clearing and settlement process. Each pacs.008 will have a settlement date which is the date when the transfer will take place.

<figure>

![Pacs.008 message flow](/images/2023-02-13-pacs-008-message/pacs.008-1.png "Pacs.008 message flow")

<figcaption>

Pacs.008

</figcaption>

</figure>

The XML Schema and Message Definition Report can be found [here](https://www.iso20022.org/iso-20022-message-definitions?search=Pacs.008).

## Building blocks of Pacs.008 Message

The Pacs.008 message comprises of 3 blocks:

- GroupHeader - contain all the common characteristics of all transactions contained within the Pacs.008.

- CreditTransferTransactionInformation - set of elements providing information specific to the individual credit transfer(s).

- SupplementaryData - contains additional information that cannot be captured in CreditTransferTransactionInformation or GroupHeader blocks.
