---
title: "Pacs.004 Message"
date: 2023-04-19
---

## Overview

The beneficiary bank uses the pacs.004 message to trigger the return of a settled payment. One possible reason for the return of a settled payment is that the beneficiary bank account no longer exists.

The pacs.004 message must identify the returned payment. The UETR (Unique End-to-end Transaction Reference) and the end-to-end-id identify the payment a pacs.004 refers to.

## Building Blocks of the Pacs.004

Like other payment messages in [ISO20022](https://davegarry.com/what-is-iso-20022/), the pacs.004 contains 2 main parts. You can find the definition of the pacs.004 schema and its message definition report [here](https://www.iso20022.org/iso-20022-message-definitions?search=pacs.004).

### GroupHeader

The GroupHeader will contain the set of characteristics that are common to all transactions contained in the pacs.004.

The most important of these is the MsgId which used to uniquely identify the message. It is mandatory and must be unique

![GroupHeader Pacs.004](/images/2023-04-19-pacs-004-message/image-9.png "GroupHeader Pacs.004")

## Transaction Information

The transaction information sections of the pacs.004 will contain all of the information used to identify the transactions that are being returned. There are a number of mandatory elements which must be present.

- RtrId - Unique identification, as assigned by an instructing party for an instructed party, to unambiguously identify the returned transaction.

- OrgnlEndToEndId - Unique identification, as assigned by the original initiating party, to unambiguously identify the original transaction

- OrgnlUETR - Universally unique identifier to provide the original end-to-end reference of a payment transaction

- OrgnlInstrId - Unique identification, as assigned by the original instructing party for the original instructed party, to unambiguously identify the original instruction.

![Transaction Pacs.004](/images/2023-04-19-pacs-004-message/image-10-779x1024.png "Transaction Pacs.004")
