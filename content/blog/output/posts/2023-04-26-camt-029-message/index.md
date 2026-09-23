---
title: "camt.029 Explained: Resolution of Investigation and Recall Responses"
date: 2023-04-26
description: "Explore the ISO 20022 camt.029 Resolution of Investigation message. Learn how banks resolve recalls under EPC SCT rules, SEPA reason codes, and XML structures."
categories: 
  - "iso20022"
  - "sepa"
---

The **camt.029** message ('RsltnOfInvstgtn' — *Resolution of Investigation*) is an ISO 20022 interbank message sent by an instructed financial institution (such as a beneficiary bank) to report the outcome, status, or conclusion of an investigation to the instructing institution.

A common simplification in payments engineering is describing camt.029 exclusively as a "negative response to a recall." While camt.029 is indeed used in schemes like [SEPA Credit Transfer (SCT)](/sepa-credit-transfer-overview/) to inform an originator bank that a payment recall has been denied, the base ISO 20022 definition is far broader. **camt.029 is a multi-purpose investigation resolution message** that resolves payment cancellations, payment modifications, claims for non-receipt, and account statement queries.

---

## ISO 20022 Base Standard vs Scheme Implementations

Under the ISO 20022 standard, `camt.029` provides structured resolution blocks for various operational exceptions:

