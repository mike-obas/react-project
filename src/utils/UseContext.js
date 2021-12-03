import React, { useReducer } from "react"
export const UseContext = React.createContext()

const initialState = 0
export function CountOne() {
    const reducer = (state, action) => {
        switch(action){
            case "increment": return state + 1
            case "decrement": return state - 1
            case "reset": return initialState
            default: return state
            
        }
    }
    const [count, dispatch] = useReducer(reducer, initialState)
    return [count, dispatch]
}

const initialComponent = false
export function PageLoader() {
    const reducer = (state, action) => {
        switch(action){
            case "showPageLoader": return true
            case "removePageLoader": return initialComponent
            default: return state
        }
    }
const [pageLoading, setPageLoader] = useReducer(reducer, initialComponent)
return [pageLoading, setPageLoader]
}
//auth routes
export function Authentication() {
    const initialState = {
            initializing: true,
            role: "",
            name: "",
            state: false,
            disabled: false,
            emailVerified: false
    };
    const authReducer = (state, action) => {
    switch(action.type){
    case "setAdminAuthState": 
    return { ...state, [action.field]: action.fieldValue };
    case "setUserAuthState": 
    return { ...state, [action.field]: action.fieldValue };
    default: return state
        }
    }
const [authState, setAuthState] = useReducer(authReducer, initialState)
return [authState, setAuthState]
}

const emptyModal = {
    open: false,
    message: '',
    successLink: '',
    successLinkText: '',
    cancelText: ''
}
export function AlertModal() {
    const reducer = (state, action) => {
        switch(action.type){
            case "open": 
            return action.modalContent;
            case "close": 
            return emptyModal;
            default: return state
        }
    }
    const [modal, setModal] = useReducer(reducer, emptyModal)
    return [modal, setModal]
    
}
//dialog modal
const emptyDialog = {
    open: false,
    performAction: false,
    message: '',
    actionText: '',
    cancelText: ''
}
export function DialogModal(){
    const reducer = (state, action) => {
        switch(action.type){
            case "open": 
            return action.modalContent;
            case "close": 
            return emptyDialog;
            default: return state
        }
    }
    const [dialog, setDialog] = useReducer(reducer, emptyDialog)
    return [dialog, setDialog]
}
//search modal
const emptySearchModal = {
    open: false,
    searchResults: null,
    noMatch: null
}
export function SearchModal(){
    const reducer = (state, action) => {
        switch(action.type){
            case "open": 
            return action.modalContent;
            case "setResults": 
            return action.results;
            case "close": 
            return emptySearchModal;
            default: return state
        }
    }
    const [searchModal, setSearchModal] = useReducer(reducer, emptySearchModal)
    return [searchModal, setSearchModal]
}