import pandas as pd
from ast import literal_eval
from api_test import *
from newAPI_newspaper3k import newspaper_parser
import openai
import os

import requests
import json
import re

# Replace with your actual Perplexity API key
API_KEY = "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"
# Use the documented base URL and endpoint
BASE_URL = "https://api.perplexity.ai"

def perplexity_chat(query: str):
    """
    Sends a chat query to the Perplexity API and returns the result.
    """
    url = f"{BASE_URL}/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
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
        "max_tokens": 1000,
        "temperature": 0.2,
        "top_p": 0.9,
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code, response.text)
        return None

def parse_perplexity_message(message: str):
    """
    Parses the Perplexity output message into its separate components.
    Expects the message to contain numbered actions with the following format:
    
    1. **Action Title:** <title>
       **Action Category:** <category>
       **Action Type:** <type>
       **Data Source:** <data source>
       **Brief Explanation:** <brief explanation>
    
    Returns a dictionary where each action (action_1, action_2, etc.) is a sub-dictionary.
    """
    actions = {}
    # Use regex to capture each numbered block: from a number+dot until the next number+dot or end-of-string.
    blocks = re.findall(r"(\d+\.\s+.*?)(?=\n\d+\.|$)", message, re.DOTALL)
    
    for i, block in enumerate(blocks, start=1):
        action = {}
        title_match = re.search(r"\*\*Action Title:\*\*\s*(.*)", block)
        if title_match:
            action["Action Title"] = title_match.group(1).strip()
        category_match = re.search(r"\*\*Action Category:\*\*\s*(.*)", block)
        if category_match:
            action["Action Category"] = category_match.group(1).strip()
        type_match = re.search(r"\*\*Action Type:\*\*\s*(.*)", block)
        if type_match:
            action["Action Type"] = type_match.group(1).strip()
        datasource_match = re.search(r"\*\*Data Source:\*\*\s*(.*)", block)
        if datasource_match:
            action["Data Source"] = datasource_match.group(1).strip()
        brief_match = re.search(r"\*\*Brief Explanation:\*\*\s*(.*)", block, re.DOTALL)
        if brief_match:
            # Capture until the first newline in the explanation to avoid extra text if present.
            action["Brief Explanation"] = brief_match.group(1).strip().split("\n")[0].strip()
        actions[f"action_{i}"] = action
    return actions

def get_actions(prompt: str):
    """
    Calls the Perplexity API with the given prompt and returns the parsed action results.
    The output is a dictionary containing the three actions with their individual components.
    """
    detailed_prompt = prompt + "\n\n" + \
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
    if response_json and "choices" in response_json and len(response_json["choices"]) > 0:
        final_response = response_json["choices"][0]["message"]["content"]
        print("Final Response String:")
        print(final_response)
        actions = parse_perplexity_message(final_response)
        return actions
    else:
        print("No valid response received from the API.")
        return None

    

def init_model(client_name):
    file_path = os.path.join("data", "clients_data.csv")
    df = pd.read_csv(file_path)

    # Filter for the specified client
    client_df = df[df['Name'] == client_name]

    # Ensure we found the client
    if client_df.empty:
        raise ValueError(f"Client '{client_name}' not found in the dataset.")

    # Extract single-row values correctly
    client_data = {
        "ClientID": client_df["ClientID"].iloc[0],
        "Name": client_df["Name"].iloc[0],
        "LastCallDate": client_df["LastCallDate"].iloc[0],
        "Vibes": client_df["Vibes"].iloc[0],
        "NextAppointedMeeting": client_df["NextAppointedMeeting"].iloc[0],
        "ActualPerformanceHistory": literal_eval(client_df["ActualPerformanceHistory"].iloc[0]),
        "ExpectedPerformanceHistory": literal_eval(client_df["ExpectedPerformanceHistory"].iloc[0]),
        "StressLevel": client_df["StressLevel"].iloc[0],
    }

    # Split and clean the list of preferred stocks
    client_data["PreferredStocks"] = [s.strip() for s in client_df["PreferredStocks"].iloc[0].split(',')]
    stocks = [s.strip() for s in client_df["PreferredStocks"].iloc[0].split(',')]

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

    # Assume client_prompt is generated by your search_from_data.py
    client_prompt = client_data["GPT_Prompt"]

    # --- Call get_actions to retrieve the parsed actions ---
    actions_result = get_actions(client_prompt)
    print("\nParsed Actions:")
    print(json.dumps(actions_result, indent=2))

    return actions_result


print(init_model("John Doe"))