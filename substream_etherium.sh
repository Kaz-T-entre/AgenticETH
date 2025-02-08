#substreams run -e mainnet.eth.streamingfast.io:443 substreams.yaml map_filter_transactions
substreams run -e mainnet.eth.streamingfast.io:443 \
     https://github.com/Jannis/gravity-substream/releases/download/v0.0.1/gravity-v0.1.0.spkg \
     gravatar_updates -o json