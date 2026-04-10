-- 4.3.05 Data Hygiene - Expired Digital Vouchers
-- Identifies vouchers that have already expired (intentional ~200 defects)
SELECT 
    dv.VoucherID,
    dv.EntryID,
    tl.CreatedTimestamp AS TransactionDate,
    dv.ExpiryDate,
    DATEDIFF(DAY, GETDATE(), dv.ExpiryDate) AS DaysUntilExpiry,
    p.Description AS Product
FROM DigitalVouchers dv
INNER JOIN TransactionLedger tl ON dv.EntryID = tl.EntryID
INNER JOIN Products p ON tl.ProductID = p.ProductID
WHERE dv.ExpiryDate < GETDATE()
ORDER BY dv.ExpiryDate ASC;

