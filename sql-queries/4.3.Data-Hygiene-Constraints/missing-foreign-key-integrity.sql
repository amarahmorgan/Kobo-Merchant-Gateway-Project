-- 4.3.09 Data Hygiene - Missing FK Integrity Checks
-- Checks for vouchers pointing to non-existent transaction entries
SELECT 
    dv.VoucherID,
    dv.EntryID
FROM DigitalVouchers dv
WHERE NOT EXISTS (SELECT 1 FROM TransactionLedger tl WHERE tl.EntryID = dv.EntryID);

