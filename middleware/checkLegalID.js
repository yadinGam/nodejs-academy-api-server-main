const checkLegalID = (req, res, next) => {

    const { id } = req.params

    if (!id || parseInt(id) < 0) {
        return res.status(404).json({ error: `no movie with id ${id}` })
    } else {
        console.log(`params: ${id}`)
        next()
    }

}

module.exports = { checkLegalID }