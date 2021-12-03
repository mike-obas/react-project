import { useContext } from 'react'
import {UseContext} from "./UseContext"

const PageLoaderHandler = () => {
    const consumeContext = useContext(UseContext)
    return () => {
        consumeContext.setPageLoader("showPageLoader")
    }
}

export default PageLoaderHandler