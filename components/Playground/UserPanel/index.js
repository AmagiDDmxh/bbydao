import React from "react"
import Pfp from "./Pfp"
import AddressEns from "./AddressEns"
import UserFollow from "./UserFollow"

const UserPanel = ({ user, address }) => {

  return (
    <div className="flex w-full flex-col lg:w-1/5 p-3 space-y-3">
      <Pfp address={address} />
      <AddressEns address={address}/>
      <UserFollow user={user} address={address} />
    </div>
  )
}

export default UserPanel