---
title: "camt.029 Explained: Resolution of Investigation and Recall Responses"
date: 2023-04-26
description: "Explore the ISO 20022 camt.029 Resolution of Investigation message. Learn how banks reject or resolve recalls, SEPA reason codes, and validated XML structures."
categories: 
  - "iso20022"
  - "sepa"
---

The **camt.029** message (`RsltnOfInvstgtn` — *Resolution of Investigation*) is an ISO 20022 interbank message sent by an instructed financial institution (such as a beneficiary bank) to report the outcome, status, or conclusion of an investigation to the instructing institution.

A common simplification in payments engineering is describing camt.029 exclusively as a "negative response to a recall." While camt.029 is indeed used in schemes like [SEPA Credit Transfer (SCT)](/sepa-credit-transfer-overview/) to inform an originator bank that a payment recall has been denied, the base ISO 20022 definition is far broader. **camt.029 is a multi-purpose investigation resolution message** that resolves payment cancellations, payment modifications, claims for non-receipt, and account statement queries.

---

## ISO 20022 Base Standard vs Scheme Implementations

Under the ISO 20022 standard, `camt.029` provides structured resolution blocks for various operational exceptions:

* **Cancellation Details (`<CxlDtls>`):** Resolves a [camt.056 Payment Cancellation Request](/camt-056-message/). In the general standard, transaction status (`<TxCxlSts>`) is not limited to rejection (`RJCR`); it can also communicate pending investigation (`PDCR`) or accepted cancellation (`ACCR`) in workflows where cancellation does not require an independent funds return message.
* **Modification Details (`<ModDtls>`):** Resolves a payment modification request (`camt.055`).
* **Claim Non-Receipt Details (`<ClmNonRctDtls>`):** Responds to inquiries where a creditor claims funds were never received (`camt.027`).
* **Statement Details (`<StmtDtls>`):** Provides resolution entries for statement or balance investigations.

---

## Concrete Scheme Example: EPC SEPA Credit Transfer (SCT)

In the European Payments Council (EPC) SEPA Credit Transfer scheme, `camt.029` is designated as **Dataset DS-06 (Negative Answer to a Recall or RFRO)**.

### The Interbank Recall Triad: camt.056, pacs.004, and camt.029

When an Originator Bank sends a [`camt.056`](/camt-056-message/) to recall a settled credit transfer:

1. **The Request:** The Originator Bank dispatches a `camt.056`.
2. **Investigation Window:** Under the EPC SCT Rulebook, the Beneficiary Bank must investigate and respond within a mandatory maximum of **15 Banking Business Days**.
3. **Outcome A — Acceptance ([`pacs.004`](/pacs-004-message/)):** If the recall is accepted, the Beneficiary Bank returns the funds using a `pacs.004` (Payment Return) message with reason code `FOCR` (*Following Cancellation Request*). **camt.029 is not used for positive recall responses in SEPA because funds must actually be transferred.**
4. **Outcome B — Rejection (`camt.029`):** If the recall is denied, the Beneficiary Bank returns a `camt.029` with `<TxCxlSts>RJCR</TxCxlSts>`. No funds move; the original credit remains with the beneficiary.

```
                      +-------------------+
                      |  camt.056 Request |
                      | (Originator Bank) |
                      +-------------------+
                                |
               +----------------+----------------+
               |                                 |
         Recall Accepted                  Recall Rejected
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
* `NOAS` (No Answer From Customer): The beneficiary did not respond to the bank's contact attempts within the 15-business-day window.
* `AM04` (Insufficient Funds): Account balance is insufficient to cover the recall amount.

---

## Key Structural Elements (ISO 20022 camt.029)

Under the active ISO 20022 releases (such as `camt.029.001.09` in SEPA and `camt.029.001.10` in modern implementations), the root element `<RsltnOfInvstgtn>` contains the following core blocks:

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
When resolving a payment cancellation, the `<TxInfAndSts>` (Payment Transaction Information and Status) repeating block contains:
* `<CxlStsId>`: Unique cancellation status identifier.
* `<OrgnlGrpInf>`: Links back to the original message identifiers (`<OrgnlMsgId>`, `<OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>`).
* `<OrgnlEndToEndId>`: Original end-to-end identifier from the customer instruction.
* `<OrgnlTxId>`: Original transaction reference.
* `<OrgnlUETR>`: The Unique End-to-End Transaction Reference (UUIDv4) of the original payment.
* `<TxCxlSts>`: Individual transaction cancellation status (e.g., `RJCR` — Rejected Cancellation).
* `<CxlStsRsnInf>`: Contains the rejection reason code (`<Rsn><Cd>CUST</Cd></Rsn>`).
* `<OrgnlTxRef>`: Optional snapshot of the original payment instruction (debtor, creditor, amounts, and accounts) to ensure deterministic reconciliation.

---

## Validated XML Example

Below is a synthetic, complete `camt.029.001.10` XML document rejecting an SCT recall request due to customer refusal (`CUST`).

> **Validation Note:** This XML instance has been tested and validated against the official ISO 20022 XML Schema Definition (`camt.029.001.10.xsd`, target namespace `urn:iso:std:iso:20022:tech:xsd:camt.029.001.10`) using `xmllint` and Python `lxml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.029.001.10">
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

To reformat and validate raw XML messages during integration or testing, you can use our browser-based [XML Formatter Toolkit](/utilities/).

---

## Schema Validation vs Scheme Business Rules

When building exception processing systems:

* **XSD Schema Validation:** Enforces element existence and sequence. Notice that `<Sts>` is a mandatory choice in `camt.029.001.10`; omitting `<Sts>` or placing `<CxlDtls>` before `<Sts>` causes immediate schema failure.
* **Scheme Business Validation:** Confirms operational rules:
  1. Does the `<OrgnlUETR>` match an active, settled payment that received a matching `camt.056`?
  2. Was the `camt.029` dispatched within the 15-business-day response SLA?
  3. Is the rejection reason code permitted under the applicable scheme rulebook?

---

## Authoritative References

* [ISO 20022 Payments Exceptions and Investigations Catalogue](https://www.iso20022.org/iso-20022-message-definitions) — Official message definition reports and XML schemas for `camt.029`.
* [European Payments Council (EPC) SEPA Credit Transfer Rulebook](https://www.europeanpaymentscouncil.eu) — Complete specifications for Dataset DS-06 (Negative Answer to a Recall or RFRO).
* [SWIFT CBPR+ Investigation Guidelines](https://www.swift.com/standards/iso-20022) — Best practices for resolving cross-border payment queries.
