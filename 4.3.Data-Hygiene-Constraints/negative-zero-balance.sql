-- 4.3.04 Data Hygiene - Negative and Near-Zero Wallet Balances
-- Highlights business logic defects (negative balance and very low balance)
SELECT 
    w.WalletID,
    u.UserID,
    u.FullName,
    u.Role,
    w.Balance,
    w.LastUpdated,
    CASE 
        WHEN w.Balance < 0 THEN 'Negative Balance'
        WHEN w.Balance = 0 THEN 'Zero Balance'
        WHEN w.Balance < 10 THEN 'Critically Low'
        ELSE 'Normal'
    END AS BalanceStatus
FROM Wallets w
INNER JOIN Users u ON w.UserID = u.UserID
WHERE w.Balance <= 10
ORDER BY w.Balance ASC;



