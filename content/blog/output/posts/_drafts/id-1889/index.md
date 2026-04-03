---
title: "Mapping an MT 103 to Pac.008"
draft: true
---

This post describes how an MT 103 international payment from the ISO 15022 standard is mapped to a [Pacs.008](https://davegarry.com/pacs-008-message/) credit transfer from the [ISO 20022](https://davegarry.com/what-is-iso-20022/) standard.

## Overview of MT 103

The MT 103 is belongs to the [Category 1 - Customer Payments and Cheques](https://www2.swift.com/knowledgecentre/publications/us1m_20230720/1.0) family of messages for the ISO 15022 standard. An MT 103 is used to exchange a customer credit transfer.

The following is an example of an MT 103 message:

![MT 103 sample message](/images/id-1889/image.png "MT 103 sample message")

The following table describes what type of data each field contains:

| **Field** | **Description** |
| --- | --- |
| 20 | Sender's Reference |
| 13C | Time Indication |
| 23B | Bank Operation Code |
| 23E | Instruction Code |
| 26T | Transaction Type Code |
| 32A | Value Date/Currency/Interbank Settled Amount |
| 33B | Currency/Instructed Amount |
| 36 | Exchange Rate |
| 50a | Ordering Customer |
| 51A | Sending Institution |
| 52a | Ordering Institution |
| 53a | Sender's Correspondent |
| 54a | Receiver's Correspondent |
| 55a | Third Reimbursement Institution |
| 56a | Intermediary Institution |
| 57a | Account With Institution |
| 59a | Beneficiary Customer |
| 70 | Remittance Information |
| 71A | Details of Charges |
| 71F | Sender's Charges |
| 71G | Receiver's Charges |
| 72 | Sender to Receiver Information |
| 77B | Regulatory Reporting |

## How to map an MT 103 to a Pacs.008
