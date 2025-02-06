from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
import env_vars

# Initialize CDP wrapper
cdp = CdpAgentkitWrapper()

# Create toolkit from wrapper
toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)

# Get available tools
tools = toolkit.get_tools()
for tool in tools:
    print(tool.name)
from langchain_openai import ChatOpenAI  # Change import to OpenAI
from langchain_anthropic import ChatAnthropic  # Change import to Anthropic
from langgraph.prebuilt import create_react_agent

# Initialize LLM
llm = ChatOpenAI(model="gpt-4o-mini")  # Change model to OpenAI's model

# Get tools and create agent
tools = toolkit.get_tools()
agent_executor = create_react_agent(llm, tools)

# Example usage
prompt = "Send 100 USD to john2879.base.eth"
events = agent_executor.stream(
    {"messages": [("user", prompt)]},
    stream_mode="values"
)

for event in events:
    event["messages"][-1].pretty_print()