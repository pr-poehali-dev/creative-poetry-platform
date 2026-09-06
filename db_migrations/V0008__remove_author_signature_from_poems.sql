UPDATE t_p79443517_creative_poetry_plat.poems
SET text = TRIM(BOTH E'\n ' FROM REPLACE(text, 'Валентина Фастовщук', ''))
WHERE text LIKE '%Валентина Фастовщук%';

UPDATE t_p79443517_creative_poetry_plat.poems
SET excerpt = TRIM(BOTH E'\n ' FROM REPLACE(excerpt, 'Валентина Фастовщук', ''))
WHERE excerpt LIKE '%Валентина Фастовщук%';