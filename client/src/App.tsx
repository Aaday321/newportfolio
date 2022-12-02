import { useState } from 'react'
import Section_1 from './sections/section_1/Section_1'
import Section_Header from './sections/Section_Header'
import './App.css'
import Menu_sym from './assets/SVG_COMPS/Menu_sym'
import Section_2 from './sections/section_2/Section_2'
import E_COM from './sections/e_com/E_COM'

function App() {
  
  
  const ROW3_TEXT: string =
  "At the intersection of technology and social justice where curiosity is my protest"

  return (
    <div className='home_page'>
      <nav className="header">
        <h3 className="ade">Ade</h3>
        <Menu_sym/>  
      </nav>
      <Section_1/>
      <div className="key-skills">
        <p className="key-skills-text">
          Key Skills
        </p>
      </div>
      <Section_2/>
      <E_COM/>
    </div>
  )
}

export default App
