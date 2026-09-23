---
title: "pacs.003 Explained: Direct Debit Flow, Fields and XML Example"
date: 2023-02-16
description: "A complete guide to the ISO 20022 pacs.003 interbank customer direct debit message. Learn the message flow from pain.008, mandate structures, and XML fields."
categories: 
  - "iso20022"
  - "sepa"
---

The **pacs.003** message (`FIToFICstmrDrctDbt` — *Financial Institution to Financial Institution Customer Direct Debit*) is the core ISO 20022 XML message used between financial institutions to execute customer direct debit collections. In contrast to credit transfers where the debtor initiates a "push" payment, direct debit is a **pull payment**: the creditor's bank (creditor agent) forwards the instruction through a clearing and settlement mechanism (CSM) to collect funds directly from the debtor's bank (debtor agent).

A common source of confusion in early implementations is conflating collection instructions with cancellation requests. A pacs.003 message does not handle cancellations or payment recalls; it is strictly the interbank vehicle for executing collections authorized by a mandate.

---

## Direct Debit Purpose and Participants

A direct debit transaction typically involves four primary parties and, where interbank clearing infrastructure is used, a clearing mechanism:

1. **Creditor (Payee):** The merchant, utility, or business collecting funds based on a prior contractual agreement and signed mandate.
2. **Creditor Agent (Creditor PSP):** The bank or payment service provider holding the creditor's account and initiating the interbank collection.
3. **Clearing and Settlement Mechanism (CSM):** Clearing and settlement infrastructure, such as [EBA CLEARING STEP2](/who-are-eba-clearing/) or central bank platforms, where applicable. Routes collection instructions and facilitates clearing and settlement according to the infrastructure’s rules.
4. **Debtor Agent (Debtor PSP):** The bank or PSP holding the account to be debited.
5. **Debtor (Payer):** The consumer or enterprise debtor who granted the direct debit mandate.

```
+------------+       pain.008       +----------------+
|  Creditor  | -------------------> | Creditor Agent |
+------------+  (Customer-to-Bank)  +----------------+
                                            |
                                            | pacs.003
                                            v
                                    +----------------+
                                    |      CSM       |
                                    +----------------+
                                            |
                                            | pacs.003
                                            v
+------------+     Debits Account   +----------------+
|   Debtor   | <------------------- |  Debtor Agent  |
+------------+                      +----------------+
```

---

## Relationship Between pain.008 and pacs.003

Direct debit processing operates across two distinct messaging layers:

* **[pain.008 (CustomerDirectDebitInitiation)](/pain-008-message/):** Exchanged in the customer-to-bank (C2B) space. The creditor sends a pain.008 file to their bank to request collections for one or multiple customers, referencing each customer's mandate.
* **pacs.003 (FIToFICstmrDrctDbt):** Exchanged in the bank-to-bank / interbank space. The creditor agent validates the customer's pain.008 file, breaks it into clearing batches, enriches it with interbank routing and settlement details, and transmits the resulting pacs.003 message to the CSM and debtor agent.

While pain.008 allows flexible multi-level grouping of payments by creditor account and payment information blocks, pacs.003 requires explicit transaction-level repeating structures (`<DrctDbtTxInf>`) bound to a single interbank settlement instruction within the group header.

---

## Direct Debit Lifecycle and Message Flow

The full execution flow follows strict operational stages:

<figure>

![Pacs.003 overview](/images/2023-02-16-pacs-003-message/image-6.png "Pacs.003 overview")

<figcaption>

Figure 1: Direct debit message flow across creditor, banks, and clearing infrastructure.

</figcaption>

</figure>

