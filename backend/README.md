# Wealth AU - Financial Data Insight Platform

This project is part of the START Hack 2025 challenge, focusing on innovative human-AI interaction for financial data insights. The platform aims to provide wealth managers, portfolio managers, and financial analysts with real-time, user-friendly access to financial insights through various interactive methods.

## Features

- Real-time financial data analysis
- News aggregation and analysis
- Client data processing
- RAG (Retrieval-Augmented Generation) implementation
- API integration with financial data services

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd start-hack-25
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Project Structure

- `api_test.py` - API testing module
- `clients_data.csv` - Sample client data
- `newAPI_newspaper3k.py` - News API integration
- `newsAPI_test.py` - News API testing
- `parse_client.py` - Client data parsing
- `rag_test.py` - RAG implementation testing
- `search_from_data.py` - Data search functionality

## Usage

1. Ensure you have activated your virtual environment
2. Run the desired script based on your needs:

```bash
# For API testing
python api_test.py

# For news analysis
python newAPI_newspaper3k.py

# For client data processing
python parse_client.py

# For RAG testing
python rag_test.py

# For data search
python search_from_data.py
```

## API Integration

The project uses the following API endpoint:
```
https://idchat-api-containerapp01-dev.orangepebble-16234c4b.switzerlandnorth.azurecontainerapps.io/docs
```

## Dependencies

- requests
- newspaper3k
- beautifulsoup4
- pandas
- huggingface_hub
- lxml[html_clean]

## Contributing

This project is part of the START Hack 2025 challenge. Please refer to the problem statement for more details about the challenge and judging criteria.

## License

This project is part of the START Hack 2025 challenge and is subject to the challenge's terms and conditions. 