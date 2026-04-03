---
title: "Camt.053 Message"
date: 2023-04-23
categories: 
  - "iso-20022"
---

The originator bank issues the [ISO 20022](https://davegarry.com/what-is-iso-20022/) camt.053 message to the originator.. It shows all of the transactions against the originator's bank account on a given day.

In addition to debits/credits, the camt.053 will contain an opening and closing balance. It is also known as BankToCustomerAccountReport

You can find the definition of the CAMT.053, along with its message definition report, [here](https://www.iso20022.org/iso-20022-message-definitions?search=camt.053)

## Building blocks of Camt.053

GroupHeader - this element is mandatory and contains the msg identifier and date and time the camt.053 was created.

![Camt.053 GroupHeader](/images/2023-04-23-camt-053-message/image-16.png "Camt.053 GroupHeader")

The GroupHeader contains the following elements:

- Message Identification - unique identifier of the message

- Creation Date and Time - creation date and time of the message

- Number of Transactions - total number of individual transactions

- Control Sum - sum of control amounts of all the transactions

- Authorisation - indicates authorisation status of the message

- From - indicate the financial institution which sent the account statement

- To - indicate the customer receiving the account statement.

Statement(s) - The statement is a repetitive element and represents each bank account for which a statement is provided. Each statement will contain a balance and entries.

![Camt.053 stmt](/images/2023-04-23-camt-053-message/image-17-443x1024.png "Camt.053 stmt")

The statement(s) will contain the following elements:

- Statement Identification - unique identifier for the message

- Start/End Date and Time - indicates the duration in which the statement applies.

- Frequency - indicates the frequency of the statement.

- Update Type - indicates the purpose of the statement

- Supplementary Data - indicates any additonal data provided

- EntryDetails - Provides information about individual transactions in the statement
