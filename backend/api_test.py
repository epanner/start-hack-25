import requests
import json

BASE_URL = "https://idchat-api-containerapp01-dev.orangepebble-16234c4b.switzerlandnorth.azurecontainerapps.io"

def get_response(query: str):
    
    url = f"{BASE_URL}/query?query={query}"
    response = requests.post(url)
    return response.json()

def searchwithcriteria(query):
    url = ("https://idchat-api-containerapp01-dev.orangepebble-16234c4b."
           "switzerlandnorth.azurecontainerapps.io//searchwithcriteria"
           f"?query={query}")
    response = requests.post(url)
    return response.json()

def ohlcv(query, first="01.01.2024", last=None):
    url = f"{BASE_URL}/ohlcv"
    params = {"query": query, "first": first}
    if last:
        params["last"] = last
    response = requests.post(url, params=params)
    return response.json()

def companydatasearch(query:str):
    url = ("https://idchat-api-containerapp01-dev.orangepebble-16234c4b."
           "switzerlandnorth.azurecontainerapps.io//companydatasearch"
           f"?query={query}")
    response = requests.post(url)
    return response.json()

def summary(query:str):
    url = ("https://idchat-api-containerapp01-dev.orangepebble-16234c4b."
           "switzerlandnorth.azurecontainerapps.io//summary"
           f"?query={query}")
    response = requests.post(url)
    return response.json()

if __name__ == "__main__":
    # In the comments are possible calls for the api functions
    
    #sample_query = "Nvidia"
    #result = summary(sample_query)
    
    #sample_query = {"Caixabank": "number of employees|2023", "BBVA": "number of employees|2023"}
    #result = companydatasearch(json.dumps(sample_query))


    #sample_query = "banco santander"
    #result = ohlcv(sample_query, first="01.01.2024", last="01.12.2024")

    #sample_query = {"ebitda": "is positive", "employees": "more than 10000"}
    #result = searchwithcriteria(json.dumps(sample_query))

    sample_query = "ASML"
    result = summary(sample_query)
    
    
    print("Response from get_response:")
    print(json.dumps(result, indent=2))
