import requests
import json

# Replace with your actual Perplexity API key
API_KEY = "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"
# Use the documented base URL and endpoint
BASE_URL = "https://api.perplexity.ai"

def perplexity_chat(query: str):
    """
    Sends a chat query to the Perplexity API and returns the result.
    """
    # The endpoint as per the documentation
    url = f"{BASE_URL}/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Construct the payload according to the docs
    payload = {
        "model": "sonar-pro",  # Use the desired model (e.g., sonar-pro, sonar, etc.)
        "messages": [
            {
                "role": "system",
                "content": "Be precise and concise."
            },
            {
                "role": "user",
                "content": query
            }
        ],
        # Optionally include parameters like max_tokens, temperature, and top_p
        "max_tokens": 123,
        "temperature": 0.2,
        "top_p": 0.9,
        # Optionally, you can include search filters or response_format options
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code, response.text)
        return None

