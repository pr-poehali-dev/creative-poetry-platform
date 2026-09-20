import json
import os
from xml.sax.saxutils import escape

import psycopg2

SCHEMA = "t_p79443517_creative_poetry_plat"
DEFAULT_HOST = "https://hristianskiestihotvoreniya.ru"

SECTIONS = [
    ("", "1.0", "weekly"),
    ("#/poems", "0.9", "weekly"),
    ("#/about", "0.6", "monthly"),
    ("#/contacts", "0.5", "monthly"),
]


def handler(event: dict, context) -> dict:
    """Карта сайта (sitemap.xml) со всеми разделами и стихотворениями для поисковых систем."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    params = event.get("queryStringParameters") or {}
    host = str(params.get("host") or DEFAULT_HOST).rstrip("/")
    if not host.startswith("http"):
        host = "https://" + host

    rows = []
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        f"SELECT id, to_char(COALESCE(updated_at, created_at), 'YYYY-MM-DD') "
        f"FROM {SCHEMA}.poems ORDER BY id"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    parts = ['<?xml version="1.0" encoding="UTF-8"?>']
    parts.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for path, priority, freq in SECTIONS:
        loc = host + "/" + path
        parts.append(
            f"<url><loc>{escape(loc)}</loc>"
            f"<changefreq>{freq}</changefreq>"
            f"<priority>{priority}</priority></url>"
        )

    for poem_id, lastmod in rows:
        loc = f"{host}/#/poems/{poem_id}"
        lm = f"<lastmod>{lastmod}</lastmod>" if lastmod else ""
        parts.append(
            f"<url><loc>{escape(loc)}</loc>{lm}"
            f"<changefreq>monthly</changefreq><priority>0.8</priority></url>"
        )

    parts.append("</urlset>")

    if str(params.get("format", "")).lower() == "json":
        return {
            "statusCode": 200,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": json.dumps({"urls": len(SECTIONS) + len(rows)}, ensure_ascii=False),
        }

    return {
        "statusCode": 200,
        "headers": {**cors, "Content-Type": "application/xml; charset=utf-8"},
        "body": "\n".join(parts),
    }
