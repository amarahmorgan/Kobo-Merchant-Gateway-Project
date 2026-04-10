SELECT 
    sp.ProviderName,
    COUNT(*) AS GhostCount,
    SUM(tl.Amount) AS TotalAmount
FROM TransactionLedger tl
LEFT JOIN DigitalVouchers dv ON tl.EntryID = dv.EntryID
JOIN Products p ON tl.ProductID = p.ProductID
JOIN ServiceProviders sp ON p.ProviderID = sp.ProviderID
WHERE dv.EntryID IS NULL
  AND tl.ProcessingStatus = 'Completed'
GROUP BY sp.ProviderName;