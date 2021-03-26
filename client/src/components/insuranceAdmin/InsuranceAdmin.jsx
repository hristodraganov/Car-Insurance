import { useState, useEffect } from "react"
import axios from 'axios'
import { InsuranceClient as Client } from '../insuranceClient/InsuranceClient'
import './InsuranceAdmin.css'
import { validateNumberInput } from '../../validation/numbers'
import { validateLetterInput } from '../../validation/letters'
import translate from "../../i18n/translate"
const InsuranceAdmin = (props) => {
    let usernames = ['A', 'B', 'C']
    let password = 'admin1!'
    let insCompany = ''

    const [queryData, setQueryData] = useState(
        {
            name: '',
            date: '',
            idn: '',
            accidentType: ''
        }
    )

    const [clients, setClients] = useState([])

    if (usernames.indexOf(props.username) >= 0 && props.password === password) {
        insCompany = props.username
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/${insCompany}`)
            .then(res => {
                if (res.status === 200) {
                    setClients(res.data)
                }
            })

        //eslint-disable-next-line
    }, [])

    const handleInput = ({ target }) => {
        setQueryData({ ...queryData, [target.name]: target.value })
    }

    const findBy = (criteria) => {
        switch (criteria) {
            case 'date':
                axios.post('http://localhost:3001/query/date', {
                    insuranceCompany: insCompany,
                    firstReg: queryData.date
                })
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res.data)
                            setClients(res.data)
                            console.log(clients.length)
                        }
                    })
                break;
            case 'name':
                axios.post('http://localhost:3001/query/name', {
                    insuranceCompany: insCompany,
                    name: queryData.name
                })
                    .then(res => {
                        if (res.status === 200 && res.data.length !== 0) {
                            setClients(res.data)
                        }
                    })
                break;
            case 'idn':
                axios.post('http://localhost:3001/query/idn', {
                    insuranceCompany: insCompany,
                    idn: queryData.idn
                })
                    .then(res => {
                        if (res.status === 200 && res.data.length !== 0) {
                            setClients(res.data)
                        }
                    })
                break;
            case 'accident':
                axios.post('http://localhost:3001/query/accidentType', {
                    insuranceCompany: insCompany,
                    accidentType: queryData.accidentType
                })
                    .then(res => {
                        console.log(res.data)
                        if (res.status === 200 && res.data.length !== 0) {
                            setClients(res.data)
                        }
                    })
                break;
            default:
                break;
        }
    }
    const payClient = (client) => {
        axios.post('http://localhost:3001/query/id', { id: client.id })
        const updatedClients = clients.filter(item => item.id !== client.id)
        setClients(updatedClients)
    }



    return (
        insCompany === 'A' || insCompany === 'B' || insCompany === 'C' ?
            <section className='admin-section'>
                <div className='admin-panel'>
                    <div className='input-labels'>
                        <p>{translate('Find by date:')}</p>
                        <p>{translate('Find by client name:')}</p>
                        <p>{translate('Find by IDN:')}</p>
                        <p>{translate('Find by type of accident:')}</p>
                    </div>
                    <div className='inputs'>
                        <input
                            className="form-control"
                            name='date'
                            type="date"
                            onChange={handleInput}
                        />
                        <input
                            className="form-control"
                            name='name'
                            type="text"
                            onKeyPress={validateLetterInput}
                            onChange={handleInput}
                        />
                        <input
                            className="form-control"
                            name='idn'
                            type="text"
                            onKeyPress={validateNumberInput}
                            onChange={handleInput}
                        />
                        <select
                            className="form-control"
                            name='accidentType'
                            onChange={handleInput}
                        >
                            <option value='tpli'>T.P.L.I</option>
                            <option value='ra'>Road Accident</option>
                            <option value='pd'>Parking Damage</option>
                            <option value='nd'>Natural Disaster</option>
                            <option value='sc'>Self-catastrophic</option>
                        </select>
                    </div>
                    <div className='input-buttons'>
                        <button className='btn btn-secondary' onClick={() => findBy('date')}>{translate('FIND')}</button>
                        <button className='btn btn-secondary' onClick={() => findBy('name')}>{translate('FIND')}</button>
                        <button className='btn btn-secondary' onClick={() => findBy('idn')}>{translate('FIND')}</button>
                        <button className='btn btn-secondary' onClick={() => findBy('accident')}>{translate('FIND')}</button>

                    </div>
                </div>
                {

                    clients.map(item => (
                        <div>
                            <Client client={item} />
                            <button className='btn btn-secondary mt-2 mb-4' onClick={() => payClient(item)}>{translate('Pay client')}</button>
                        </div>
                    ))

                }

            </section>
            :
            <section className='error-section'>
                <h1>Incorrect data, refresh the page to try again.</h1>
            </section>
    )
}

export default InsuranceAdmin
