UPDATE t_p79443517_creative_poetry_plat.poems
SET text = REPLACE(text, 'ФВА', 'Валентина Фастовщук')
WHERE text LIKE '%ФВА%';

UPDATE t_p79443517_creative_poetry_plat.poems
SET excerpt = REPLACE(excerpt, 'ФВА', 'Валентина Фастовщук')
WHERE excerpt LIKE '%ФВА%';