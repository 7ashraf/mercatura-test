'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
const projectId = '64f275a31dca6a44f36bf1e7608820d6'

// 2. Set Ethers adapters
const Adapter = new EthersAdapter()

// 3. Create a metadata object
const metadata = {
    name: 'Mercatura Test',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
  }

// 4. Create the AppKit instance
createAppKit({
  adapters: [Adapter],
  metadata: metadata,
  networks: [mainnet, arbitrum],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKit() {
  return (
    <div>
      <h1>AppKit</h1>
      <w3m-button>Connect Wallet</w3m-button>
    </div>
  )
}