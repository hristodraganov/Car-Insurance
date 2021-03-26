import React, { useState } from 'react'
import './InsuranceClient.css'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import JSZipUtils from 'jszip-utils'
import translate from '../../i18n/translate'

export const InsuranceClient = ({ client }) => {
    const collisionImage = client.id + 'collision.jpg'
    const detailImage = client.id + 'detail.jpg'
    const [toggle, setToggle] = useState(false)

    const imageUrls = [
        `http://localhost:3001/images/${collisionImage}`,
        `http://localhost:3001/images/${detailImage}`
    ]
    const imageNames = [
        collisionImage,
        detailImage
    ]

    const handleImages = () => {
        setToggle(!toggle)
    }
    const downloadImages = () => {
        var zip = new JSZip()
        var count = 0
        const zipFileName = 'images.zip'
        imageUrls.forEach(url => {
            JSZipUtils.getBinaryContent(url, (err, data) => {
                if (err) {
                    console.log(err)
                }
                zip.file(imageNames[count], data, { binary: true })
                count++
                if (count === imageUrls.length) {
                    zip.generateAsync({ type: 'blob' }).then(content => {
                        saveAs(content, zipFileName)
                    })
                }
            })
        })
    }
    return (
        <div className='card-wrapper'>
            <div className='client-card'>
                <details open>
                    <summary>{client.firstName + ' ' + client.middleName + ' ' + client.surname}</summary>
                    <div className="card-content">
                        <p><span style={{ fontWeight: 'bold' }}>{translate('IDN:')} </span>{client.idn}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('IBAN:')} </span>{client.iban}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('DRIVERS LICENSE NO:')} </span>{client.dlno}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('VEHICLE TYPE:')} </span>{client.vehicleType}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('VEHICLE INSPECTION EXPIRE DATE:')} </span>{client.viExpireDate}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('REGISTRATION PLATE:')} </span>{client.regPlate}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('FIRST REGISTRATION:')} </span>{client.firstReg}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('YEAR OF PRODUCTION:')} </span>{client.yearOfProduction}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('BRAND:')} </span>{client.brand}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('MODEL:')} </span>{client.model}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('COLOR:')} </span>{client.color}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('ADDRESS OF ACCIDENT:')} </span>{client.accidentAddress}</p>
                        <p><span style={{ fontWeight: 'bold' }}>{translate('TYPE OF ACCIDENT:')} </span>{client.accidentType}</p>
                        <div className='images'>
                            <img alt='' src={`http://localhost:3001/images/${collisionImage}`} className={toggle ? 'show-img' : 'hide-img'}></img>
                            <img alt='' src={`http://localhost:3001/images/${detailImage}`} className={toggle ? 'show-img' : 'hide-img'}></img>
                        </div>
                        <div className='buttons mt-4'>
                            <button className='btn btn-secondary mb-4' onClick={handleImages}>{translate('Show photos')}</button>
                            <button className='btn btn-secondary mb-4' onClick={downloadImages}>{translate('Download photos')}</button>
                        </div>

                    </div>
                </details>

            </div>
        </div>
    )
}