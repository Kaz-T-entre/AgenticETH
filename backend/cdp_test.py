from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.output_parsers import BooleanOutputParser
import env_vars

# Initialize LLM
llm = OpenAI(model="gpt-4o-mini")

# Initialize BooleanOutputParser
parser = BooleanOutputParser(true_val="true", false_val="false")

# Function to read file content
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Read transaction history and blacklist
transaction_history = read_file('./tx_history.txt')
blacklist = read_file('./blacklist.txt')

# Define the prompt template
prompt_template = PromptTemplate(
    input_variables=["transaction_history", "blacklist"],
    template="""
    Check if the following transaction is suspicious based on the blacklist:
    Transaction History:
    {transaction_history}

    Blacklist:
    {blacklist}

    Respond with 'true' if any transaction is suspicious, otherwise respond with 'false'.
    Please respond with only 'true' or 'false'.
    """
)

# Create the chain
chain = LLMChain(llm=llm, prompt=prompt_template, output_parser=parser)

# Generate the response
response = chain.run({
    "transaction_history": transaction_history,
    "blacklist": blacklist
})

# Ensure output is 'true' or 'false'
try:
    parsed_response = parser.parse(response)
    print("true" if parsed_response else "false")
except ValueError:
    print("false")  # Default to 'false' if parsing fails