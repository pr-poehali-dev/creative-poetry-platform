CREATE TABLE t_p79443517_creative_poetry_plat.poems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    excerpt TEXT DEFAULT '',
    category VARCHAR(100) DEFAULT 'Лирика',
    year VARCHAR(10) DEFAULT '2024',
    has_audio BOOLEAN DEFAULT FALSE,
    has_video BOOLEAN DEFAULT FALSE,
    audio_url TEXT DEFAULT '',
    video_url TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);