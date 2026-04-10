-- 4.3.01 Data Hygiene - Duplicate External References
-- Detects intentional defect: duplicate TXN- references in TransactionLedger
USE KoboFintech;
GO

SELECT 
    ExternalReference,
    COUNT(*) AS DuplicateCount,
    STRING_AGG(CAST(EntryID AS NVARCHAR(50)), ', ') AS AffectedEntryIDs,
    MIN(CreatedTimestamp) AS FirstOccurrence,
    MAX(CreatedTimestamp) AS LastOccurrence
FROM TransactionLedger
GROUP BY ExternalReference
HAVING COUNT(*) > 1
ORDER BY DuplicateCount DESC;