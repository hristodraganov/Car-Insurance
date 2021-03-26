import React from 'react'
import './LiabilityInsurance.css'
import Form from '../../components/form/Form'
const LiabilityInsurance = () => {

    return (
        <section className='li-section'>
            <div style={{ marginTop: '10vh' }}></div>
            <Form formType='tpli'/>
        </section>
    )
}

export default LiabilityInsurance
