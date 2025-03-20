import requests
from huggingface_hub import InferenceClient
import logging

def search_news(query, serpapi_api_key):
    """
    Uses SerpAPI's Google News engine to search for recent news.
    Returns a snippet from the first news result.
    """
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_news",  # Use the Google News engine for news results
        "q": query,
        "api_key": serpapi_api_key,
        "hl": "en",
        "gl": "us",
        "num": 5  # Fetch up to 5 results
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()
    news_results = data.get("news_results", [])
    if news_results:
        # Iterate through results to find the most relevant snippet
        for result in news_results:
            title = result.get("title", "")
            snippet = result.get("snippet", "")
            date = result.get("date", "")
            logging.info(f"Title: {title}, Date: {date}")
            if "Nvidia" in title or "Nvidia" in snippet:
                return f"{title}: {snippet}"
    logging.warning("No relevant news found.")
    return "No relevant news found."

def main():
    # Set your API keys here:
    HF_TOKEN = "Select_hf_key"                 # Replace with your Hugging Face token

    # Perform a news search for Nvidia stock decline
    query = "Nvidia stock decline latest news"
    news_snippet = search_news(query, SERPAPI_API_KEY)
    
    # Refine the prompt for clarity and context
    prompt = (
        "You are a financial analyst with no prior knowledge about Nvidia except for the following news snippet. "
        "Use only the information provided below to analyze the situation. If the snippet does not clearly state that Nvidia's stock is declining, "
        "suggest possible reasons for a decline or state that there is not enough information."
        "\n\nNews Snippet: \"{news_snippet}\"\n\n"
        "Based solely on the above snippet, explain concisely why Nvidia's stock might be declining recently. "
        "Answer in one concise paragraph."
    )
    print(news_snippet)
    
    print("Prompt:\n", prompt)
    
    # Initialize the InferenceClient with a manageable model
    client = InferenceClient(model="EleutherAI/gpt-neo-2.7B", token=HF_TOKEN)
    
    # Adjust model parameters for better output
    result = client.text_generation(
        prompt,
        max_new_tokens=100,  # Increase token generation for more detailed responses
        temperature=0.5,  # Lower temperature for more deterministic output
        top_p=0.8  # Adjust top_p for better diversity
    )
    
    print("\nGenerated Answer:\n", result)

if __name__ == "__main__":
    main()
