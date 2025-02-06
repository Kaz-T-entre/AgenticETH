import os
from flask import Flask, request, jsonify
from langchain_anthropic import ChatAnthropic
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from langgraph.prebuilt import create_react_agent
import requests

# Import environment variables
import env_vars

app = Flask(__name__)

# Initialize the LLM
llm = ChatAnthropic(model="claude-3-5-sonnet-20240620")

# Initialize CDP AgentKit wrapper
cdp = CdpAgentkitWrapper()

# Create toolkit from wrapper
cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

# Get the tools
tools = cdp_toolkit.get_tools()
agent_executor = create_react_agent(llm, tools)

# Print available tools for debugging
print(tools)

def fetch_on_chain_data(address):
    url = f"https://api.covalenthq.com/v1/1/address/{address}/transactions_v2/"
    params = {
        'key': os.getenv('COVALENT_API_KEY')
    }
    response = requests.get(url, params=params)
    return response.json()

def detect_fraud(transactions):
    suspicious_transactions = []
    for tx in transactions:
        # Example logic: flag transactions with a value greater than a threshold
        if tx['value'] > 1000000000000000000:  # 1 ETH in Wei
            suspicious_transactions.append(tx)
    return suspicious_transactions

@app.route('/api/send-token', methods=['POST'])
def send_token():
    data = request.get_json()
    prompt = data['prompt']
    
    # Execute the action using agent_executor
    events = agent_executor.stream(
        {"messages": [("user", prompt)]},
        stream_mode="values"
    )
    
    # Collect the response
    response = []
    for event in events:
        response.append(event["messages"][-1].content)
    
    return jsonify({"response": response})

@app.route('/api/fraud-detection', methods=['POST'])
def fraud_detection():
    data = request.get_json()
    address = data['address']
    
    # Fetch on-chain data
    on_chain_data = fetch_on_chain_data(address)
    
    # Detect fraud
    suspicious_transactions = detect_fraud(on_chain_data['data']['items'])
    
    return jsonify({"suspicious_transactions": suspicious_transactions})

if __name__ == '__main__':
    app.run(debug=True)