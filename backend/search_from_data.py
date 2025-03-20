import pandas as pd
from ast import literal_eval
from api_test import *
from newAPI_newspaper3k import newspaper_parser
import openai

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
        "max_tokens": 1000,
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


# --- Load and process the CSV data ---
df = pd.read_csv('clients_data.csv')

# Parse the performance history arrays stored as JSON-like strings
df['ActualPerformanceHistory'] = df['ActualPerformanceHistory'].apply(literal_eval)
df['ExpectedPerformanceHistory'] = df['ExpectedPerformanceHistory'].apply(literal_eval)

# Process each client individually
clients_analysis = []
row = df.iloc[0]

client_data = {
    "ClientID": row["ClientID"],
    "Name": row["Name"],
    "LastCallDate": row["LastCallDate"],
    "Vibes": row["Vibes"],
    "NextAppointedMeeting": row["NextAppointedMeeting"],
    "ActualPerformanceHistory": row["ActualPerformanceHistory"],
    "ExpectedPerformanceHistory": row["ExpectedPerformanceHistory"],
    "StressLevel": row["StressLevel"],
}
print("27")

# Split and clean the list of preferred stocks
stocks = [s.strip() for s in row["PreferredStocks"].split(',')]
client_data["PreferredStocks"] = stocks

# For each stock, fetch data from both the API and web search
stocks_info = {}
i = 0
for stock in stocks:
    print(i)
    i += 1
    api_data = json.loads(summary(stock)["object"])
    print("summary")
    web_data = newspaper_parser(stock)
    print("news")

    stocks_info[stock] = {"api": api_data, "web": web_data}

# Add the stock information to the client's data
client_data["StocksInfo"] = stocks_info

# Optionally: Combine this into a prompt string for GPT analysis
# (This is an example of how you might structure the prompt.)
gpt_prompt = (
    f"Client: {client_data['Name']} (ID: {client_data['ClientID']})\n"
    f"Last Call: {client_data['LastCallDate']}, Vibes: {client_data['Vibes']}\n"
    f"Next Meeting: {client_data['NextAppointedMeeting']}\n"
    f"Performance History (Actual): {client_data['ActualPerformanceHistory']}\n"
    f"Performance History (Expected): {client_data['ExpectedPerformanceHistory']}\n"
    f"Stress Level: {client_data['StressLevel']}\n\n"
    f"Stocks Information:\n"
)
for stock, info in stocks_info.items():
    gpt_prompt += (
        f"- {stock}:\n"
        f"   API Data: {info['api']}\n"
        f"   Web Data: {info['web']}\n"
    )

client_data["GPT_Prompt"] = gpt_prompt
clients_analysis.append(client_data)

# For demonstration, print the prompt for each client
for client in clients_analysis:
    print("-----")
    print(client["GPT_Prompt"])

# Assume client_prompt is generated by your search_from_data.py
client_prompt = client_data["GPT_Prompt"]
detailed_prompt = client_prompt + "\n\n" + \
    "Based on the above information, please provide the top 3 recommended actions that a wealth manager should consider. " \
    "The recommendations should be sorted in order of importance, with the most critical action first. " \
    "For each action, include the following details:\n" \
    "1. **Action Title:** Give a precise title for the suggested action.\n" \
    "2. **Action Category:** Indicate whether this is a 'Financial Update', 'Emergency Market Situation/Crash', or 'Call/Meeting Preparation'.\n" \
    "3. **Action Type:** Suggest the mode of communication or meeting, such as 'email', 'phone call', or 'in-person meeting', depending on urgency.\n" \
    "4. **Data Source:** Specify the source of data that triggered this recommendation (for example, 'portfolio evolution', 'latest market news', 'crash indicators', or 'preplanned meeting data').\n" \
    "5. **Brief Explanation:** Provide a concise explanation for why this action is recommended, referencing the key client data and market insights.\n\n" \
    "Please output exactly three distinct action points, clearly numbered and sorted by importance."

response_json = perplexity_chat(detailed_prompt)

# Extract the final string response from the returned JSON
# (Assuming the API returns a structure similar to: {"choices": [{"message": {"content": "your answer here"}}]})
if response_json and "choices" in response_json and len(response_json["choices"]) > 0:
    final_response = response_json["choices"][0]["message"]["content"]
    print("Final Response String:")
    print(final_response)
else:
    print("No valid response received from the API.")