import { useAccount, useConnect, useDisconnect } from 'wagmi'
// import MessageForm from './components/Message/MessageForm'
import Nav from './components/Nav/Nav'
// import MessageList from './components/Message/MessageList'
// import useMessages from './components/Message/UseMessages';
import Loader from './components/Loader';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const contractAddress = '0x86638bed40fb4a7cd9ef1666b5d5971f4964dd19';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_text",
                "type": "string"
            }
        ],
        "name": "sendMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMessages",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "text",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessageBoard.Message[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "text",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "NewMessage",
        "type": "event"
    }
];


function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const isLoading = false


  const handleConnect = (connectedAccount) => {
    // setAccount(connectedAccount);
  };


  return (
    <>
    {isLoading && <Loader />}
<Nav handleConnect={handleConnect} ></Nav>


      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
