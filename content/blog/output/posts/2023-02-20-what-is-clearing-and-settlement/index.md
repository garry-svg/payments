---
title: "What is Clearing And Settlement?"
date: 2023-02-20
categories: 
  - "iso20022"
  - "sepa"
---

## Introduction

Clearing and Settlement is the process that takes place once a commitment to make a payment is made and the activities that occur to ensure that that payment is fully completed.

The European Central Bank defines **clearing** as '[the process of transmitting, reconciling and, in some cases, confirming transfer orders prior to settlement, potentially including the netting of orders and the establishment of final positions for settlement](https://www.ecb.europa.eu/pub/pdf/other/glossaryrelatedtopaymentclearingandsettlementsystemsen.pdf)'

It defines **settlement** as '[the completion of a transaction or of processing with the aim of discharging participants’ obligations through the transfer of funds and/or securities. A settlement may be final or provisional.](https://www.ecb.europa.eu/pub/pdf/other/glossaryrelatedtopaymentclearingandsettlementsystemsen.pdf)'

When a payment is initiated, the sender’s bank submits payment instructions to an interbank clearing network. This clearing network aggregates all orders for transactions from that senders bank to other banks. It also aggregates all orders to and from other banks including the senders bank.

The clearing company is then able to net all of the orders; the net amount is moved to each bank. This is known as the final position. The transaction is now said to settled.

<figure>

![Clearing And Settlement](/images/2023-02-20-what-is-clearing-and-settlement/clearing-1024x389.png "Clearing And Settlement")

<figcaption>

Settlement and Clearing of SCT Payment

</figcaption>

</figure>

## What is a clearing house?

A clearing house acts as an intermediary between a buyer and seller in a financial market. It validates and finalises the transaction ensuring that the buyer and seller meet their financial obligations.

It is important to note that a clearing house will require its members provide collateral/margin deposits. This is done that in the event of a participant bank being unable to fulfil its obligations.

Examples of well-known clearing houses are EBA Clearing and The Clearing House.

## Who are direct/indirect participants?

Banks can join a clearing system as either direct or indirect participants. Direct participants have a direct connection to the CSM and exchange transactions directly with it. Indirect participants exchange transactions with direct participants who will make transactions on their behalf with the CSM.

Indirect participants open a correspondent bank account with direct participants in order to make/receive payments. Direct participants are responsible for collecting / depositing funds with their indirect participants.

The CSM acts as a single counter party for each direct participants. This means that the CSM assumes the risk in the event that one direct participant cannot fulfil its obligations.

## Types of CSMs

CSMs can vary in size. For example [EBA Clearing](https://davegarry.com/who-are-eba-clearing/) Step 2 is a Pan-European Automated Clearing House and is available throughout the Eurozone. Others are smaller, equensWorldline, offers CSM services to some but not all Eurozone countries.
