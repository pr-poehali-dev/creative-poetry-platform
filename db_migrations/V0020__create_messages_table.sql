CREATE TABLE IF NOT EXISTS t_p79443517_creative_poetry_plat.messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_created ON t_p79443517_creative_poetry_plat.messages (created_at DESC);