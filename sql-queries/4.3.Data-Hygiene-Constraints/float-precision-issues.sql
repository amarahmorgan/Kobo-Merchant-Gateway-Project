-- 4.3.08 Data Hygiene - Potential FLOAT Precision Issues in Financial Fields
-- Shows transactions where CommissionAmount has suspicious decimal places
SELECT 
    EntryID,
    Amount,
    CommissionAmount,
    CommissionAmount - ROUND(CommissionAmount, 2) AS ExtraDecimals,
    (Amount * 0.05) AS Example5Percent  -- for comparison
FROM TransactionLedger
WHERE ABS(CommissionAmount - ROUND(CommissionAmount, 2)) > 0.0001
ORDER BY ABS(CommissionAmount - ROUND(CommissionAmount, 2)) DESC;




