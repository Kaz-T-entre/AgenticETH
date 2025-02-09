
from web3 import Web3

# Infuraのエンドポイントを使用してEthereumネットワークに接続
infura_url = 'https://base-sepolia.infura.io/v3/87b3eb85dee44e4fa2f3085229f95fad'
web3 = Web3(Web3.HTTPProvider(infura_url))
web3.ens = web3.ens.from_web3(web3)
print(web3.ens)
# ENS名を指定
ens_name = 'john2879.base.eth'

# ENSからウォレットアドレスを取得
address = web3.ens.address(ens_name)

print(f'The address for {ens_name} is {address}')



