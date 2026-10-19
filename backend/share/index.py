import os
from html import escape

import psycopg2

SCHEMA = "t_p79443517_creative_poetry_plat"
HOST = "https://xn--80aafbmbrabbcsi6agnbewlkddjhici5ayio0mni.xn--p1ai"
SITE_NAME = "Христианские стихотворения"
DEFAULT_IMAGE = "https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/og-image-1792423529444.jpg"
DEFAULT_DESC = "Христианские стихотворения семьи Фастовщук. Стихи о вере, Божьей любви, утешении и вечности."


def first_lines(text: str, count: int = 4) -> str:
    lines = [l.strip() for l in (text or "").split("\n") if l.strip()][:count]
    out = "\n".join(lines)
    if len(out) > 280:
        out = out[:277].rstrip()
    return out + "…"


def absolute(url: str) -> str:
    if not url:
        return DEFAULT_IMAGE
    if url.startswith("http"):
        return url
    return HOST + (url if url.startswith("/") else "/" + url)


def render(title: str, description: str, image: str, target: str) -> str:
    t, d, i = escape(title), escape(description), escape(image)
    return f"""<!DOCTYPE html>
<html lang="ru"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{t} | {SITE_NAME}</title>
<meta name="description" content="{d}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="{SITE_NAME}">
<meta property="og:locale" content="ru_RU">
<meta property="og:url" content="{escape(target)}">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<meta property="og:image" content="{i}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}">
<meta name="twitter:description" content="{d}">
<meta name="twitter:image" content="{i}">
<meta http-equiv="refresh" content="0; url={escape(target)}">
<script>location.replace({target!r});</script>
</head><body style="font-family:Georgia,serif;background:#fdf6e9;text-align:center;padding:3rem 1rem">
<a href="{escape(target)}" style="color:#a57c42">{t}</a></body></html>"""


def handler(event: dict, context) -> dict:
    """Страница-превью стихотворения для Telegram и WhatsApp: название, первые строки и картинка, затем переход на сайт."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    params = event.get("queryStringParameters") or {}
    raw_id = str(params.get("id") or "")
    headers = {"Access-Control-Allow-Origin": "*", "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300"}

    row = None
    if raw_id.isdigit():
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute(f"SELECT id, title, text, author, image_url FROM {SCHEMA}.poems WHERE id = {int(raw_id)}")
        row = cur.fetchone()
        cur.close()
        conn.close()

    if not row:
        body = render(SITE_NAME, DEFAULT_DESC, DEFAULT_IMAGE, HOST + "/")
        return {"statusCode": 200, "headers": headers, "body": body}

    poem_id, title, text, author, image_url = row
    desc = first_lines(text) + (f"\n— {author}" if author else "")
    body = render(title, desc, absolute(image_url), f"{HOST}/#/poems/{poem_id}")
    return {"statusCode": 200, "headers": headers, "body": body}
