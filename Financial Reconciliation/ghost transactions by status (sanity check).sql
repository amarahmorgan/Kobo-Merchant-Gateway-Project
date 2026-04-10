SELECT 
    tl.ProcessingStatus,
    COUNT(*) AS GhostCount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
GROUP BY tl.ProcessingStatus;