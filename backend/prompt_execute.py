import os
from flask import Flask, request, jsonify
from langchain_anthropic import ChatAnthropic
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from langgraph.prebuilt import create_react_agent
import requests
from web3 import Web3

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

# Initialize Web3
web3 = Web3(Web3.HTTPProvider(os.getenv('WEB3_PROVIDER_URL')))

def fetch_on_chain_data(address):
    covalent = Covalent(api_key=os.getenv('COVALENT_API_KEY'))
    response = covalent.get_transactions(address)
    return response

def detect_fraud(transactions):
    suspicious_transactions = []
    for tx in transactions:
        # Example logic: flag transactions with a value greater than a threshold
        if tx['value'] > 1000000000000000000:  # 1 ETH in Wei
            suspicious_transactions.append(tx)
    return suspicious_transactions

def get_coinbase_wallet_info(wallet_id):
    url = f"https://api.coinbase.com/v2/accounts/{wallet_id}"
    headers = {
        'Authorization': f'Bearer {os.getenv("COINBASE_API_KEY")}'
    }
    response = requests.get(url, headers=headers)
    return response.json()

@app.route('/api/send-token', methods=['POST'])
def send_token():
    data = request.get_json()
    prompt = data['prompt']
    to_address = data['to_address']
    amount = data['amount']
    private_key = os.getenv('WALLET_PRIVATE_KEY')
    from_address = web3.eth.account.privateKeyToAccount(private_key).address

    # Execute the action using agent_executor
    events = agent_executor.stream(
        {"messages": [("user", prompt)]},
        stream_mode="values"
    )
    
    # Collect the response
    response = []
    for event in events:
        response.append(event["messages"][-1].content)
    
    # Send token
    nonce = web3.eth.getTransactionCount(from_address)
    tx = {
        'nonce': nonce,
        'to': to_address,
        'value': web3.toWei(amount, 'ether'),
        'gas': 2000000,
        'gasPrice': web3.toWei('50', 'gwei')
    }
    signed_tx = web3.eth.account.signTransaction(tx, private_key)
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    
    return jsonify({"response": response, "tx_hash": web3.toHex(tx_hash)})

@app.route('/api/fraud-detection', methods=['POST'])
def fraud_detection():
    data = request.get_json()
    address = data['address']
    
    # Fetch on-chain data
    on_chain_data = fetch_on_chain_data(address)
    
    # Detect fraud
    suspicious_transactions = detect_fraud(on_chain_data['data']['items'])
    
    return jsonify({"suspicious_transactions": suspicious_transactions})

@app.route('/api/coinbase-wallet-info', methods=['POST'])
def coinbase_wallet_info():
    data = request.get_json()
    wallet_id = data['wallet_id']
    
    # Get wallet info from Coinbase API
    wallet_info = get_coinbase_wallet_info(wallet_id)
    
    return jsonify({"wallet_info": wallet_info})

if __name__ == '__main__':
    app.run(debug=True)