* **Cancellation Details (`<CxlDtls>`):** Resolves a [camt.056 Payment Cancellation Request](/camt-056-message/). In the general standard, transaction status (`<TxCxlSts>`) is not limited to rejection (`RJCR`); it can also communicate pending investigation (`PDCR`) or accepted cancellation (`ACCR`) in workflows where cancellation does not require an independent funds return message.
* **Modification Details (`<ModDtls>`):** Resolves an interbank payment modification request ([`camt.087`](https://www.iso20022.org/iso-20022-message-definitions) *RequestToModifyPayment*). Note that `camt.055` is a customer-to-bank cancellation request (*CustomerPaymentCancellationRequest*), whereas modification resolution between banks specifically relates to `camt.087`.
* **Claim Non-Receipt Details (`<ClmNonRctDtls>`):** Responds to inquiries where a creditor claims funds were never received (`camt.027`).
* **Statement Details (`<StmtDtls>`):** Provides resolution entries for statement or balance investigations.

---

## Concrete Scheme Example: EPC SEPA Credit Transfer (SCT)

In the European Payments Council (EPC) SEPA Credit Transfer scheme, exception handling is organized into formal datasets defined in the [SEPA Credit Transfer Scheme Inter-PSP Implementation Guidelines (EPC115-06)](https://www.europeanpaymentscouncil.eu/document-library/implementation-guidelines/sepa-credit-transfer-inter-psp-implementation-1):

* **Dataset DS-06 (Response to a Recall of a SEPA Credit Transfer):** Covers the response to a bank-initiated Recall (`DS-05`). It includes both positive and negative response paths:
  * **Positive Response:** Executed via [`pacs.004`](/pacs-004-message/) (Payment Return) carrying return reason code `FOCR` (*Following Cancellation Request*), which transfers the funds back.
  * **Negative Response:** Executed via `camt.029` (`camt.029.001.09`), communicating why the recall was rejected without moving funds.
* **Dataset DS-08 (Response to the Request for Recall by the Originator - RFRO):** Covers the response to a customer-initiated RFRO (`DS-07`). Like DS-06, it encompasses both outcomes:
  * **Positive Response:** Executed via `pacs.004` (`FOCR`).
  * **Negative Response:** Executed via `camt.029` (`camt.029.001.09`).

Neither DS-06 nor DS-08 is defined solely as a negative response dataset; both encompass the entire response framework, where `pacs.004` represents the positive path and `camt.029` represents the negative path.

```
                      +-------------------+
                      |  camt.056 Request |
                      | (Originator Bank) |
                      +-------------------+
                                |
               +----------------+----------------+
               |                                 |
         Recall Accepted                  Recall Rejected
         (DS-06 / DS-08)                  (DS-06 / DS-08)
               |                                 |
               v                                 v
      +-----------------+               +-----------------+
      |    pacs.004     |               |    camt.029     |
      | (Payment Return)|               | (Resolution of  |
      |   Reason: FOCR  |               |  Investigation) |
      +-----------------+               +-----------------+
      [Funds Transferred]               [No Funds Moved]
```

### Common SEPA Negative Recall Reason Codes:
* `CUST` (Customer Refusal): The beneficiary refused to authorize debiting their account.
* `AC04` (Closed Account Number): The beneficiary account has been closed.
* `LEGL` (Legal Reasons): Regulatory, compliance, or court-mandated blocks prevent funds release.
* `NOOR` (No Original Transaction Received): The beneficiary bank has no record of the referenced credit transfer.
* `NOAS` (No Answer From Customer): The beneficiary did not respond to the bank's contact attempts within the 15 Banking Business Days window.
* `AM04` (Insufficient Funds): Account balance is insufficient to cover the recall amount.

---

## Key Structural Elements (ISO 20022 camt.029.001.09)

In the SEPA Credit Transfer Inter-PSP Implementation Guidelines (EPC115-06), the applicable message version for interbank investigation resolution is **`camt.029.001.09`**. The root element `<RsltnOfInvstgtn>` contains:

### 1. Case Assignment (`<Assgnmt>`)
Identifies the resolution routing:
* `<Id>`: Unique assignment reference generated by the resolving bank.
* `<Assgnr>`: The responding bank (Beneficiary Bank) identifying itself via `<FinInstnId><BICFI>`.
* `<Assgne>`: The inquiring bank (Originator Bank) receiving the resolution.
* `<CreDtTm>`: Creation timestamp.

### 2. Status (`<Sts>`)
A mandatory high-level investigation status indicator:
* `<Conf>`: Carries an external confirmation code (e.g., `RJCR` for Rejected Cancellation Request).

### 3. Cancellation Details (`<CxlDtls>`)
When resolving an SCT Recall or RFRO, the `<TxInfAndSts>` repeating block under `<CxlDtls>` contains:
* `<CxlStsId>`: Unique cancellation status identifier.
* `<OrgnlGrpInf>`: Links back to the original message identifiers (`<OrgnlMsgId>`, `<OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>`).
* `<OrgnlEndToEndId>`: Original end-to-end identifier from the customer instruction.
* `<OrgnlTxId>`: Original transaction reference.
* `<OrgnlUETR>`: The Unique End-to-End Transaction Reference (UUIDv4) of the original payment.
* `<TxCxlSts>`: Individual transaction cancellation status (`RJCR` — Rejected Cancellation).
* `<CxlStsRsnInf>`: Contains the rejection reason code (`<Rsn><Cd>CUST</Cd></Rsn>`).
* `<OrgnlTxRef>`: Optional snapshot of the original payment instruction (debtor, creditor, amounts, and accounts) to facilitate reconciliation.

---

## XML Example (camt.029.001.09)

Below is a synthetic `camt.029.001.09` XML document rejecting an SCT recall request due to customer refusal (`CUST`), structured in accordance with EPC115-06 Inter-PSP Implementation Guidelines.

> Illustrative XML example using the stated message version. Not independently XSD-validated; verify against the applicable schema and EPC implementation guidelines before use.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.029.001.09">
    <RsltnOfInvstgtn>
        <Assgnmt>
            <Id>ASSIGN-2026-0923-001</Id>
            <Assgnr>
                <Agt>
                    <FinInstnId>
                        <BICFI>BNPAFRPPXXX</BICFI>
                    </FinInstnId>
                </Agt>
            </Assgnr>
            <Assgne>
                <Agt>
                    <FinInstnId>
                        <BICFI>DBEUMM21XXX</BICFI>
                    </FinInstnId>
                </Agt>
            </Assgne>
            <CreDtTm>2026-09-23T11:00:00Z</CreDtTm>
        </Assgnmt>
        <Sts>
            <Conf>RJCR</Conf>
        </Sts>
        <CxlDtls>
            <TxInfAndSts>
                <CxlStsId>CXLSTS-2026-0001</CxlStsId>
                <OrgnlGrpInf>
                    <OrgnlMsgId>MSG-20260920-0042</OrgnlMsgId>
                    <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>
                </OrgnlGrpInf>
                <OrgnlEndToEndId>E2E-2026-987654</OrgnlEndToEndId>
                <OrgnlTxId>TX-2026-0001</OrgnlTxId>
                <OrgnlUETR>93ce3143-6050-4ff6-8c46-95b6c86e0c03</OrgnlUETR>
                <TxCxlSts>RJCR</TxCxlSts>
                <CxlStsRsnInf>
                    <Rsn>
                        <Cd>CUST</Cd>
                    </Rsn>
                </CxlStsRsnInf>
            </TxInfAndSts>
        </CxlDtls>
    </RsltnOfInvstgtn>
</Document>
```

To format and inspect XML payloads for indentation and syntax structure during integration, you can use our browser-based [XML Formatter Toolkit](/utilities/).

---

## Schema Validation vs Scheme Business Rules

When building exception processing systems:

* **XSD Schema Validation:** Enforces element existence and sequence. Notice that `<Sts>` is a mandatory choice in `camt.029.001.09`; omitting `<Sts>` or placing `<CxlDtls>` before `<Sts>` causes immediate schema failure.
* **Scheme Business Validation:** Confirms operational rules:
  1. Does the `<OrgnlUETR>` match an active, settled payment that received a matching `camt.056`?
  2. Was the `camt.029` dispatched within the 15 Banking Business Days response SLA?
  3. Is the rejection reason code permitted under Dataset DS-06 or DS-08 of the SCT Rulebook?

---

## Authoritative References

* [ISO 20022 Payments Exceptions and Investigations Catalogue](https://www.iso20022.org/iso-20022-message-definitions) — Official message definition reports and XML specifications for `camt.029`.
* [European Payments Council: SEPA Credit Transfer Inter-PSP Implementation Guidelines (EPC115-06)](https://www.europeanpaymentscouncil.eu/document-library/implementation-guidelines/sepa-credit-transfer-inter-psp-implementation-1) — Technical specifications for Dataset DS-06 and Dataset DS-08.
* [European Payments Council: SEPA Credit Transfer Scheme Rulebook](https://www.europeanpaymentscouncil.eu/document-library/rulebooks/sepa-credit-transfer-scheme-rulebook) — Operational rules and timeframes governing Recall and RFRO procedures.
