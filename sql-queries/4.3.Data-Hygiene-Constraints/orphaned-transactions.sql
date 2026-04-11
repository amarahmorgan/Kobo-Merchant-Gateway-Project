-- 4.3.07 Data Hygiene - Orphaned Transactions (Wallet no longer exists or invalid)
SELECT 
    tl.EntryID,
    tl.WalletID,
    tl.Amount,
    tl.CreatedTimestamp
FROM TransactionLedger tl
WHERE NOT EXISTS (SELECT 1 FROM Wallets w WHERE w.WalletID = tl.WalletID)
   OR tl.WalletID IS NULL;

   