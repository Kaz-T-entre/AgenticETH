import requests
import env_vars
import os 

wallet_address = "0x5e7bb104d84c7cb9b682aac2f3d509f5f406809a"  # ここにウォレットアドレスを入力してください
apikey = os.getenv('GRAPH_API_KEY')
url = f"https://gateway.thegraph.com/api/{apikey}/subgraphs/id/GENunSHWLBXm59mBSgPzQ8metBEp9YDfdqwFr91Av1UM"
headers = {
    "Content-Type": "application/json"
}
data = {
    "query": f"""
    {{
        factories(where: {{ id: "{wallet_address}" }}) {{
            id
            poolCount
            totalVolumeUSD
            txCount
        }}
        
    }}
    """,
    "operationName": "Subgraphs",
    "variables": {}
}

response = requests.post(url, headers=headers, json=data)

print(response.json())