import React from "react"
import Head from "next/head"
import Dashboard from "../components/User/Dashboard"
import { RainbowButton } from "@rainbow-me/rainbow-button"
import { useRainbowButton } from "../hooks/useRainbowButton"
import { useAccountStore } from "../stores/useAccountStore"

const Home = () => {
  const { onConnectorInitialized } = useRainbowButton()
  const rainbowAccount = useAccountStore(state => state.rainbowAccount)
  const rainbowConnector = useAccountStore(state => state.rainbowConnector)

  const renderNotConnected = React.useMemo(() => {
    return (
      <>
        <Head>
          <title>babydao</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl sm:text-5xl mb-3">Welcome to babydao</h1>
          <p className="mb-3">Get started by connecting your wallet </p>
          <RainbowButton
            chainId={1}
            connectorOptions={{ bridge: "https://bridge.walletconnect.org" }}
            onConnectorInitialized={onConnectorInitialized}
          />
        </main>
      </>
    )
  }, [onConnectorInitialized])

  //render if connected
  const renderConnected = React.useMemo(() => {
    return <Dashboard />
  }, [rainbowAccount]) /* eslint-disable-line react-hooks/exhaustive-deps */

  return (
    <div>
      {rainbowConnector?.connected && rainbowAccount?.length
        ? renderConnected
        : renderNotConnected}
    </div>
  )
}

export default Home
