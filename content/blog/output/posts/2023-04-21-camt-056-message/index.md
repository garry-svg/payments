---
title: "camt.056 Explained: Payment Cancellation Requests and Recall Flow"
date: 2023-04-21
description: "Master the ISO 20022 camt.056 Payment Cancellation Request message. Learn the interbank recall flow, EPC SCT scheme deadlines, and validated XML structures."
categories: 
  - "iso20022"
  - "sepa"
---

The **camt.056** message (`FIToFIPmtCxlReq` — *Financial Institution to Financial Institution Payment Cancellation Request*) is the ISO 20022 interbank message used by an instructing financial institution to request the cancellation or recall of a previously dispatched payment instruction, such as a [pacs.008 credit transfer](/pacs-008-message/) or a pacs.009 financial institution transfer.

A common industry misconception is viewing camt.056 as a message that reverses money. **A camt.056 never moves funds.** It is strictly an administrative request initiating an investigation between banks. Once a credit transfer has settled and posted to the beneficiary's account, funds cannot be unilaterally pulled back; settlement finality prevents automated debiting without the beneficiary's consent or formal scheme exception rules.

---

## ISO 20022 Base Standard vs Scheme-Specific Rules

The ISO 20022 standard defines the abstract XML data dictionary, complex types, and validation syntax for camt.056. However, **ISO 20022 does not prescribe legal deadlines, operational turnaround windows, or response mandates**. Those constraints are established exclusively by the governing payment scheme or market practice guideline—such as the European Payments Council (EPC) Rulebooks in Europe, SWIFT CBPR+ in cross-border correspondent banking, or national RTGS operating circulars.

When evaluating a camt.056 workflow, integration engineers must specify both the message schema version and the applicable rulebook.

---

## Concrete Scheme Example: EPC SEPA Credit Transfer (SCT) Recall

