const express = require('express')
const Bill = require('../models/bills')
const router = new express.Router()
//Create New Bill
router.post('/bills', async (req, res) => {
    const bill = new Bill(req.body)

    try {
        await bill.save()
        res.status(201).send(bill)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Read Bills
router.get('/bills', async (req, res) => {
    try {
        const bills = await Bill.find({})
        res.send(bills)
    } catch (e) {
        res.status(500).send()
    }
})
//Read Bill
router.get('/bills/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const bill = await Bill.findById(_id)

        if (!bill) {
            return res.status(404).send()
        }

        res.send(bill)
    } catch (e) {
        res.status(500).send()
    }
})
//Update Bill
router.patch('/bills/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['products','cashier']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!bill) {
            return res.status(404).send()
        }

        res.send(bill)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Delete Bill
router.delete('/bills/:id', async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id)

        if (!bill) {
            res.status(404).send()
        }

        res.send(bill)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router