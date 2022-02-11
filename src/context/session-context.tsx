/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import isomorphicCookie from 'isomorphic-cookie'

const SessionContext = React.createContext<
  [string | null, (value: string | null) => void]
>([null, () => {}])

const SessionProvider = (props) => {
  const sessionCookie = isomorphicCookie.load('session')

  const [state, setState] = React.useState(sessionCookie ?? null)

  const setSession = (value: string | null) => {
    setState(value)

    if (!value) {
      isomorphicCookie.remove('session')

      return
    }

    isomorphicCookie.save('session', value, {
      secure: process.env.NODE_ENV === 'production',
    })
  }

  return (
    <SessionContext.Provider value={[state, setSession]}>
      {props.children}
    </SessionContext.Provider>
  )
}

export { SessionContext, SessionProvider }
