---
title: "SEPA Credit Transfer in Detail"
date: 2023-04-18
categories: 
  - "iso20022"
  - "sct"
---

When a [SEPA Credit Transfer](https://davegarry.com/sepa-credit-transfer-overview/) the originator exchanges a series of messages with the beneficiary through the originating and beneficiary bank and CSM.

The following diagram indicates this flow of messages.

![SEPA Credit Transfer in detail](/images/2023-04-18-sepa-credit-transfer-in-detail/image-8-1024x543.png "SEPA Credit Transfer in detail")

## Customer to Bank Messages (PAIN)

A customer will send Payment initiation (Pain) message(s) to their bank to initiate a payment. Pain messages are customer to bank messages.

| **Message** | **Description** |
| --- | --- |
| pain.001 | This is the payment initiation message. Used to initiate the credit transfer. For more information see [here](https://davegarry.com/pain-001-message/) |
| pain.002 | This message is used to inform a customer whether their transaction was successful or not. For more information see [here](https://davegarry.com/pain-002-message/) |

## Cash Management Messages (CAMT)

Customers receive their cash management reports from banks using the Cash Management (CAMT) family of messages.

| **Message** | **Description** |
| --- | --- |
| Camt.052 | This message is the account report. It used to inform the customer of their account balances after a transaction. |
| Camt.053 | This message serves as the account statement. Additionally, it will include an opening and closing balance, along with the details of processed transactions. For more information see [here](https://davegarry.com/camt-053-message/) |
| Camt.054 | This message is used to inform a customer about a debit or credit on their account. For more information see [here](https://davegarry.com/camt-054-message/) |
| Camt.056 | This message is used by the originator bank to recall an SCT. For more information see [here](https://davegarry.com/camt-056-message/) |
| Camt.029 | This message is used by the beneficiary bank to inform the originator bank that their request to recall the SCT has been denied. For more information see [here](https://davegarry.com/camt-029-message/) |

## Interbank Messages (PACS)

Banks use Payment and Clearing messages (PACS) to settle and clear funds.

| **Message** | **Description** |
| --- | --- |
| Pacs.008 | This message facilitates the movement of funds from the originating bank to the beneficiary bank. For more information please see [here](https://davegarry.com/pacs-008-message/) |
| Pacs.002 | This message represents a payment status report message. For more information please see [here](https://davegarry.com/pacs-002-message/) |
| Pacs.004 | This message is used to undo a payment that has already been settled. It is issued by the beneficiary bank. In general, there are a number of reasons for this to occur, such as the account being previously closed at the beneficiary bank. Moreover, this message is also utilized to indicate that a recalled SCT has been successful. |
