import React from 'react'
import useFriendData from "hooks/useFriendData"

const DaoFollowers = ({ address }) => {
  const [friendData, { friendStatus }] = useFriendData(address)

  const parsedList = React.useMemo(() => {
    let list = []
    if (friendData) {
      for (const friend of friendData) {
        // relationship status = 4 (follower)
        // & the address of the profile being viewed is not the initiator of the relationship
        if (friend.status === 4 && friend.initiator !== address) {
          list.push(friend)
        } else {
          null
        }
      }
    }
    return list
  }, [friendData])

  return (
    <div className="px-2 text-xs">{parsedList?.length} followers</div>
  )
}

export default DaoFollowers