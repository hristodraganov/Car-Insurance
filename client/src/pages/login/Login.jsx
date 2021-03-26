import React, { useState } from 'react'
import { BiKey } from 'react-icons/bi'
import InsuranceAdmin from '../../components/insuranceAdmin/InsuranceAdmin'
import './Login.css'
import translate from '../../i18n/translate'
const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)

    const handleChange = (e) => {
        switch (e.target.type) {
            case 'text':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username !== '' && password !== '') {
            setLogged(true)
        }
    }

    return (
        logged ? 
        <InsuranceAdmin 
            username={username} 
            password={password}
        /> :
        <section className='login-section'>

            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-2'></div>
                    <div className='col-lg-6 col-md-8 login-box'>
                        <div className='col-lg-12 login-key'>
                            <BiKey style={{ color: '#0DB8DE' }} />
                        </div>
                        <div className='col-lg-12 login-title'>
                            {translate('Insurance Admin')}
                        </div>

                        <div className='col-lg-12 login-form'>
                            <div className='col-lg-12 login-form'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label className='form-control-label'>{translate('USERNAME')}</label>
                                        <input
                                            type='text'
                                            className='form-control text-login'
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-control-label'>{translate('PASSWORD')}</label>
                                        <input
                                            type='password'
                                            className='form-control text-login'
                                            onChange={handleChange}
                                            
                                        />
                                    </div>

                                    <div className='col-lg-12 loginbttm'>
                                        <div className='col-lg-6 login-btn login-text'>

                                        </div>
                                        <div className='col-lg-12 login-btn login-button'>
                                            <button className='btn btn-outline-secondary'>{translate('LOGIN')}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-2'></div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login