---
title: "Camt.056 Message"
date: 2023-04-21
categories: 
  - "iso20022"
  - "sepa"
---

The originating bank sends the camt.056 message to the beneficiary bank to cancel a [credit transfer](https://davegarry.com/sepa-credit-transfer-overview/).

You can find the definition of the camt.056 schema and its message definition report [here](https://www.iso20022.org/iso-20022-message-definitions?search=camt.056)

One of the most common reasons for issuing a camt.056 is a duplicate payment.

![Camt.056 Message](/images/2023-04-21-camt-056-message/image-13.png "Camt.056 Message")

The camt.056 requires a response from the beneficiary bank within 15 working days.

This response can be:

1. Positive response to the recall. In this case a pacs.004 is sent by the beneficiary to the originator and the money is credited to the originator

3. Negative response to the recall. In this case a camt.029 is sent to the debtor bank. In this case stays with the beneficiary.

## Building blocks of Camt.056

The Camt.056 will contain the following elements:

- Message Identification: A unique identifier assigned to the message.

- Related Reference: Reference to a related message or transaction.

- Payment Instruction Details: Details about the payment instruction being transmitted.

- Payment Transaction Information: Information about individual payment transactions, including amounts, dates, and parties involved.

- Settlement Details: Information related to the settlement of the payment, such as clearing and settlement system details.

- Remittance Information: Information about the remittance advice or additional payment details.

- Regulatory Reporting Information: Information required for regulatory reporting purposes.

- Additional Information: Any additional relevant information associated with the payment message.

- Supplementary Data: Optional additional data included with the message.
