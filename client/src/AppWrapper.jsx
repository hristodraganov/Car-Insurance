import React, {useContext} from 'react'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LiabilityInsurance from './pages/tpli/LiabilityInsurance'
import CascoInsurance from './pages/ci/CascoInsurance'
import {LanguageContext} from './Context/LanguageContext/LanguageContext'
import {I18nProvider} from './i18n'
import CIType from './pages/citypes/CIType'
import Login from './pages/login/Login'
function App() {
    const [language] = useContext(LanguageContext)
    return (
        <I18nProvider locale={language}>
            <Router>
                <Header />
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/tpli' component={LiabilityInsurance}></Route>
                    <Route path='/ci' exact component={CascoInsurance}></Route>
                    <Route path='/ci/:type' component={CIType}></Route>
                    <Route path='/insadmin' component={Login}></Route>
                </Switch>
            </Router>
        </I18nProvider>
    )
}

export default App;