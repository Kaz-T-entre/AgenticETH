from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
def get_reputation(command: str):
    # Initialize CDP wrapper
    cdp = CdpAgentkitWrapper()
    # Create toolkit from wrapper
    toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)


    # Initialize LLM
    llm = ChatOpenAI(model="gpt-4o-mini")

    # Get tools and create agent
    tools = toolkit.get_tools()
    agent_executor = create_react_agent(llm, tools)

    # 使用者から受け取ったコマンドをプロンプトとして使用
    query_prompt = command

    # AI のレスポンスを stream で取得
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
    return bool_val

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/check_reputation', methods=['POST'])
def check_reputation_endpoint():
    data = request.get_json() or {}
    print(data)
    command_input = data.get("command", "")
    if not command_input:
        return jsonify({"error": "No command provided"}), 400
    try:
        result = get_reputation(command_input)
        return jsonify({"output": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)