1. **Mandate Agreement:** Prior to collection, the debtor signs a direct debit mandate authorizing the creditor to draw funds from their account.
2. **Pre-Notification:** The creditor provides advance notice to the debtor regarding the amount and execution date according to scheme rules (e.g., at least 14 calendar days before the due date under [SEPA](/what-is-sepa/) rules, unless agreed otherwise).
3. **Initiation (`pain.008`):** The creditor generates and sends the pain.008 file to the creditor agent ahead of the target settlement date.
4. **Interbank Presentation (`pacs.003`):** The creditor agent forwards the collection as a pacs.003 message to the CSM ahead of scheme cut-off windows.
5. **Settlement and Account Debit:** On the Requested Collection Date (`ReqdColltnDt`), interbank settlement completes across settlement accounts. The debtor agent debits the debtor's account, and the creditor agent credits the creditor's account.
6. **Exception Handling ("R-Transactions"):**
   * **Rejection / Refusal (`pacs.002`):** If the transaction fails prior to settlement (e.g., account closed, invalid account, or debtor refusal), the debtor agent or CSM transmits an interbank reject via `pacs.002`.
   * **Return / Refund ([`pacs.004`](/pacs-004-message/)):** If the payment has already settled, but cannot be processed (e.g., insufficient funds during the post-settlement return window) or the debtor exercises their unconditional 8-week refund right under the SEPA Core Direct Debit scheme, funds are returned using a `pacs.004` message.
   * **Reversal (`pacs.007`):** If the creditor agent detects an operational error post-settlement (e.g., duplicate transmission), it issues a `pacs.007` payment reversal.
   * *Note:* Message cancellations via `camt.056` are designated for credit transfer recall investigations; standard direct debit schemes handle returns and reversals via `pacs.004` and `pacs.007`.

---

## Key Structural Elements (ISO 20022 pacs.003.001.08)

Under the current European Payments Council (EPC) Rulebooks and the ISO 20022 2019 baseline (migrated in November 2023), the active schema version is **`pacs.003.001.08`**.

The document contains two primary blocks: `<GrpHdr>` (Group Header) and one or more repeating `<DrctDbtTxInf>` (Direct Debit Transaction Information) blocks.

### 1. Group Header (`<GrpHdr>`)

Carries metadata common to the entire batch:

* `<MsgId>`: Unique message identification string assigned by the instructing agent.
* `<CreDtTm>`: Timestamp indicating when the message was generated.
* `<NbOfTxs>`: Total count of direct debit transactions contained in the message.
* `<CtrlSum>`: Arithmetic total of all individual collection amounts.
* `<IntrBkSttlmDt>`: Interbank settlement date when accounts are debited/credited in central bank or commercial clearing money.
* `<SttlmInf>`: Specifies the settlement method (`<SttlmMtd>`, e.g., `CLRG` for clearing system) and clearing house identifier (`<ClrSys>`).

### 2. Direct Debit Transaction Information (`<DrctDbtTxInf>`)

Carries transaction-specific data:

* `<PmtId>`: Contains transaction identifiers, ordered strictly by schema rules:
  * `<EndToEndId>`: The creditor's original end-to-end reference, passed unmodified back to the debtor.
  * `<TxId>`: The instructing bank's unique transaction identification.
  * `<UETR>`: The Unique End-to-End Transaction Reference (UUIDv4) allowing tracking across intermediaries.
* `<PmtTpInf>`: Scheme classification parameters:
  * `<SvcLvl><Cd>`: Service level code (e.g., `SEPA`).
  * `<LclInstrm><Cd>`: Local instrument code (e.g., `CORE` for consumer direct debit, or `B2B` for business-to-business).
  * `<SeqTp>`: Sequence type: `FRST` (First collection), `RCUR` (Recurrent), `FNAL` (Final), or `OOFF` (One-off). Note that under EPC SDD rules since November 2016, `FRST` is optional; creditors may use `RCUR` for all recurrent collections, including the initial one.
* `<IntrBkSttlmAmt>`: The collection amount and currency (e.g., `Ccy="EUR"`).
* `<ChrgBr>`: Charge bearer code, conventionally `SLEV` (Service Level / Shared) in SEPA.
* `<ReqdColltnDt>`: The requested collection due date when the debtor's account should be debited.
* `<DrctDbtTx>`: Direct debit specific details:
  * `<MndtRltdInf>`: Mandate information (mandatory under EPC SDD rules):
    * `<MndtId>`: Unique Mandate Reference (UMR) established between creditor and debtor.
    * `<DtOfSgntr>`: The date the mandate was signed by the debtor.
    * `<AmdmntInd>`: Boolean flag indicating whether mandate terms have changed since previous collection (`true` or `false`).
  * `<CdtrSchmeId>`: Creditor Scheme Identifier (e.g., Creditor ID / CI assigned to the collecting merchant).
