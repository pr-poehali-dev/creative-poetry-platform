UPDATE t_p79443517_creative_poetry_plat.poems
SET text = TRIM(BOTH E'\n ' FROM REPLACE(text, '09.09.23', ''))
WHERE id = 4;

UPDATE t_p79443517_creative_poetry_plat.poems
SET excerpt = TRIM(BOTH E'\n ' FROM REPLACE(excerpt, '09.09.23', ''))
WHERE id = 4 AND excerpt LIKE '%09.09.23%';