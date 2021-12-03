import React, {Suspense, lazy} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from '@material-ui/core/styles'
import Theme from './utils/Theme'
import { 
  UseContext,  CountOne, PageLoader, DialogModal, AlertModal, 
  Authentication, SearchModal
} from './utils/UseContext'
import '@fontsource/roboto'
import User from './routes/User'
import General from './routes/General'
import Main from './routes/Main'
import Categories from './routes/Categories'
import Product from './routes/Product'
import Admin from './routes/Admin'
import QuickLinks from './routes/QuickLinks'
import { HelmetProvider } from 'react-helmet-async';
import NavBarSkeleton from './utils/NavBarSkeleton'
import FooterSkeleton from './utils/FooterSkeleton'
import Dayjs from '@date-io/dayjs'; // choose your lib
import ScrollPageToTop from './ScrollPageToTop'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Validate from './pages/Validate';
const Footer = lazy(() => import('./components/Footer'));
const NavBar = lazy(() => import('./components/NavBar'));

function App() {
  const [count, dispatch] = CountOne()
  const [pageLoading, setPageLoader] = PageLoader()
  const [modal, setModal] = AlertModal()
  const [dialog, setDialog] = DialogModal() 
  const [authState, setAuthState] = Authentication()
  const [searchModal, setSearchModal] = SearchModal()
  return(
<HelmetProvider>
<ThemeProvider theme={Theme}>
    <React.Fragment>
    <CssBaseline />
    <Router>
    <ScrollPageToTop />
    <UseContext.Provider 
        value={
          {
            countState: count, 
            countDispatch: dispatch,

            pageLoading: pageLoading, 
            setPageLoader: setPageLoader,

            modal: modal,
            setModal: setModal,

            dialog: dialog,
            setDialog: setDialog,

            authState: authState,
            setAuthState: setAuthState,

            searchModal: searchModal, 
            setSearchModal: setSearchModal
          }
        }
          >
            <Route exact path="/validate" component={Validate} />
             <MuiPickersUtilsProvider utils={Dayjs}>
      <Suspense fallback={<NavBarSkeleton />}>
      <NavBar />
      </Suspense>
        <div className="container">
          <Main />
          <General />
          <User />
          <QuickLinks />
          <Categories />
          <Product />
          <Admin />
        </div>
        <ScrollToTop />
        <Suspense fallback={<FooterSkeleton />}>
        <Footer />
        </Suspense>
        </MuiPickersUtilsProvider>
        </UseContext.Provider>
      </Router>
</React.Fragment>
</ThemeProvider>
</HelmetProvider>
  );
}

export default App;
