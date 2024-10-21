'use client'

import { Provider } from 'jotai'

export const Providers = ({ children }) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
