import React from 'react'
import { SessionContext } from 'src/context/session-context'

export const useSession = () => {
  return React.useContext(SessionContext)
}
