-- 4.3.03 Data Hygiene - Duplicate Commission Rules
-- Detects the intentional duplicate for ProductID 2, Standard tier
SELECT 
    ProductID,
    MerchantTier,
    COUNT(*) AS RuleCount,
    STRING_AGG(CAST(CommissionPercentage AS NVARCHAR), ', ') AS Percentages,
    STRING_AGG(CAST(CommissionID AS NVARCHAR), ', ') AS CommissionIDs
FROM Commissions
WHERE IsActive = 1
GROUP BY ProductID, MerchantTier
HAVING COUNT(*) > 1
ORDER BY RuleCount DESC;

