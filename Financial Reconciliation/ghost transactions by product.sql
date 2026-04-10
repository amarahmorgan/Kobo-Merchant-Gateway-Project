SELECT 
    p.Description,
    COUNT(*) AS GhostCount,
    SUM(tl.Amount) AS TotalAmount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
JOIN Products p ON tl.ProductID = p.ProductID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
GROUP BY p.Description;