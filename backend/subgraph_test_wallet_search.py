import requests
import os 
import env_vars

apikey = os.getenv('GRAPH_API_KEY')
url = f"https://gateway.thegraph.com/api/{apikey}/subgraphs/id/9sVPwghMnW4XkFTJV7T53EtmZ2JdmttuT5sRQe6DXhrq"
headers = {
    "Content-Type": "application/json"
}
data = {
    "query": """
    {
      domains(first: 5) {
        id
        name
        labelName
        labelhash
      }
      transfers(first: 5) {
        id
        domain {
          id
        }
        blockNumber
        transactionID
      }
    }
    """,
    "operationName": "Subgraphs",
    "variables": {}
}

response = requests.post(url, headers=headers, json=data)

print(response.json())

