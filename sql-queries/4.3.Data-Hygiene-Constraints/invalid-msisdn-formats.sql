-- 4.3.02 Data Hygiene - Invalid MSISDN Formats
-- Finds MSISDNs that violate the 11-digit numeric requirement (intentional defects)
SELECT
    UserID,
    FullName,
    MSISDN,
    LEN(MSISDN) AS Length,
    CASE 
        WHEN MSISDN NOT LIKE '[0-9]%' THEN 'Contains non-digits'
        WHEN LEN(MSISDN) <> 11 THEN 'Wrong length'
        ELSE 'Other issue'
    END AS IssueType
FROM Users
WHERE LEN(MSISDN) <> 11
    OR MSISDN NOT LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
ORDER BY UserID;

