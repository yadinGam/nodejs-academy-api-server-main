const checkLegalID = (req, res, next) => {

    const { id } = req.params

    if (!id || parseInt(id) < 0) {
        debugger
        console.log(`id: ${id} isn't a legal id number`)
        return res.status(404).json({ error: `no movie with id ${id}` })
    } else {
        console.log(`id number: ${id} is legal`)
        //there wasn't no error
        next()// what does next means???
    }

}

module.exports = { checkLegalID }