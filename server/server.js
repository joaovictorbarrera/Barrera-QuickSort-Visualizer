const express = require('express')
const path = require("path")

const PORT = 5000
const app = express()

const buildFolder = path.resolve('../client/dist')
app.use(express.static(buildFolder, {index: false}))

app.get('/*', (req, res) => {
    res.sendFile(buildFolder + "/index.html")
})

app.listen(process.env.PORT || PORT, () => console.log("SERVER STARTED"))
