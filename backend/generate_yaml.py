import yaml
import subprocess

def update_substreams_yaml(file_path, new_value):
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)

    # Update the map_filter_transactions value
    data['params']['map_filter_transactions'] = new_value

    with open(file_path, 'w') as file:
        yaml.safe_dump(data, file)

def get_new_value():
    result = subprocess.run(['python3', 'get_new_value.py'], capture_output=True, text=True)
    return result.stdout.strip()

if __name__ == "__main__":
    file_path = '/workspaces/codespaces-jupyter/Agentic/substreams.yaml'
    
    new_value = get_new_value()
    update_substreams_yaml(file_path, new_value)
    print(f"Updated map_filter_transactions to {new_value} in {file_path}")