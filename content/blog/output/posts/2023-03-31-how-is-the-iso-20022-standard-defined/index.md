---
title: "How is the ISO 20022 standard defined?"
date: 2023-03-31
categories: 
  - "iso20022"
---

The financial industry uses different terms and different message formats across to describe payment processes. This leads to barriers in facilitating payment integration. ISO 20022 aims to define common payment business processes and consistent message standards to ensure financial institutions have a common understanding of payment information exchanged. The ISO 20022 standard is defined as individual 3 layers:

- Business Concepts

- Logical models

- Syntax

#### Business Concepts

The ISO 20022 standard is defined using a [business model](https://www.iso20022.org/iso20022-repository/business-model) which describes the roles, actors and processes that make up the flow of payment information. This business model will define concepts such as debtor, creditor, debtor agent, creditor agent, credit transfer and direct debit.

#### Logical Models

The logical model describes all of the parts needed to perform a business activity such as a credit transfer. Its independent of syntax. The following diagram shows a simplified data model for a subset of the CreditTransferTransactionInformation.

![ISO 20022 logical model](/images/2023-03-31-how-is-the-iso-20022-standard-defined/image-8.png "ISO 20022 logical model")

#### Syntax

To generate the physical syntax, we use the logical model. The physical syntax of ISO 20022 is XML. An example of XML syntax within ISO 20022 is the [pain.00](https://davegarry.com/pain-001-message/)1 XML message.

The [dictionary](https://www.iso20022.org/understanding-data-dictionary) defines all the terms used in ISO 20022. This removes any ambiguity to the different terms used in the payments industry.
