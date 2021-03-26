import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import './CascoInsurance.css'
const CascoInsurance = () => {
    return (
        <section className='ci-section'>
            <div className='ci-grid'>
                <Link to={'/ci/ra'}>
                    <Card text='Road accident' />
                </Link>
                <Link to={'/ci/pd'}>
                    <Card text='Parking damage' />
                </Link>
                <Link to={'/ci/nd'}>
                    <Card text='Natural disaster' />
                </Link>
                <Link to={'/ci/sc'}>
                    <Card text='Self-catastrophic' />
                </Link>


            </div>
        </section>
    )
}
export default CascoInsurance
