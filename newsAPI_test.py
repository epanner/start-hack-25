import requests
import logging
from bs4 import BeautifulSoup

def search_news(query, serpapi_api_key, num_results=5):
    """
    Uses SerpAPI's Google News engine to search for recent Nvidia-related news.
    Returns a list of up to `num_results` articles with title, snippet, and URL.
    """
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_news",  # Use Google News engine
        "q": query,
        "api_key": serpapi_api_key,
        "hl": "en",
        "gl": "us",
        "num": num_results  # Fetch up to num_results results
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error if request fails
        data = response.json()

        news_results = data.get("news_results", [])
        articles = []

        if news_results:
            # Iterate through results and collect up to `num_results` articles
            for result in news_results[:num_results]:
                title = result.get("title", "No Title")
                snippet = result.get("snippet", "No Snippet Available")
                date = result.get("date", "Unknown Date")
                link = result.get("link", "#")

                logging.info(f"Title: {title}, Date: {date}, URL: {link}")

                articles.append({
                    "title": title,
                    "snippet": snippet,
                    "url": link
                })

        if articles:
            return articles  # Return all collected articles

        logging.warning("No relevant news found.")
        return None

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching news: {e}")
        return None


def scrape_article(url):
    """
    Scrapes the main content of the article using BeautifulSoup.
    """
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            "Referer": "https://www.google.com/",
            "Accept-Language": "en-US,en;q=0.9"
        }
        
        session = requests.Session()
        session.headers.update(headers)

        response = session.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        # Extract article text from multiple possible containers
        paragraphs = soup.find_all(["p", "div"], class_=lambda x: x and "content" in x.lower())
        article_text = "\n".join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])

        return article_text.strip() if article_text else "No detailed article text found."

    except requests.exceptions.RequestException as e:
        logging.error(f"Error scraping article: {e}")
        return "Error retrieving article."


def main():
    # Set your API key here:
    SERPAPI_API_KEY = "Select_api_key"  # Replace with your SerpAPI key

    # Perform a news search for Nvidia stock decline
    query = "Nvidia stock decline latest news"
    news_articles = search_news(query, SERPAPI_API_KEY, num_results=5)

    if news_articles:
        print("\n🔍 **Latest Nvidia Stock News:**")
        for i, news in enumerate(news_articles, start=1):
            print(f"\n📌 **News {i}:**")
            print(f"📰 Title: {news['title']}")
            print(f"📄 Snippet: {news['snippet']}")
            print(f"🔗 Read more: {news['url']}")

            # Scrape full article content
            article_content = scrape_article(news["url"])
            print("\n📜 **Extracted Article Content:**\n")
            print(article_content[:1000])  # Limit display to first 1000 characters
            print("\n" + "-" * 80)  # Separator for readability

    else:
        print("\n⚠️ No relevant news found.\n")


if __name__ == "__main__":
    main()
