SELECT 
    CAST(tl.CreatedTimestamp AS DATE) AS TransactionDate,
    COUNT(*) AS GhostCount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
GROUP BY CAST(tl.CreatedTimestamp AS DATE)
ORDER BY TransactionDate;