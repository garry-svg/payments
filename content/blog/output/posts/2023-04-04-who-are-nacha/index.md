---
title: "Who are Nacha?"
date: 2023-04-04
categories: 
  - "ach"
---

[![Nacha logo](/images/2023-04-04-who-are-nacha/nacha.png "Nacha logo")](https://www.nacha.org)

[Nacha](https://www.nacha.org/) govern the [ACH](https://davegarry.com/what-is-the-ach-network/) (Automated Clearing House) payments network in United States. It stands for National Automated Clearing House Association.

It also manages the Operating Rules for ACH Payments. These define the rules and responsibility of any participants using the ACH network. However, the ACH operators, Federal Reserve, and the Electronic Payment Network run the ACH network, not Nacha.

Some of Nacha's responsibilities are:

- Promote the ACH network

- Enforcing the rules governing the ACH network

- Steering the evolution of the ACH network in the evolving payments world

## What are the Nacha operating rules?

Each participant of the ACH network must adhere to [rules](https://www.nacha.org/rules/operating-rules) if it wants to accept ACH payments. These rules are broad and participants of the ACH network need to stay up to date to ensure compliance. Participants can be fined or removed from the ACH network in the event of non-compliance. You can obtain a copy of the rules [here](https://www.nacha.org/store).

### Examples of Nacha operating rules

The following are examples of Nacha operating rules around ACH direct debit

- Ensure customer information such as bank account numbers, social security numbers, billing addresses are secure.

- Customers must clearly authorise any ACH direct debits.

- Any change to amount of the ACH direct debits needs to be communicted clearly to the customer

- Cancelled ACH direct debits need to be completed in a timely manner.

## What is Nacha file format?

A Nacha file is a set of ACH instructions used to initiate a payment over the ACH network. A record (line) in a Nacha file must be 94 characters in length.

Fields that begin and end at certain positions make up each record. These fields contains important information such as account number and routing number. Additionally each record must follow a certain order.

![Nacha file format](/images/2023-04-04-who-are-nacha/nacha_formatted_file_screenshot.gif "Nacha file format")

Although banks mostly use Nacha files for payment initiation, they can also use the file format for a wide variety of other purposes such as reversals or returns.
