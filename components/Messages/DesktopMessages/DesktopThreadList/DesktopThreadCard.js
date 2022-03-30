import React from "react"
import { useMessageStore } from "stores/useMessageStore"
import { HiOutlineArrowCircleRight } from "react-icons/hi"

const DesktopThreadCard = ({ title, thread }) => {
  const { setThreadChannel } = useMessageStore()
  const threadChannel = useMessageStore(state => state.threadChannel)
  const setMobileThreadView = useMessageStore(
    state => state.setMobileThreadView
  )

  const handleClickCard = () => {
    setThreadChannel(thread.channel)
    setMobileThreadView()
  }
  
  const parseTitle = (_addresses) => {
    const parsedTitles = []

    const addresses = _addresses.split(',')
    for(const addr of addresses) {
      const str = addr.substring(0, 6).concat('...').concat(addr.substring(38, 42))
      parsedTitles.push(str)
    }

    return parsedTitles
  }

  console.log('parsed titles ', parseTitle(title))

  return (
    <li
      className={
        "mb-2 flex w-full flex-row rounded-lg bg-slate-200 p-3 dark:bg-slate-800" +
        (threadChannel === thread.channel ? " text-blue-500" : "")
      }
      onClick={handleClickCard}
    >
      <div className="ml-3 flex w-11/12 flex-col pl-3">
        <span className="text-sm font-bold">
          {" "}
          {title?.length > 42 ? title.substring(0, 6).concat("...").concat(title.substring(38,42)) : title }
        </span>
      </div>
      <div className="self-center">
        <HiOutlineArrowCircleRight size={24} />
      </div>
    </li>
  )
}

export default DesktopThreadCard