Under the European Payments Council (EPC) [SEPA Credit Transfer (SCT) Rulebook](https://www.europeanpaymentscouncil.eu), the recall procedure governs how participants handle erroneous or fraudulent credit transfers.

<figure>

![Camt.056 Message](/images/2023-04-21-camt-056-message/image-13.png "Camt.056 Message")

<figcaption>

Figure 1: Recall message exchange across Originator, Originator Bank, Beneficiary Bank, and Beneficiary.

</figcaption>

</figure>

In the EPC SCT scheme, camt.056 supports two distinct business processes:

### 1. SCT Recall (Bank-Initiated)
Initiated directly by the Originator Bank due to technical or operational errors. Permitted reason codes include:
* `DUPL` (Duplicate sending): Sent twice due to technical glitch.
* `TECH` (Technical problem): Erroneous transmission or incorrect clearing file.
* `FRAD` (Fraudulent origin): Suspected unauthorized or fraudulent instruction.

**Initiation Deadline:** For `DUPL` and `TECH`, the Originator Bank must dispatch the camt.056 within **10 Banking Business Days** following the execution date of the original payment. For `FRAD`, the request can be initiated within **13 months** from the execution date.

### 2. Request for Recall by the Originator (RFRO, Customer-Initiated)
Initiated on behalf of the customer when they erroneously entered the wrong IBAN, paid twice, or fell victim to fraud.

**Initiation Deadline:** An RFRO must be submitted within **13 months** following the execution date of the original SCT.

---

## The Response Lifecycle: camt.056, pacs.004, and camt.029

Under EPC SCT scheme rules, the Beneficiary Bank must investigate the request and provide a definitive answer within a maximum of **15 Banking Business Days** following receipt of the camt.056. Failing to respond within 15 Banking Business Days constitutes a direct breach of the SCT Rulebook.

The Beneficiary Bank must respond with one of two mutually exclusive messages:

```
                      +-------------------+
                      |  camt.056 Request |
                      +-------------------+
                                |
               +----------------+----------------+
               |                                 |
        Recall Accepted                   Recall Rejected
               |                                 |
               v                                 v
      +-----------------+               +-----------------+
      |    pacs.004     |               |    camt.029     |
      | (Payment Return)|               | (Resolution of  |
      |   Reason: FOCR  |               |  Investigation) |
      +-----------------+               +-----------------+
      [Funds Transferred]               [No Funds Moved]
```

1. **Positive Response ([`pacs.004`](/pacs-004-message/)):** If the beneficiary bank accepts the recall (after debiting the beneficiary's account with their consent, or under fraud rules), it returns the funds using a `pacs.004` (Payment Return) carrying the specific return reason code **`FOCR`** (*Following Cancellation Request*).
2. **Negative Response ([`camt.029`](/camt-029-message/)):** If the recall is refused (e.g., the beneficiary refuses consent, the account is closed, or legal reasons prevent debiting), the beneficiary bank sends a `camt.029` (*Resolution of Investigation*) detailing the rejection reason code. No funds are returned.

---

## Key Structural Elements (ISO 20022 camt.056)

In the ISO 20022 2019/2020 releases (such as `camt.056.001.08` used in the SEPA 2019 baseline and `camt.056.001.09` in modern implementations), the root element `<FIToFIPmtCxlReq>` is organized into precise structural blocks:

### 1. Case Assignment (`<Assgnmt>`)
Identifies the investigation routing and parties:
* `<Id>`: Unique assignment reference assigned by the assigner (sender).
* `<Assgnr>`: Instructing institution (Originator Bank) identifying itself via `<FinInstnId><BICFI>`.
* `<Assgne>`: Instructed institution (Beneficiary Bank) receiving the recall.
* `<CreDtTm>`: Timestamp of message generation.

### 2. Case Identification (`<Case>`) *(Optional)*
Used to link multiple related messages (e.g., subsequent queries or resolutions) under a shared investigation reference (`<Id>`).

### 3. Underlying Transactions (`<Undrlyg>`)
Contains the specific payment instructions targeted for recall. Under `<TxInf>` (Payment Transaction):
* `<CxlId>`: Unique cancellation identifier assigned to this specific cancellation instruction.
* `<OrgnlGrpInf>`: Original clearing batch identifiers (`<OrgnlMsgId>`, `<OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>`).
* `<OrgnlEndToEndId>`: The original end-to-end reference of the transaction.
* `<OrgnlTxId>`: The original transaction ID.
* `<OrgnlUETR>`: The original Unique End-to-End Transaction Reference (UUIDv4) linking back to the initial credit transfer.
* `<OrgnlIntrBkSttlmAmt>`: The original interbank settlement amount and currency (e.g., `Ccy="EUR"`).
* `<OrgnlIntrBkSttlmDt>`: The original interbank settlement date.
* `<CxlRsnInf>`: Contains the cancellation reason code (`<Rsn><Cd>`, e.g., `DUPL`, `TECH`, `FRAD`).
* `<OrgnlTxRef>`: Optional snapshot of the original transaction parameters (debtor, creditor, accounts) to facilitate reconciliation.

---

## Validated XML Example

Below is a synthetic, complete `camt.056.001.09` XML document requesting the recall of a settled credit transfer due to duplicate execution (`DUPL`).

> **Validation Note:** This XML instance has been tested and validated against the official ISO 20022 XML Schema Definition (`camt.056.001.09.xsd`, target namespace `urn:iso:std:iso:20022:tech:xsd:camt.056.001.09`) using `xmllint` and Python `lxml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.056.001.09">
    <FIToFIPmtCxlReq>
        <Assgnmt>
            <Id>ASSIGN-2026-0922-001</Id>
            <Assgnr>
                <Agt>
                    <FinInstnId>
                        <BICFI>DBEUMM21XXX</BICFI>
                    </FinInstnId>
                </Agt>
            </Assgnr>
            <Assgne>
                <Agt>
                    <FinInstnId>
                        <BICFI>BNPAFRPPXXX</BICFI>
                    </FinInstnId>
                </Agt>
            </Assgne>
            <CreDtTm>2026-09-22T10:00:00Z</CreDtTm>
        </Assgnmt>
        <Undrlyg>
            <TxInf>
                <CxlId>CXL-2026-0001</CxlId>
                <OrgnlGrpInf>
                    <OrgnlMsgId>MSG-20260920-0042</OrgnlMsgId>
                    <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>
                </OrgnlGrpInf>
                <OrgnlEndToEndId>E2E-2026-987654</OrgnlEndToEndId>
                <OrgnlTxId>TX-2026-0001</OrgnlTxId>
                <OrgnlUETR>93ce3143-6050-4ff6-8c46-95b6c86e0c03</OrgnlUETR>
                <OrgnlIntrBkSttlmAmt Ccy="EUR">5400.00</OrgnlIntrBkSttlmAmt>
                <OrgnlIntrBkSttlmDt>2026-09-20</OrgnlIntrBkSttlmDt>
                <CxlRsnInf>
                    <Rsn>
                        <Cd>DUPL</Cd>
                    </Rsn>
                </CxlRsnInf>
            </TxInf>
        </Undrlyg>
    </FIToFIPmtCxlReq>
</Document>
```

You can format and test XML payloads using our browser-based [XML Formatter Toolkit](/utilities/).

---

## Schema Validation vs Scheme Business Rules

When building automated recall handling engines, do not rely solely on XSD validation:

* **XSD Schema Validation:** Verifies structural and typing rules—for example, that `<OrgnlUETR>` conforms to the UUIDv4 pattern, that `<Assgnmt>` contains both `<Assgnr>` and `<Assgne>`, and that elements appear in their schema-defined sequence.
* **Scheme Business Validation:** Checks scheme eligibility—for example, whether the original [`pacs.008`](/pacs-008-message/) transaction actually settled, whether the recall was initiated within the 10-business-day or 13-month window, and whether the beneficiary bank is registered as reachable under the scheme directory.

---

## Authoritative References

* [ISO 20022 Payments Exceptions and Investigations Catalogue](https://www.iso20022.org/iso-20022-message-definitions) — Official message definitions, MDRs, and schemas for `camt.056`.
* [European Payments Council (EPC) SEPA Credit Transfer Rulebook](https://www.europeanpaymentscouncil.eu) — Detailed recall workflow specifications, reason codes, and operational deadlines for Dataset DS-05 and DS-06.
* [SWIFT CBPR+ User Guidelines](https://www.swift.com/standards/iso-20022) — Cross-border usage guidelines for payment cancellation requests.
