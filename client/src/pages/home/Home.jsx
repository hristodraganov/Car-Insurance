import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import './Home.css'
import translate from '../../i18n/translate'
const Home = () => {
    return (
        <div className='home'>
            <h1 className='mb-4' style={{color: 'whitesmoke'}}>{translate('Welcome')}</h1>
           
                <section className='home-hero-section'>

                    <Link to='/tpli'>
                        <Card text='L.I.' />
                    </Link>
                    <Link to='/ci'>
                        <Card text='C.I.' />
                    </Link>
                </section>
            
        </div>
    )
}

export default Home
