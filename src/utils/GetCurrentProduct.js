import { useContext } from 'react'
import {UseContext} from "./UseContext"

const GetCurrentProduct = () => {
    const consumeContext = useContext(UseContext)
    return consumeContext.currentProduct
}
export default GetCurrentProduct