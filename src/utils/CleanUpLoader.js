import { useEffect, useContext } from 'react'
import {UseContext} from "./UseContext"

const CleanUpLoader = () => {
    const consumeContext = useContext(UseContext)
        useEffect(() => {
                consumeContext.setPageLoader("removePageLoader")
                return () => {
                //consumeContext.setPageLoader("removePageLoader")
                } 
        }, [consumeContext.pageLoading, consumeContext])
}

export default CleanUpLoader