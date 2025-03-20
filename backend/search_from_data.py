import pandas as pd
from ast import literal_eval
from api_test import *
from newAPI_newspaper3k import newspaper_parser

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
    api_data = summary(stock)
    web_data = newspaper_parser(stock)
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
