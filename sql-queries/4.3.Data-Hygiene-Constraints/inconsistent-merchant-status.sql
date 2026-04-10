-- 4.3.06 Data Hygiene - Inconsistent Merchant Status
-- Finds mismatch between Users.ServiceStatus and Merchants.MerchantStatus
SELECT
    u.UserID,
    u.FullName,
    u.ServiceStatus AS UserStatus,
    m.MerchantStatus,
    m.BusinessName,
    m.MerchantTier
FROM Users u
    INNER JOIN Merchants m ON u.UserID = m.UserID
WHERE u.ServiceStatus <> 'Active'
    OR m.MerchantStatus IN ('Suspended', 'Deactivated', 'Pending')
ORDER BY u.UserID;



