import React from "react"
import { useUiStore } from "../../../stores/useUiStore"
import { FiBell } from "react-icons/fi"

const NotificationsIcon = () => {
  const notificationCount = useUiStore(state => state.notificationCount)

  return (
    <div className="hidden md:flex flex-row items-center justify-center mr-3">
      <button className="flex rounded-full border border-gray-400 shadow bg-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 p-1 h-10 w-10 justify-center items-center text-gray-800 dark:text-white">
        <FiBell />
      </button>
      {notificationCount ? (
        <span
          className={
            "absolute -mt-8 -mr-8 bg-red-500 text-white text-xs rounded-full py-1" +
            (notificationCount > 10 ? " px-1" : " px-2")
          }
        >
          {notificationCount}
        </span>
      ) : (
        <></>
      )}
    </div>
  )
}

export default NotificationsIcon