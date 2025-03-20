import pandas as pd
from ast import literal_eval

# Load the CSV file
df = pd.read_csv('clients_data.csv')

# Parse the string representations of the performance history arrays into Python lists
df['ActualPerformanceHistory'] = df['ActualPerformanceHistory'].apply(literal_eval)
df['ExpectedPerformanceHistory'] = df['ExpectedPerformanceHistory'].apply(literal_eval)

# Display the filtered DataFrame with performance tracking columns
columns_of_interest = ['ClientID', 'Name', 'LastCallDate', 'Vibes', 'NextAppointedMeeting', 
                       'ActualPerformanceHistory', 'ExpectedPerformanceHistory', 'StressLevel', 'PreferredStocks']
df_filtered = df[columns_of_interest]
print("Filtered Client Data with Performance Histories:")
print(df_filtered)

# Extract unique stocks/investments from the PreferredStocks column
all_stocks = (df['PreferredStocks']
              .str.split(',')
              .explode()
              .str.strip()
              .unique())
print("\nUnique Stocks/Investments to Analyze:")
print(all_stocks)
