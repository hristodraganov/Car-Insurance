import React, { useState } from 'react'
import ntc from 'ntcjs'
import './Form.css'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { validateNumberInput } from '../../validation/numbers'
import translate from '../../i18n/translate'

const Form = ({ formType }) => {
    const [formData, setFormData] = useState({
        id: uuidv4(),
        insuranceCompany: '',
        firstName: '',
        middleName: '',
        surname: '',
        idn: 0,
        iban: '',
        dlno: 0,
        vehicleType: '',
        viExpireDate: '',
        regPlate: '',
        firstReg: '',
        yearOfProduction: 0,
        brand: '',
        model: '',
        color: '',
        accidentAddress: '',
        accidentType: formType
    })
   
    const [collision, setCollision] = useState({
        file: '',
        fileName: 'Choose file'
    })

    const [detail, setDetail] = useState({
        file: '',
        fileName: 'Choose file'
    })

    const handleInput = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
    }


    const fileSubmit = async (file, imageType) => {

        const fileData = new FormData()
        fileData.append('file', file)
        try {
            await axios.post(`http://localhost:3001/upload/${formData.id}/${imageType}`, fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        } catch (err) {
            console.log(err.status)
            if (err.response.status === 500) {
                console.log('There was a problem with the server')
            } else {
                console.log(err.response.data.msg)
            }
        }

    }

    const formSubmit = async (e) => {
        e.preventDefault()
        const n_match = ntc.name(formData.color)
        const colorName = n_match[1]
        fileSubmit(collision.file, 'collision')
        fileSubmit(detail.file, 'detail')
        const accidentDetail = {
            id: formData.id,
            insuranceCompany: formData.insuranceCompany,
            firstName: formData.firstName,
            middleName: formData.middleName,
            surname: formData.surname,
            idn: formData.idn,
            iban: formData.iban,
            dlno: formData.dlno,
            vehicleType: formData.vehicleType,
            viExpireDate: formData.viExpireDate,
            regPlate: formData.regPlate,
            firstReg: formData.firstReg,
            yearOfProduction: formData.yearOfProduction,
            brand: formData.brand,
            model: formData.model,
            color: colorName,
            accidentAddress: formData.accidentAddress,
            accidentType: formData.accidentType
        }
        await axios.post('http://localhost:3001/', accidentDetail)
    }

    const handleFileInput = (e) => {
        switch (e.target.name) {
            case 'collision':
                setCollision({ file: e.target.files[0], fileName: e.target.files[0].name })
                break;
            case 'detail':
                setDetail({ file: e.target.files[0], fileName: e.target.files[0].name })
                break;
            default:
                setCollision({ ...collision, fileName: 'Your file was not uploaded.' })
                setDetail({ ...detail, fileName: 'Your file was not uploaded.' })
                break;
        }
    }

    const renderInput = (inputType, inputName, text, validateNumbers) => {
        switch (inputType) {
            case 'text':
                return (
                    validateNumbers ?
                        <label className="round-input-container">
                            <div className="round-input-decorator">
                                <div className="round-input-border-left"></div>
                                <span className="round-input-label-text">{translate(text)}</span>
                                <div className="round-input-border-right"></div>
                            </div>
                            <input
                                type={inputType}
                                onChange={inputName !== '' ? handleInput : null}
                                required='required'
                                name={inputName}
                                onKeyPress={validateNumberInput}
                                className="round-input"
                            />
                        </label>
                        :
                        <label className="round-input-container">
                            <div className="round-input-decorator">
                                <div className="round-input-border-left"></div>
                                <span className="round-input-label-text">{translate(text)}</span>
                                <div className="round-input-border-right"></div>
                            </div>
                            <input
                                type={inputType}
                                required='required'
                                name={inputName}
                                onChange={inputName !== '' ? handleInput : null}
                                className="round-input"
                            />
                        </label>
                )
            case 'select':
                return (
                    <label className="round-input-container">
                        <div className="round-input-decorator">
                            <div className="round-input-border-left"></div>
                            <span className="round-input-label-text">{translate(text)}</span>
                            <div className="round-input-border-right"></div>
                        </div>
                        <select
                            onChange={inputName !== '' ? handleInput : null}
                            required='required'
                            name={inputName}
                            className="round-input"
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </label>
                )
            case 'date':
                return (
                    inputName === 'viExpireDate' ?
                        <label className="round-input-container">
                            <div className="round-input-decorator">
                                <div className="round-input-border-left"></div>
                                <span className="round-input-label-text">{translate(text)}</span>
                                <div className="round-input-border-right"></div>
                            </div>
                            <input
                                type={inputType}
                                onChange={inputName !== '' ? handleInput : null}
                                required='required'
                                name={inputName}
                                className="round-input"
                            />
                        </label>
                        :
                        <label className="round-input-container">
                            <div className="round-input-decorator">
                                <div className="round-input-border-left"></div>
                                <span className="round-input-label-text">{translate(text)}</span>
                                <div className="round-input-border-right"></div>
                            </div>
                            <input
                                type={inputType}
                                onChange={inputName !== '' ? handleInput : null}
                                required='required'
                                name={inputName}
                                className="round-input"
                            />
                        </label>
                )
            case 'color':
                return (
                    <label className="round-input-container">
                        <div className="round-input-decorator">
                            <div className="round-input-border-left"></div>
                            <span className="round-input-label-text">{translate(text)}</span>
                            <div className="round-input-border-right"></div>
                        </div>
                        <input
                            type={inputType}
                            onChange={inputName !== '' ? handleInput : null}
                            required='required'
                            name={inputName}
                            style={{ height: '3rem' }}
                            className="round-input"
                        />
                    </label>
                )
            case 'file':
                return (
                    <div className="form-group file-area">
                        <label className='images-label' htmlFor="images">{translate(text)}</label>
                        <input
                            type={inputType}
                            name={inputName}
                            required="required"
                            onChange={inputName !== '' ? handleFileInput : null}
                        />
                        <div className="file-dummy">
                            {/* eslint-disable-next-line */}
                            <div className="success">{eval(inputName).fileName.substring(0, 35)}</div>
                            {/* eslint-disable-next-line */}
                            <div className='success'>{eval(inputName).fileName.substring(35)}</div>
                            <div className="default">{translate(text)}</div>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }

    const renderSwitch = () => {
        switch (formType) {
            case 'tpli':
                return (
                    <div className='form-wrapper'>

                        <form onSubmit={formSubmit}>
                            <label className='images-label' htmlFor="images">{translate('Data of claimant')}</label>

                            {renderInput('select', 'insuranceCompany', 'Your Insurance Company', false)}

                            <hr></hr>

                            {renderInput('text', 'firstName', 'First Name', false)}
                            {renderInput('text', 'middleName', 'Middle Name', false)}
                            {renderInput('text', 'surname', 'Surname', false)}
                            {renderInput('text', 'idn', 'IDN', true)}
                            {renderInput('text', 'iban', 'IBAN', false)}

                            <hr></hr>

                            {renderInput('text', 'dlno', 'Drivers License No', true)}
                            {renderInput('text', 'vehicleType', 'Type of vehicle', false)}
                            {renderInput('date', 'viExpireDate', 'Vehicle inspection expire date', false)}
                            {renderInput('text', 'regPlate', 'Registration plate', false)}
                            {renderInput('text', 'yearOfProduction', 'Year of production', true)}
                            {renderInput('text', 'vin', 'VIN number', false)}
                            {renderInput('text', 'engDisplacement', 'Engine displacement', true)}
                            {renderInput('date', 'firstReg', 'First registration', false)}
                            {renderInput('text', 'brand', 'Brand', false)}
                            {renderInput('text', 'model', 'Model', false)}
                            {renderInput('color', 'color', 'Color', false)}

                            <hr></hr>

                            {renderInput('text', 'accidentAddress', 'Address of accident', false)}

                            <hr></hr>

                            {renderInput('file', 'collision', 'Photo of collision', false)}
                            {renderInput('file', 'detail', 'Photo of detail', false)}

                            <button className='btn btn-secondary mb-4'>{translate('Submit data')}</button>
                        </form>

                    </div>
                )
            case 'ra':
                return (
                    <div className='form-wrapper'>

                        <form onSubmit={formSubmit}>
                            <label className='images-label' htmlFor="images">{translate('Data of claimant')}</label>

                            {renderInput('select', 'insuranceCompany', 'Your Insurance Company', false)}

                            <hr></hr>

                            {renderInput('text', 'firstName', 'First Name', false)}
                            {renderInput('text', 'middleName', 'Middle Name', false)}
                            {renderInput('text', 'surname', 'Surname', false)}
                            {renderInput('text', 'idn', 'IDN', true)}
                            {renderInput('text', 'iban', 'IBAN', false)}

                            <hr></hr>

                            {renderInput('text', 'dlno', 'Drivers License No', true)}
                            {renderInput('text', 'vehicleType', 'Type of vehicle', false)}
                            {renderInput('date', 'viExpireDate', 'Vehicle inspection expire date', false)}
                            {renderInput('text', 'regPlate', 'Registration plate', false)}
                            {renderInput('text', 'yearOfProduction', 'Year of production', true)}
                            {renderInput('text', 'vin', 'VIN number', false)}
                            {renderInput('text', 'engDisplacement', 'Engine displacement', true)}
                            {renderInput('date', 'firstReg', 'First registration', false)}
                            {renderInput('text', 'brand', 'Brand', false)}
                            {renderInput('text', 'model', 'Model', false)}
                            {renderInput('color', 'color', 'Color', false)}

                            <hr></hr>

                            {renderInput('text', 'accidentAddress', 'Address of accident', false)}

                            <hr></hr>

                            {renderInput('file', 'collision', 'Photo of collision', false)}
                            {renderInput('file', 'detail', 'Photo of detail', false)}

                            <hr></hr>

                            <label className='images-label' htmlFor="images">{translate('Data of guilty driver')}</label>

                            {renderInput('select', 'insuranceCompany', 'Your Insurance Company', false)}

                            <hr></hr>

                            {renderInput('text', '', 'First Name', false)}
                            {renderInput('text', '', 'Middle Name', false)}
                            {renderInput('text', '', 'Surname', false)}
                            {renderInput('text', '', 'IDN', true)}

                            <hr></hr>

                            {renderInput('text', '', 'Drivers License No', true)}
                            {renderInput('text', 'vehicleType', 'Type of vehicle', false)}
                            {renderInput('date', '', 'Vehicle inspection expire date', false)}
                            {renderInput('text', '', 'Registration plate', false)}
                            {renderInput('text', '', 'Year of Production', true)}
                            {renderInput('text', '', 'VIN number', false)}
                            {renderInput('text', '', 'Engine displacement', true)}
                            {renderInput('date', '', 'First registration', false)}
                            {renderInput('text', '', 'Brand', false)}
                            {renderInput('text', '', 'Model', false)}
                            {renderInput('color', '', 'Color', false)}

                            <hr></hr>

                            {renderInput('text', '', 'Address of accident', false)}

                            <hr></hr>

                            {renderInput('file', '', 'Photo of collision', false)}
                            {renderInput('file', '', 'Photo of detail', false)}

                            <button className='btn btn-secondary mb-4'>{translate('Submit data')}</button>
                        </form>

                    </div>
                )
            default:
                return (
                    <div className='form-wrapper'>

                        <form onSubmit={formSubmit}>
                            <label className='images-label' htmlFor="images">{translate('Data of claimant')}</label>

                            {renderInput('select', 'insuranceCompany', 'Your Insurance Company', false)}

                            <hr></hr>

                            {renderInput('text', 'firstName', 'First Name', false)}
                            {renderInput('text', 'middleName', 'Middle Name', false)}
                            {renderInput('text', 'surname', 'Surname', false)}
                            {renderInput('text', 'idn', 'IDN', true)}
                            {renderInput('text', 'iban', 'IBAN', false)}

                            <hr></hr>

                            {renderInput('text', 'dlno', 'Drivers License No', true)}
                            {renderInput('text', 'vehicleType', 'Type of vehicle', false)}
                            {renderInput('date', 'viExpireDate', 'Vehicle inspection expire date', false)}
                            {renderInput('text', 'regPlate', 'Registration plate', false)}
                            {renderInput('text', 'yearOfProduction', 'Year of production', true)}
                            {renderInput('text', 'vin', 'VIN number', false)}
                            {renderInput('text', 'engDisplacement', 'Engine displacement', true)}
                            {renderInput('date', 'firstReg', 'First registration', false)}
                            {renderInput('text', 'brand', 'Brand', false)}
                            {renderInput('text', 'model', 'Model', false)}
                            {renderInput('color', 'color', 'Color', false)}

                            <hr></hr>

                            {renderInput('text', 'accidentAddress', 'Address of accident', false)}

                            <hr></hr>

                            {renderInput('file', 'collision', 'Photo of collision', false)}
                            {renderInput('file', 'detail', 'Photo of detail', false)}

                            <button className='btn btn-secondary mb-4'>{translate('Submit data')}</button>
                        </form>
                    </div>
                )
        }
    }

    return (
        renderSwitch()
    )
}

export default Form