* `<Cdtr>` & `<CdtrAcct>`: Creditor name, address, and IBAN.
* `<CdtrAgt>`: BICFI of the creditor's bank.
* `<Dbtr>` & `<DbtrAcct>`: Debtor name, address, and IBAN.
* `<DbtrAgt>`: BICFI of the debtor's bank.
* `<RmtInf>`: Structured or unstructured remittance details (`<Ustrd>`).

---

## XML Example (pacs.003.001.08)

The following is a synthetic `pacs.003.001.08` XML document representing a SEPA Core Direct Debit recurrent collection.

> This example was validated against pacs.003.001.08.xsd. XSD validation checks XML structure and data types; it does not establish compliance with EPC scheme rules.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.003.001.08">
    <FIToFICstmrDrctDbt>
        <GrpHdr>
            <MsgId>MSGID-20260922-0001</MsgId>
            <CreDtTm>2026-09-22T09:30:00Z</CreDtTm>
            <NbOfTxs>1</NbOfTxs>
            <CtrlSum>125.50</CtrlSum>
            <IntrBkSttlmDt>2026-09-24</IntrBkSttlmDt>
            <SttlmInf>
                <SttlmMtd>CLRG</SttlmMtd>
                <ClrSys>
                    <Prtry>ST2</Prtry>
                </ClrSys>
            </SttlmInf>
        </GrpHdr>
        <DrctDbtTxInf>
            <PmtId>
                <EndToEndId>E2E-SDD-2026-00042</EndToEndId>
                <TxId>TXID-2026-0922-0001</TxId>
                <UETR>c19b6743-3051-4e78-958b-0c9f80168449</UETR>
            </PmtId>
            <PmtTpInf>
                <SvcLvl>
                    <Cd>SEPA</Cd>
                </SvcLvl>
                <LclInstrm>
                    <Cd>CORE</Cd>
                </LclInstrm>
                <SeqTp>RCUR</SeqTp>
            </PmtTpInf>
            <IntrBkSttlmAmt Ccy="EUR">125.50</IntrBkSttlmAmt>
            <ChrgBr>SLEV</ChrgBr>
            <ReqdColltnDt>2026-09-24</ReqdColltnDt>
            <DrctDbtTx>
                <MndtRltdInf>
                    <MndtId>MANDATE-REF-98765</MndtId>
                    <DtOfSgntr>2024-01-15</DtOfSgntr>
                    <AmdmntInd>false</AmdmntInd>
                </MndtRltdInf>
                <CdtrSchmeId>
                    <Id>
                        <OrgId>
                            <Othr>
                                <Id>DE98ZZZ09999999999</Id>
                                <SchmeNm>
                                    <Prtry>SEPA</Prtry>
                                </SchmeNm>
                            </Othr>
                        </OrgId>
                    </Id>
                </CdtrSchmeId>
            </DrctDbtTx>
            <Cdtr>
                <Nm>Utility Services GmbH</Nm>
                <PstlAdr>
                    <Ctry>DE</Ctry>
                    <AdrLine>Musterstrasse 12</AdrLine>
                </PstlAdr>
            </Cdtr>
            <CdtrAcct>
                <Id>
                    <IBAN>DE89370400440532013000</IBAN>
                </Id>
            </CdtrAcct>
            <CdtrAgt>
                <FinInstnId>
                    <BICFI>DBEUMM21XXX</BICFI>
                </FinInstnId>
            </CdtrAgt>
            <Dbtr>
                <Nm>Jean Dupont</Nm>
                <PstlAdr>
                    <Ctry>FR</Ctry>
                    <AdrLine>15 Rue de Paris</AdrLine>
                </PstlAdr>
            </Dbtr>
            <DbtrAcct>
                <Id>
                    <IBAN>FR7630006000011234567890189</IBAN>
                </Id>
            </DbtrAcct>
            <DbtrAgt>
                <FinInstnId>
                    <BICFI>BNPAFRPPXXX</BICFI>
                </FinInstnId>
            </DbtrAgt>
            <RmtInf>
                <Ustrd>Monthly electricity bill INV-2026-09</Ustrd>
            </RmtInf>
        </DrctDbtTxInf>
    </FIToFICstmrDrctDbt>
