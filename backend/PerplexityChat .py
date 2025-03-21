import requests
import json

class PerplexityChat:
    """
    A class to handle interactive chat sessions with the Perplexity API.
    
    Attributes:
        API_KEY (str): Your Perplexity API key.
        BASE_URL (str): The base URL for the Perplexity API.
        conversation (list): The list of messages (as dictionaries) that represent the conversation history.
    """
    def __init__(self, system_prompt="Be precise and concise."):
        self.API_KEY = "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"
        self.BASE_URL = "https://api.perplexity.ai"
        # Start with a system message that sets the context
        self.conversation = [{"role": "system", "content": system_prompt}]
    
    def send_message(self, message: str) -> str:
        """
        Sends a message along with the full conversation history to the Perplexity API.
        
        Args:
            message (str): The new message from the user.
        
        Returns:
            str: The assistant's reply.
        """
        # Append the new user message
        self.conversation.append({"role": "user", "content": message})
        # Call the API with the full conversation history
        response = self._call_api()
        if response and "choices" in response and len(response["choices"]) > 0:
            reply = response["choices"][0]["message"]["content"]
            # Save the assistant's reply in the conversation history
            self.conversation.append({"role": "assistant", "content": reply})
            return reply
        else:
            print("No valid response received from the API.")
            return None
    
    def _call_api(self) -> dict:
        """
        Internal method that sends the conversation history to the Perplexity API.
        
        Returns:
            dict: The JSON response from the API.
        """
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
            print("Error:", response.status_code, response.text)
            return None

    def get_history(self) -> list:
        """
        Retrieves the entire conversation history.
        
        Returns:
            list: The conversation as a list of message dictionaries.
        """
        return self.conversation

    def reset(self, system_prompt="Be precise and concise."):
        """
        Resets the conversation history, optionally updating the system prompt.
        
        Args:
            system_prompt (str): The new system prompt to start the conversation.
        """
        self.conversation = [{"role": "system", "content": system_prompt}]

if __name__ == "__main__":
    # Initialize a chat session with a system prompt
    chat_session = PerplexityChat(system_prompt="Be precise and concise. Use past conversation context when needed.")
    
    print("Interactive Perplexity Chat Session")
    print("Type your message and press Enter. Type 'exit' or 'quit' to end the session.\n")
    
    while True:
        user_input = input("You: ")
        if user_input.strip().lower() in ['exit', 'quit']:
            print("Exiting the chat session. Goodbye!")
            break
        response = chat_session.send_message(user_input)
        if response is not None:
            print("\nPerplexity:", response, "\n")
        else:
            print("\nNo response from Perplexity.\n")
