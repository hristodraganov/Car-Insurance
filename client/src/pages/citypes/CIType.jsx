import React from 'react'
import Form from '../../components/form/Form'
import './CIType.css'
const CIType = ({ match }) => {

    const renderSwitch = () => {
        switch (match.params.type) {
            case 'ra':
                return (
                    <section className='ci-type-section'>
                        <div style={{ marginTop: '10vh' }}></div>
                        <Form formType='ra' />
                    </section>
                )
            case 'pd':
                return (
                    <section className='ci-type-section'>
                        <div style={{ marginTop: '10vh' }}></div>
                        <Form formType='pd' />
                    </section>
                )
            case 'nd':
                return (
                    <section className='ci-type-section'>
                        <div style={{ marginTop: '10vh' }}></div>
                        <Form formType='nd' />
                    </section>
                )
            case 'sc':
                return (
                    <section className='ci-type-section'>
                        <div style={{ marginTop: '10vh' }}></div>
                        <Form formType='sc' />
                    </section>
                )
            default:
                return (
                    <section className='ci-type-section'>
                        <div style={{ marginTop: '10vh' }}>Nothing here!</div>
                    </section>
                )
        }
    }

    return (
        renderSwitch()
    )
}

export default CIType
