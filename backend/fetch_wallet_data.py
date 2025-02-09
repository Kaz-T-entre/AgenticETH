from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import env_vars
load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini")

# Define the new Pydantic model
class EthTransaction(BaseModel):
    amount: float = Field(..., description="Amount of ETH to send")
    who: str = Field(..., description="Recipient of the ETH")

# Create a PydanticOutputParser for the new model
output_parser = PydanticOutputParser(pydantic_object=EthTransaction)

# Generate format_instructions
format_instructions = output_parser.get_format_instructions()

# Prompt template
prompt_template = ChatPromptTemplate(
    [
        (
            "system",
            """You are an AI agent that helps with Ethereum transactions. Please provide the transaction details in the following format:
            
            {format_instructions}""",
        ),
        ("human", "{user_input}"),
    ]
)
# Insert format_instructions into the template
prompt = prompt_template.partial(format_instructions=format_instructions)
chain = prompt | llm | output_parser
query_prompt = "Send 0.0005 ETH to 0xA2dBbc0EAE6c0402BF2E59d5A100dD7C9395539a"
# Example usage
result = chain.invoke({"user_input": query_prompt})
print(result)



'''
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini")

# Define the new Pydantic model
class EthTransaction(BaseModel):
    amount: float = Field(..., description="Amount of ETH to send")
    who: str = Field(..., description="Recipient of the ETH")

# Create a PydanticOutputParser for the new model
output_parser = PydanticOutputParser(pydantic_object=EthTransaction)

# Generate format_instructions
format_instructions = output_parser.get_format_instructions()

# Prompt template
prompt_template = ChatPromptTemplate(
    [
        (
            "system",
            """You are an AI agent that helps with Ethereum transactions. Please provide the transaction details in the following format:
            
            {format_instructions}""",
        ),
        ("human", "{user_input}"),
    ]
)
# Insert format_instructions into the template
prompt = prompt_template.partial(format_instructions=format_instructions)
chain = prompt | llm | output_parser

# Example usage
result = chain.invoke({"user_input": "Send 0.5 ETH to 0xRecipientAddress"})
print(result)

'''

