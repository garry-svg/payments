---
title: "camt.056 Explained: Payment Cancellation Requests and Recall Flow"
date: 2023-04-21
description: "Master the ISO 20022 camt.056 Payment Cancellation Request message. Learn the interbank recall flow, EPC SCT scheme deadlines, and XML structures."
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

Under the European Payments Council (EPC) [SEPA Credit Transfer Scheme Rulebook](https://www.europeanpaymentscouncil.eu/document-library/rulebooks/sepa-credit-transfer-scheme-rulebook), the recall procedure governs how participants handle erroneous or fraudulent credit transfers.

<figure>

![Camt.056 Message](/images/2023-04-21-camt-056-message/image-13.png "Camt.056 Message")

<figcaption>

Figure 1: Recall message exchange across Originator, Originator Bank, Beneficiary Bank, and Beneficiary.

</figcaption>

</figure>

In the EPC SCT scheme, camt.056 supports two distinct business processes:

### 1. SCT Recall (PSP-Initiated, Dataset DS-05)
Initiated directly by the Originator PSP due to technical or operational errors:
* `DUPL` (Duplicate sending): Sent more than once due to technical or operational error.
* `TECH` (Technical problem): Technical error resulting in erroneous transmission.
* `FRAD` (Fraudulent origin): Fraudulent originated credit transfer.

**Initiation Deadlines:** For `DUPL` and `TECH`, the Originator PSP must dispatch the camt.056 within **10 Banking Business Days** following the execution date of the original SCT instruction. For `FRAD`, the request can be initiated within **13 months** from the execution date.

### 2. Request for Recall by the Originator (RFRO, Customer-Initiated, Dataset DS-07)
Initiated on behalf of the customer when they erroneously entered an incorrect IBAN, sent a duplicate payment, or fell victim to fraud.

**Initiation Deadline:** An RFRO must be submitted by the customer within **13 months** following the debit date of the original payment.

---

## The Response Lifecycle: camt.056, pacs.004, and camt.029

Under EPC SCT scheme rules, the Beneficiary PSP must investigate the request and provide a definitive answer within a mandatory maximum of **15 Banking Business Days** following receipt of the camt.056. Failing to respond within 15 Banking Business Days constitutes a direct breach of the SCT Rulebook.

The Beneficiary PSP must respond with one of two mutually exclusive messages:

```
                      +-------------------+
                      |  camt.056 Request |
                      | (DS-05 or DS-07)  |
                      +-------------------+
                                |
               +----------------+----------------+
               |                                 |
        Recall Accepted                   Recall Rejected
        (DS-06 or DS-08)                  (DS-06 or DS-08)
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

## Key Structural Elements (ISO 20022 camt.056.001.08)

Under the [SEPA Credit Transfer Scheme Inter-PSP Implementation Guidelines (EPC115-06)](https://www.europeanpaymentscouncil.eu/document-library/implementation-guidelines/sepa-credit-transfer-inter-psp-implementation-1), the applicable message version for payment recall requests is **`camt.056.001.08`**. The root element `<FIToFIPmtCxlReq>` is organized into precise structural blocks:

### 1. Case Assignment (`<Assgnmt>`)
Identifies the investigation routing and parties:
* `<Id>`: Unique assignment reference assigned by the assigner (sender).
* `<Assgnr>`: Instructing institution (Originator Bank) identifying itself via `<FinInstnId><BICFI>`.
* `<Assgne>`: Instructed institution (Beneficiary Bank) receiving the recall.
* `<CreDtTm>`: Timestamp of message generation.

### 2. Case Identification (`<Case>`) *(Optional)*
Used to link multiple related messages under a shared investigation reference (`<Id>`).

### 3. Underlying Transactions (`<Undrlyg>`)
Contains the specific payment instructions targeted for recall. Under `<TxInf>` (`PaymentTransaction106`):
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

## Synthetic XML Example (camt.056.001.08)

Below is a synthetic `camt.056.001.08` XML document requesting the recall of a settled credit transfer due to duplicate execution (`DUPL`), structured according to EPC115-06 Inter-PSP Implementation Guidelines.

> **Verification Note:** This example specifies the target namespace `urn:iso:std:iso:20022:tech:xsd:camt.056.001.08` used by the EPC SCT scheme. Because standalone XSD packages for this specific version could not be retrieved from primary sources due to anti-bot restrictions on download archives, this snippet is provided as an illustrative structural reference rather than an independently verified XSD-validated document.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.056.001.08">
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

You can format and inspect XML payloads for indentation and syntax structure using our browser-based [XML Formatter Toolkit](/utilities/).

---

## Schema Validation vs Scheme Business Rules

When building automated recall handling engines, do not rely solely on XSD validation:

* **XSD Schema Validation:** Verifies structural and typing rules—for example, that `<OrgnlUETR>` conforms to the UUIDv4 pattern, that `<Assgnmt>` contains both `<Assgnr>` and `<Assgne>`, and that elements appear in their schema-defined sequence.
* **Scheme Business Validation:** Checks scheme eligibility—for example, whether the original [`pacs.008`](/pacs-008-message/) transaction actually settled, whether the recall was initiated within the 10 Banking Business Days window (or 13 months for fraud), and whether the beneficiary bank is registered as reachable under the scheme directory.

---

## Authoritative References

* [ISO 20022 Payments Exceptions and Investigations Catalogue](https://www.iso20022.org/iso-20022-message-definitions) — Official message definitions and XML specifications for `camt.056`.
* [European Payments Council: SEPA Credit Transfer Inter-PSP Implementation Guidelines (EPC115-06)](https://www.europeanpaymentscouncil.eu/document-library/implementation-guidelines/sepa-credit-transfer-inter-psp-implementation-1) — Technical specifications for Dataset DS-05.
* [European Payments Council: SEPA Credit Transfer Scheme Rulebook](https://www.europeanpaymentscouncil.eu/document-library/rulebooks/sepa-credit-transfer-scheme-rulebook) — Operational rules and timeframes governing Recall and RFRO procedures.
