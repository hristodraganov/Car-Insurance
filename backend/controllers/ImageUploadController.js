const fs = require('fs')

exports.image_upload_post = (req,res) => {
    const renamedFile = req.params.id + req.params.imageType + '.jpg'
    if (req.files === null) {
        return res.status(400).json({ msg: 'no file uploaded' })
    }
    const file = req.files.file
    console.log(file.name)
    file.mv(`./images/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({ fileName: file.name, filePath: `../images/${file.name}` })
    })
    fs.rename(`./images/${file.name}`, `./images/${renamedFile}`, err => {
        if(err) {
            return res.status(500).send(err)
        }
    })
}

