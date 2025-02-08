from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
import env_vars

# Initialize CDP wrapper
cdp = CdpAgentkitWrapper()

# Create toolkit from wrapper
toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

# Get available tools
tools = toolkit.get_tools()
from langchain_openai import ChatOpenAI  # Change import to OpenAI
from langchain_anthropic import ChatAnthropic  # Change import to Anthropic
from langgraph.prebuilt import create_react_agent

from langgraph.prebuilt import create_react_agent

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o-mini")  # Change model to OpenAI's model

# Get tools and create agent
tools = toolkit.get_tools()
agent_executor = create_react_agent(llm, tools)

# Function to read file content
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Read transaction history and blacklist
transaction_history = read_file('./tx_history.txt')
blacklist = read_file('./blacklist.txt')

# Example usage
prompt = f"""
Check if the following transaction is suspicious based on the blacklist:
Transaction History:
{transaction_history}

Blacklist:
{blacklist}

Respond with 'true' if any transaction is suspicious, otherwise respond with 'false'.
Ensure the response is in the format: **Final Response**: true or **Final Response**: false
Rnsure that the sentence of **Final Response**: true or **Final Response**: false is just one time.

"""
events = agent_executor.stream(
    {"messages": [("user", prompt)]},
    stream_mode="values"
)

for event in events:
    response = event["messages"][-1].content
    if "**Final Response**: true" in response:
        bool_value = True
    elif "**Final Response**: false" in response:
        bool_value = False

print(bool_value)