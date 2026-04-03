---
title: "Camt.052 Message"
date: 2023-04-30
categories: 
  - "iso-20022"
---

## Overview

The [ISO 20022](https://davegarry.com/what-is-iso-20022/) camt.052 message is a bank to customer account report.

It is used to provide intraday account reports to customers. Both transactions and balances are provided in the camt.052. Intraday transactions are transactions that were booked on an account since the last book day closed. It may contain reports for more than one account.

The XML Schema and Message Definition Report for camt.052 can be downloaded from [here.](https://www.iso20022.org/iso-20022-message-definitions?search=camt.052)

![camt.052](/images/2023-04-30-camt-052-message/image.png "camt.052")

## Building Blocks of Camt.052

#### GroupHeader

Contain all the common characteristics of all reports contained within the camt.052. It will contain the following elements:

- Message Identification: A unique identifier assigned to the message

- Creation Date and Time: The date and time when the message was created.

- Number of Cases: The total count of individual cases or assignments included in the message.

- Initiating Party: Information about the party initiating the message

#### Report

The Camt.052 will contain a number of reports. It will contain the following elements:

- Report Identification: A unique identifier assigned to the report

- Creation Date and Time: The date and time when the report was created.

- Initiating Party: Information about the party initiating the report.

- Cases: This section contains details about the individual cases or assignments being reported. Each case may include information such as the case identification, case type, case subject, case status, and other relevant details specific to the reported cases.

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Document xmlns:ns3="urn:iso:std:iso:20022:tech:xsd:camt.052.001.06">
    <BkToCstmrAcctRpt>
        <GrpHdr>
            <MsgId>0SFpm6pX85QG6zuVSpwW2buz92cZO5UjJlQ</MsgId>
            <CreDtTm>2020-06-27T05:45:12.099Z</CreDtTm>
        </GrpHdr>
        <Rpt>
            <Id>XowRd492aANA110aIfDcUBgf43VEsQlyOEg</Id>
            <CreDtTm>2020-06-27T05:45:12.100Z</CreDtTm>
            <FrToDt>
                <FrDtTm>2020-06-26T04:00:00.000Z</FrDtTm>
                <ToDtTm>2020-06-27T04:00:00.000Z</ToDtTm>
            </FrToDt>
            <Acct>
                <Id>
                    <Othr>
                        <Id>001-29712-1004728</Id>
                    </Othr>
                </Id>
                <Ownr>
                    <Nm> TEST ISO_1 etransfer</Nm>
                    <PstlAdr/>
                    <Id>
                        <OrgId>
                            <Othr>
                                <Id>00000001BISO01</Id>
                                <SchmeNm>
                                    <Cd>CUST</Cd>
                                </SchmeNm>
                            </Othr>
                        </OrgId>
                    </Id>
                </Ownr>
                <Svcr>
                    <FinInstnId>
                        <ClrSysMmbId>
                            <MmbId>CA000001</MmbId>
                        </ClrSysMmbId>
                    </FinInstnId>
                </Svcr>
            </Acct>
            <TxsSummry>
                <TtlNtriesPerBkTxCd>
                    <NbOfNtries>0</NbOfNtries>
                    <Sum>0.00</Sum>
                    <BkTxCd>
                        <Prtry>
                            <Cd>COMPLETED</Cd>
                        </Prtry>
                    </BkTxCd>
                </TtlNtriesPerBkTxCd>
                <TtlNtriesPerBkTxCd>
                    <NbOfNtries>9</NbOfNtries>
                    <Sum>0.42</Sum>
                    <BkTxCd>
                        <Prtry>
                            <Cd>CANCELLED</Cd>
                        </Prtry>
                    </BkTxCd>
                </TtlNtriesPerBkTxCd>
            </TxsSummry>
            <Ntry>
                <Amt Ccy="CAD">0.02</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Sts>INFO</Sts>
                <BkTxCd>
                    <Prtry>
                        <Cd>CANCELLED</Cd>
                    </Prtry>
                </BkTxCd>
                <AmtDtls>
                    <InstdAmt>
                        <Amt Ccy="CAD">0.02</Amt>
                    </InstdAmt>
                    <TxAmt>
                        <Amt Ccy="CAD">0.02</Amt>
                    </TxAmt>
                </AmtDtls>
                <NtryDtls>
                    <TxDtls>
                        <Refs>
                            <MsgId>BISO0120061100104</MsgId>
                            <InstrId>BISO0120061100104000001</InstrId>
                            <EndToEndId>BISO0120061100104000001</EndToEndId>
                            <ClrSysRef>CA1MRkX7rFRW</ClrSysRef>
                        </Refs>
                        <Amt Ccy="CAD">0.02</Amt>
                        <CdtDbtInd>CRDT</CdtDbtInd>
                        <RltdDts>
                            <TxDtTm>2020-06-26T17:30:00.603Z</TxDtTm>
                        </RltdDts>
                        <SplmtryData>
                            <Envlp>
                                <BulkReqPmtFnlzRptRecSplmtryData>
                                    <CnclRsn>3</CnclRsn>
                                </BulkReqPmtFnlzRptRecSplmtryData>
                            </Envlp>
                        </SplmtryData>
                    </TxDtls>
                </NtryDtls>
            </Ntry>
        </Rpt>
    </BkToCstmrAcctRpt>
</Document>
```
