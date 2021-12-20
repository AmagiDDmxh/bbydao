import React from "react"
import ClickAwayListener from "react-click-away-listener"
import { HiDotsHorizontal } from "react-icons/hi"
import { useAccountStore } from "stores/useAccountStore"
import DashboardLink from "./DashboardLink"
import MenuThemeToggle from "./MenuThemeToggle"
import MessagesLink from "./MessagesLink"
import ExploreLink from "./ExploreLink"
import FeedLink from "./FeedLink"
import AboutLink from "./AboutLink"

const Menu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [userLogged, setUserLogged] = React.useState(false)
  const userData = useAccountStore(state => state.userData)

  React.useEffect(() => {
    setUserLogged(userData ? true : false)
  }, [userData])

  const clickAway = () => {
    if (!menuOpen) {
      return
    }
    setMenuOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={clickAway}>
      <div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-10 rounded-xl border border-gray-400 shadow text-xl text-gray-800 bg-gray-200 hover:bg-gray-100 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-700 h-10 px-3 py-2"
        >
          <HiDotsHorizontal />
        </button>
        <div
          className={
            (menuOpen ? "absolute " : "hidden ") +
            "top-0 right-0 md:-translate-x-20 translate-y-20 z-50 rounded border shadow px-2 py-2 text-gray-800 bg-gray-200 dark:text-white dark:bg-gray-900 w-2/6 md:w-1/6"
          }
        >
          <ul className="py-1" onClick={clickAway}>
            {userLogged ? <DashboardLink data={userData} /> : <></>}
            <MenuThemeToggle />
            <MessagesLink />
            <ExploreLink />
            <FeedLink />
            <AboutLink />
          </ul>
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default Menu