---
title: "Who are SWIFT?"
date: 2023-02-03
categories: 
  - "swift"
---

### Overview

SWIFT is an acronym for [Society for Worldwide Interbank Financial Telecommunications](https://www.swift.com/). Based in Belgium, it is a cooperative society who run a vast network allowing banks and financial institutions to transfer money and securities securely.

Its is important to note that SWIFT is neither a settlement network nor a clearing network, it is a messaging system which sends global payment orders to be processed by a clearing or settlement system.

<figure>

![SWIFT logo](/images/2023-02-03-who-are-swift/SWIFT_2021_logo.svg_.png "SWIFT logo")

<figcaption>

SWIFT logo

</figcaption>

</figure>

### SWIFTNet Network

SWIFTNet is the private, secure network used by banks and financial institutions for secure communication owned by SWIFT.

It provides a number of communication protocols which SWIFTNet members can avail of depending on their use-case.

- InterAct - used to exchange XML financial messages such as MX and ISO20022. It is suitable for when the financial messages are processed in almost realtime and an [RTGS](https://davegarry.com/what-is-real-time-gross-settlement/) is involved.

- Fin - used to exchange MT and ISO 15022 message formats. Fin is a store and forward messaging system.

- FileAct - used to exchange financial messages in batch. Financial messages are queued and then batch processed at a certain time. FileAct is not time sensitive.

### Financial Messaging Standards

SWIFT provides the standards for the syntax governing the structure of financial messaging used in the network.

Two of most important standards are ISO 15022, used for securities settlement and asset servicing messaging and [ISO 20022](https://davegarry.com/what-is-iso-20022/), used as a common standard for payment messaging world-wide.

### SWIFT Interfaces, Software and Services

SWIFT provides a number of interfaces that members can integrate with in order to transmit their financial messages:

- SWIFTNet Link - API to SWIFTNet. Used by all members to connect to SWIFTNet.

- SWIFTAlliance Gateway (SAG) - Software service that connects to SWIFTNet. Faciliates other financial integrating with SWIFTNet.

- Alliance Access (SAA) / Alliance Messaging Hub (AMH) - Messaging software which process all SWIFT message flows, such as Fin, FileAct, InterAct etc.
