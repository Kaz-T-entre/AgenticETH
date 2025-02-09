from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
import env_vars
# Initialize CDP wrapper
cdp = CdpAgentkitWrapper()

# Create toolkit from wrapper
toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o-mini")

# Get tools and create agent
tools = toolkit.get_tools()
agent_executor = create_react_agent(llm, tools)
query_prompt = "Send 0.0005 ETH to 0xA2dBbc0EAE6c0402BF2E59d5A100dD7C9395539a"
query_prompt += " use the address_reputation function to check the reputation of the address. If the address is suspicious print True, otherwise print False. And check about it to user"
# Example usage
events = agent_executor.stream(
    {"messages": [("user", query_prompt)]},
    stream_mode="values"
)

for event in events:
    last_message = event["messages"][-1].content
    if "suspicious" in last_message:
        bool_val = True
    else:
        bool_val = False


print(bool_val)