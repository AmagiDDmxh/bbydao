import React           from "react"
import { FaEthereum }  from "react-icons/fa"
import { useDaoStore } from "stores/useDaoStore"
import { useAccount }  from "wagmi"
import { isEmpty }     from "../../../utils/helpers"

const TokenCard = ({ token, img }) => {
  const [{ data, error, loading }, disconnect] = useAccount()
  const { balance, fiatBalance } = token

  const setUniswapSwapModalOpen = useDaoStore(state => state.setUniswapSwapModalOpen)
  const setUniswapLpModalOpen = useDaoStore(state => state.setUniswapLpModalOpen)
  // const setTxModalOpen = useDaoStore(state => state.setTxModalOpen)
  const lpToken0 = useDaoStore(state => state.lpToken0)
  const setLpToken0 = useDaoStore(state => state.setLpToken0)
  const lpToken1 = useDaoStore(state => state.lpToken1)
  const setLpToken1 = useDaoStore(state => state.setLpToken1)
  const isActive = lpToken0?.tokenAddress === token?.tokenAddress || lpToken1?.tokenAddress === token?.tokenAddress
  const setLpToken = () => {
    if (!isActive) {
      if (Object.keys(lpToken0).length === 0) {
        setLpToken0(token)
      }
      if (
        Object.keys(lpToken1).length === 0 &&
        Object.keys(lpToken0).length !== 0 &&
        token.tokenAddress !== lpToken0.tokenAddress
      ) {
        setLpToken1(token)
        setUniswapLpModalOpen(true)
      }

    } else {
      setLpToken0({})
    }
  }

  const setSwapToken = () => {
    console.log("setSwapToken", token)
    setUniswapSwapModalOpen(true)
  }


  return (
    <div className={`w-full`}>
      <div className="flex flex-col rounded-lg bg-slate-100 p-1 shadow-inner dark:bg-slate-800">
        <div
          className={`flex flex-row items-center justify-between rounded-lg bg-slate-300 p-2 shadow dark:bg-slate-900 ${isActive ? "border border-teal-300" : ""}`}>
          <div className="flex flex-row">
            <div
              className="mx-2 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-slate-200 dark:bg-slate-900">
              {token.token?.logoUri ? (
                <img src={token.token.logoUri} />
              ) : (
                <FaEthereum />
              )}
            </div>

            <span
              className="ml-4 flex w-28 flex-row items-center justify-center rounded bg-slate-100 p-1 text-[12px] dark:bg-slate-800">
              <span className="text-blue-500">
                {(balance / 10 ** 18).toFixed(3)}{" "}
                {token.token?.symbol ? token.token.symbol : "ETH"}{" "}
                <span className="text-green-500">
                  ${Number(fiatBalance).toFixed(2)}
                </span>
              </span>
            </span>
          </div>

          {/* tx confirmations */}
          <div className="flex flex-row">
            <span></span>
          </div>


          <div className="flex flex-row justify-end px-1">
            {isEmpty(lpToken0) && (
              <>
                <button
                  className="mr-1 w-16 rounded-lg bg-blue-400 p-1 text-xs shadow-sm hover:bg-blue-500"
                  onClick={() => console.log("hii")}
                >
                  send
                </button>

                <button
                  className="mr-1 w-16 rounded-lg bg-blue-400 p-1 text-xs shadow-sm hover:bg-blue-500"
                  onClick={setSwapToken}
                >
                  swap
                </button>
              </>
            )}

            <button
              className="mr-1 w-16 rounded-lg bg-blue-400 p-1 text-xs shadow-sm hover:bg-blue-500"
              onClick={setLpToken}
            >
              {isEmpty(lpToken0) && isEmpty(lpToken1) ? "LP" : isActive ? "Selected" : "Pair"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenCard
