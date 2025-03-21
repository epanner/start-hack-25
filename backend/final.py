import pandas as pd
from ast import literal_eval
from api_test import *
from newAPI_newspaper3k import newspaper_parser
import requests
import json
import re

# --------------------- PERPLEXITY API FUNCTIONS --------------------- #
API_KEY = "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"
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
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": "Be precise and concise."},
            {"role": "user", "content": query}
        ],
        "max_tokens": 1000,
        "temperature": 0.2,
        "top_p": 0.9,
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def parse_perplexity_message(message: str):
    """
    Parses the Perplexity output message into its separate components.
    Expects numbered actions with the following format:
    
    1. **Action Title:** <title>
       **Action Category:** <category>
       **Action Type:** <type>
       **Data Source:** <data source>
       **Brief Explanation:** <brief explanation>
    
    Returns a dictionary with keys like 'action_1', 'action_2', etc.
    """
    actions = {}
    # Find blocks that start with a number and a dot until the next such block or end of string.
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
            action["Brief Explanation"] = brief_match.group(1).strip().split("\n")[0].strip()
        actions[f"action_{i}"] = action
    return actions

def get_actions(prompt: str):
    """
    Calls the Perplexity API with the given prompt and returns a dictionary
    containing the parsed action suggestions.
    """
    response_json = perplexity_chat(prompt)
    if response_json and "choices" in response_json and len(response_json["choices"]) > 0:
        final_response = response_json["choices"][0]["message"]["content"]
        print("\nFinal Response String from Perplexity:")
        print(final_response)
        actions = parse_perplexity_message(final_response)
        return actions
    else:
        print("No valid response received from the API.")
        return None

# --------------------- PERPLEXITY CHAT CLASS --------------------- #
class PerplexityChat:
    """
    A class for an interactive chat session with the Perplexity API.
    Maintains conversation history and allows the wealth manager to ask follow-up questions.
    """
    def __init__(self, system_prompt="Be precise and concise. Use past conversation context when needed."):
        self.API_KEY = "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"
        self.BASE_URL = "https://api.perplexity.ai"
        self.conversation = [{"role": "system", "content": system_prompt}]
    
    def send_message(self, message: str) -> str:
        self.conversation.append({"role": "user", "content": message})
        response = self._call_api()
        if response and "choices" in response and len(response["choices"]) > 0:
            reply = response["choices"][0]["message"]["content"]
            self.conversation.append({"role": "assistant", "content": reply})
            return reply
        else:
            print("No valid response received from the API.")
            return None

    def _call_api(self) -> dict:
        url = f"{self.BASE_URL}/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "sonar-pro",
            "messages": self.conversation,
            "max_tokens": 1000,
            "temperature": 0.2,
            "top_p": 0.9,
        }
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()
        else:
            return None

    def get_history(self):
        return self.conversation

    def reset(self, system_prompt="Be precise and concise."):
        self.conversation = [{"role": "system", "content": system_prompt}]

# --------------------- CLIENT DATA AND ACTIONS SUGGESTIONS --------------------- #
# Load client data from CSV
df = pd.read_csv('clients_data.csv')
df['ActualPerformanceHistory'] = df['ActualPerformanceHistory'].apply(literal_eval)
df['ExpectedPerformanceHistory'] = df['ExpectedPerformanceHistory'].apply(literal_eval)
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
stocks = [s.strip() for s in row["PreferredStocks"].split(',')]
client_data["PreferredStocks"] = stocks

stocks_info = {}
for i, stock in enumerate(stocks):
    # api_data = json.loads(summary(stock)["object"])
    web_data = newspaper_parser(stock)
    stocks_info[stock] = {"web": web_data}
client_data["StocksInfo"] = stocks_info

# Build the prompt with stocks news first, then client details.
gpt_prompt = ""
for stock, info in stocks_info.items():
    gpt_prompt += (
        f"- {stock}:\n"
        f"   Web Data: {info['web']}\n"
    )
