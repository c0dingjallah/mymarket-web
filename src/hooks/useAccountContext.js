import { AccountContext } from "../context/AccountContext"
import { useContext } from "react"

export const useAccountContext = () => {
  const context = useContext(AccountContext)

  if(!context) {
    throw Error('useAcountContext must be used inside an AuthContextProvider')
  }

  return context
}