-- 4.3.10 Data Hygiene - Summary Dashboard
-- Overview of all major data quality issues
SELECT 'Duplicate External References' AS CheckName, 
       COUNT(DISTINCT ExternalReference) AS IssueCount 
FROM TransactionLedger 
WHERE ExternalReference IN (SELECT ExternalReference FROM TransactionLedger GROUP BY ExternalReference HAVING COUNT(*) > 1)

UNION ALL

SELECT 'Invalid MSISDN Formats', COUNT(*) 
FROM Users 
WHERE LEN(MSISDN) <> 11 OR MSISDN NOT LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'

UNION ALL

SELECT 'Duplicate Commission Rules', COUNT(*) 
FROM (
    SELECT ProductID, MerchantTier 
    FROM Commissions 
    WHERE IsActive = 1 
    GROUP BY ProductID, MerchantTier 
    HAVING COUNT(*) > 1
) AS dup

UNION ALL

SELECT 'Negative Balances', COUNT(*) 
FROM Wallets 
WHERE Balance < 0

UNION ALL

SELECT 'Expired Vouchers', COUNT(*) 
FROM DigitalVouchers 
WHERE ExpiryDate < GETDATE();