gpt_prompt += (
    f"Client: {client_data['Name']} (ID: {client_data['ClientID']})\n"
    f"Last Call: {client_data['LastCallDate']}, Vibes: {client_data['Vibes']}\n"
    f"Next Meeting: {client_data['NextAppointedMeeting']}\n"
    f"Performance History (Actual): {client_data['ActualPerformanceHistory']}\n"
    f"Performance History (Expected): {client_data['ExpectedPerformanceHistory']}\n"
    f"Stress Level: {client_data['StressLevel']}\n\n"
    f"Stocks Information:\n"
)
client_data["GPT_Prompt"] = gpt_prompt

# Create a detailed prompt to get 3 actions suggestions
detailed_prompt = client_data["GPT_Prompt"] + "\n\n" + \
    "Based on the above information, please provide the top 3 recommended actions that a wealth manager should consider. " \
    "The recommendations should be sorted in order of importance, with the most critical action first. Mention most importantly the stocks the client holds. Start with bad news first." \
    "For each action, include the following details:\n" \
    "1. **Action Title:** Give a precise title for the suggested action.\n" \
    "2. **Action Category:** Indicate whether this is a 'Financial Update', 'Emergency Market Situation/Crash', or 'Call/Meeting Preparation'.\n" \
    "3. **Action Type:** Suggest the mode of communication or meeting, such as 'email', 'phone call', or 'in-person meeting', depending on urgency.\n" \
    "4. **Data Source:** Specify the source of data that triggered this recommendation (for example, 'portfolio evolution', 'latest market news', 'crash indicators', or 'preplanned meeting data').\n" \
    "5. **Brief Explanation:** Provide a concise explanation for why this action is recommended, referencing the key client data and market insights.\n\n" \
    "Make sure that the info you provide is relevant, up-to-date and important\n\n" \
    "Please output exactly three distinct action points, clearly numbered and sorted by importance."

print("Requesting action suggestions from Perplexity...")
actions_result = get_actions(detailed_prompt)

if actions_result is None or len(actions_result) == 0:
    print("No actions suggestions received.")
    exit()

# Display the action suggestions in the terminal
print("\n--- Action Suggestions ---")
for key, action in actions_result.items():
    print(f"\n{key}:")
    for component, text in action.items():
        print(f"{component}: {text}")

# Prompt the wealth manager to choose one of the actions or choose 'other' for a general conversation.
choice = input("\nEnter the number of the action you choose (e.g., 1, 2, or 3), or type 'other' for a general chat: ").strip()

# Branch based on user choice.
if choice.lower() == "other":
    chosen_action = None
else:
    chosen_key = f"action_{choice}"
    if chosen_key not in actions_result:
        print("Invalid choice. Exiting.")
        exit()
    chosen_action = actions_result[chosen_key]

if chosen_action:
    print("\nYou have chosen:")
    for comp, val in chosen_action.items():
        print(f"{comp}: {val}")
else:
    print("\nYou have chosen to start a general conversation without selecting any specific action.")

# Build a context string with all client details and stocks info.
client_context = client_data["GPT_Prompt"]

# Start an interactive chat session with context about the client details.
chat_session = PerplexityChat(
    system_prompt=(
        "You are a financial expert assisting a wealth manager. "
        "Please remember the following client details throughout our conversation:\n\n" +
        client_context
    )
)

# Prepare the initial message based on the chosen option.
if chosen_action:
    init_message = (
        f"I have chosen the following action: {chosen_action}. "
        "Please help me understand how to best implement this action and answer any questions I may have."
    )
else:
    init_message = (
        "Hello, how can I help you today? I have the client details and the latest stocks news in mind."
    )

print("\n--- Initiating Discussion with Perplexity ---")
initial_reply = chat_session.send_message(init_message)
print("\nPerplexity:", initial_reply)

# Continue an interactive chat session in the terminal.
print("\nEnter your follow-up questions. Type 'exit' or 'quit' to end the session.\n")
while True:
    user_input = input("You: ")
    if user_input.strip().lower() in ['exit', 'quit']:
        print("Ending the session. Goodbye!")
        break
    reply = chat_session.send_message(user_input)
    if reply:
        print("\nPerplexity:", reply, "\n")
    else:
        print("\nNo response from Perplexity.\n")