</Document>
```

If you are inspecting or reformatting raw XML payloads for indentation and syntax structure during integration testing, you can format your documents using our browser-based [XML Formatter Toolkit](/utilities/).

---

## Schema Validation vs Scheme Business-Rule Validation

Passing schema validation is necessary, but it does **not** ensure that a message will be accepted by a clearing system. Integration engineers must separate two validation layers:

| Layer | Scope | Checked Properties | Example Failures |
| :--- | :--- | :--- | :--- |
| **XSD Schema Validation** | Syntactic & structural compliance against ISO 20022 definitions | Element order, element presence, data types, field lengths, regex patterns | Out-of-order XML tags, missing mandatory `<MsgId>`, invalid UUID in `<UETR>`, non-numeric `<CtrlSum>` |
| **Scheme / Business Validation** | Operational & regulatory compliance against scheme rulebooks (e.g., EPC SDD Core/B2B) | Account reachability, IBAN checksums, cut-off windows, mandate validity, currency restrictions | Presenting a collection past the clearing cut-off, non-EUR currency in SEPA, debtor account closed, inactive mandate |

---

## Common Implementation Mistakes

1. **Incorrect Tag Sequencing:** The ISO 20022 XML schemas strictly enforce XML element sequence orders (`<xs:sequence>`). Placing `<UETR>` before `<TxId>` within `<PmtId>`, or placing debtor blocks before creditor blocks, triggers fatal schema validation errors.
2. **Confusing Collection Date with Settlement Date:** `<ReqdColltnDt>` specifies the day the debtor's account is debited, while `<IntrBkSttlmDt>` defines when interbank accounts settle. In standard SEPA Direct Debit, these two dates coincide, but interbank presentation must precede the collection date according to scheme lead times.
3. **Mandate Sequence Type Assumptions:** Prior to November 2016, SEPA Direct Debit required initial collections to carry the `FRST` sequence type with extended lead times. Under current EPC SDD rules, `FRST` is optional; creditors are permitted to use `RCUR` for all recurrent collections, including the initial one, and presentation lead times are harmonized to D-1 banking business day.
4. **Mandate Amendment Errors:** When updating creditor or debtor banking details, the `<AmdmntInd>` must be set to `true`, and `<AmdmntInfDtls>` must contain the original mandate parameters. Submitting a new mandate reference without amendment flags risks being treated as an unknown or unauthorized collection.
5. **Conflating SDD R-Transactions:** Direct debit exceptions must follow scheme-defined paths: a pre-settlement failure requires a `pacs.002` Reject, whereas a post-settlement return requires a [`pacs.004`](/pacs-004-message/). Direct debit does not use `camt.056` for customer recall requests.

---

## Primary References

* [ISO 20022 Payments Clearing and Settlement Catalogue](https://www.iso20022.org/iso-20022-message-definitions) — Official message definitions and XML specifications for `pacs.003`.
* [European Payments Council: SEPA Direct Debit Core Scheme Rulebook](https://www.europeanpaymentscouncil.eu/document-library/rulebooks/sepa-direct-debit-core-scheme-rulebook) — Definitive specifications for Dataset DS-04 interbank collections.
* [European Payments Council: Press Release EPC002-15 on Optional FRST Sequence Type](https://www.europeanpaymentscouncil.eu/sites/default/files/KB/files/EPC002-15%20v%201.0%20%2826.01.2015%29%20EPC%20Press%20Release%20Publication%20SDD%20Rulebooks%20to%20Take%20Effect%20November%202016.pdf) — Rulebook decision making the first sequence type optional and harmonizing lead times.
