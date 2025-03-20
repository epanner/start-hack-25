import requests
import logging
from newspaper import Article

def search_news(query, serpapi_api_key, num_results=5):
    """
    Uses SerpAPI's Google News engine to search for recent Nvidia-related news.
    Returns a list of up to `num_results` articles with title, snippet, and URL.
    """
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_news",  # Use the Google News engine
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

def extract_article(url):
    """
    Uses Newspaper3k to extract the full content of the article from the URL.
    This function automatically downloads, parses, and extracts the main text.
    """
    try:
        article = Article(url)
        article.download()
        article.parse()
        return article.text if article.text else "No article content found."
    except Exception as e:
        logging.error(f"Error extracting article: {e}")
        return "Error retrieving article."

def newspaper_parser(query):
    # Set your API key here:
    SERPAPI_API_KEY = "select_key"  # Replace with your SerpAPI key

    # Perform a news search for the given query
    news_articles = search_news(query, SERPAPI_API_KEY, num_results=5)
    
    # Initialize a list to collect output strings
    output = []

    if news_articles:
        output.append("\n🔍 **Latest Nvidia Stock News:**")
        for i, news in enumerate(news_articles, start=1):
            output.append(f"\n📌 **News {i}:**")
            output.append(f"📰 Title: {news['title']}")
            output.append(f"📄 Snippet: {news['snippet']}")
            output.append(f"🔗 Read more: {news['url']}")
            
            # Extract full article content using Newspaper3k
            article_content = extract_article(news["url"])
            output.append("\n📜 **Extracted Article Content:**\n")
            output.append(article_content[:1000])  # Limit to first 1000 characters for brevity
            output.append("\n" + "-" * 80)  # Separator for readability
    else:
        output.append("\n⚠️ No relevant news found.\n")
    
    # Return the combined output as a single string
    return "\n".join(output)
