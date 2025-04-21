import os
import asyncio
import time
import re
import feedparser
import httpx
from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_caching import Cache
from datetime import datetime

app = Flask(__name__,
            static_folder='../',
            template_folder='../templates')
app.config["CACHE_TYPE"] = "SimpleCache"
app.config["CACHE_DEFAULT_TIMEOUT"] = 300
cache = Cache(app)

# Source: The Guardian World RSS
THE_GUARDIAN_FEED = "https://www.theguardian.com/world/rss"

# كلمات محظورة لتصفية الأخبار
BANNED_KEYWORDS = ["israel", "occupation", "palestine"]

def extract_image(entry):
    if "media_content" in entry:
        media = entry["media_content"]
        if isinstance(media, list) and media:
            return media[0].get("url")
    if "links" in entry:
        for link in entry["links"]:
            if link.get("type", "").startswith("image"):
                return link.get("href")
    return None

def get_published_datetime(entry):
    if "published_parsed" in entry and entry.published_parsed:
        return datetime.fromtimestamp(time.mktime(entry.published_parsed))
    elif "updated_parsed" in entry and entry.updated_parsed:
        return datetime.fromtimestamp(time.mktime(entry.updated_parsed))
    return datetime.now()

def clean_text(text):
    if text:
        # إزالة عبارات غير مرغوبة
        for phrase in ["Continue Reading", "Read more", "continue reading", "Continue reading..."]:
            text = text.replace(phrase, "")
        # إزالة كتل <ul> مع محتواها بالكامل
        text = re.sub(r'<ul.*?</ul>', '', text, flags=re.DOTALL)
        # إزالة عناصر <li>
        text = re.sub(r'<li[^>]*>', '', text)
        text = re.sub(r'</li>', '', text)
        # استبدال عناصر <a> بعرض النص الداخلي فقط
        text = re.sub(r'<a\s+[^>]*>(.*?)</a>', r'\1', text)
    return text.strip()

def is_blocked(article):
    combined = (article.get("title", "") + " " + article.get("description", "")).lower()
    for banned in BANNED_KEYWORDS:
        if banned in combined:
            return True
    return False

async def fetch_feed(feed_url: str):
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(feed_url)
            response.raise_for_status()
            return feedparser.parse(response.text)
    except Exception as e:
        print(f"Error fetching {feed_url}: {e}")
        return None

async def fetch_articles():
    data = await fetch_feed(THE_GUARDIAN_FEED)
    articles = []
    if data and data.entries:
        for entry in data.entries:
            published_dt = get_published_datetime(entry)
            desc = clean_text(entry.get("summary", ""))
            if "summary_detail" in entry and entry["summary_detail"].get("value"):
                desc = clean_text(entry["summary_detail"]["value"])
            content = desc
            if "content" in entry and isinstance(entry["content"], list) and entry["content"]:
                content = clean_text(entry["content"][0].get("value", desc))
            article = {
                "title": entry.get("title", "").strip(),
                "description": desc,
                "content": content,
                "published": published_dt.isoformat(),
                "image": extract_image(entry)
            }
            if not is_blocked(article):
                articles.append(article)
    # ترتيب المقالات حسب التاريخ (الأحدث أولاً)
    articles.sort(key=lambda x: x["published"], reverse=True)
    seen = set()
    unique_articles = []
    for art in articles:
        if art["title"] and art["title"] not in seen:
            unique_articles.append(art)
            seen.add(art["title"])
    return unique_articles  # لا حد أقصى؛ infinite scroll حتى انتهاء المقالات

def filter_articles(articles, country):
    if not country:
        return articles
    filtered = []
    for art in articles:
        text = (art["title"] + " " + art["description"]).lower()
        if country.lower() in text:
            filtered.append(art)
    return filtered

@app.route("/news")
async def index():
    country = request.args.get("country", "")
    return render_template("news.html", country=country)

@app.route("/api/articles")
async def get_articles():
    try:
        offset = int(request.args.get("offset", 0))
    except ValueError:
        offset = 0
    country = request.args.get("country", "")
    cache_key = f"collepedia_news_{country}"
    articles = cache.get(cache_key)
    if articles is None:
        articles = await fetch_articles()
        articles = filter_articles(articles, country)
        cache.set(cache_key, articles)
    result = articles[offset:offset+10]
    return jsonify(result)

@app.route('/')
def root_index():
    try:
        return send_from_directory(app.static_folder, 'index.html')
    except FileNotFoundError:
        return "Error: index.html not found in project root", 404

@app.route('/<path:filename>')
def serve_other_static(filename):
    try:
        return send_from_directory(app.static_folder, filename)
    except FileNotFoundError:
        return "File not found", 404


if __name__ == "__main__":
    app.run(debug=True)
