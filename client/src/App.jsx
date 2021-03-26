import React from 'react'
import AppWrapper from './AppWrapper'
import {LanguageProvider} from './Context/LanguageContext/LanguageContext'
function App() {
  return (
    <LanguageProvider>
      <AppWrapper />
    </LanguageProvider>
  )
}

export default App;
