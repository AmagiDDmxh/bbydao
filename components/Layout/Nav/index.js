import React from "react"
import { useAccountStore } from "stores/useAccountStore"
import NotificationsIcon from "./NotificationsIcon"
import MessagesIcon from "./MessagesIcon"
import Menu from "./Menu"
import ThemeToggle from "./ThemeToggle"
import AccountDisplay from "./AccountDisplay"
import DisconnectButton from "./DisconnectButton"
import ToggleSearchModal from "./ToggleSearchModal"

const Nav = () => {
  const [userLogged, setUserLogged] = React.useState(false)
  const rainbowAccount = useAccountStore.getState().rainbowAccount

  React.useEffect(() => {
    setUserLogged(rainbowAccount ? true : false)
  }, [rainbowAccount])

  return (
    <>
      <nav className="flex w-screen p-2 md:p-6">
        <div className="flex flex-row w-screen justify-between items-center">
          <ToggleSearchModal />
        </div>
        {userLogged ? <AccountDisplay /> : <></>}
        {userLogged ? <DisconnectButton /> : <></>}
        {userLogged ? <NotificationsIcon /> : <></>}
        {userLogged ? <MessagesIcon /> : <></>}
        <Menu />
        <ThemeToggle />
      </nav>
    </>
  )
}

export default Nav
