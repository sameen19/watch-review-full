const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});

// Get a contact by watchname
const getContact = asyncHandler(async (req, res) => {
    const watchname = req.params.watchname;
    try {
        const contact = await Contact.findOne({ watchname });
        
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new contact
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { watchname, imgurl, rating, text, username, userimg, useremail, phone } = req.body;
    if (!watchname || !imgurl || !rating || !text || !username || !userimg || !useremail || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contacts = await Contact.create({
        watchname,
        imgurl,
        rating,
        text,
        username,
        userimg,
        useremail,
        phone
    });
    res.status(201).json(contacts);
});

// Update a contact by watchname
const updateContact = asyncHandler(async (req, res) => {
    const watchname = req.params.watchname;
    const contact = await Contact.findOne({ watchname });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findOneAndUpdate(
        { watchname },
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

// Delete a contact by watchname
const deleteContact = asyncHandler(async (req, res) => {
    const watchname = req.params.watchname;
    const contact = await Contact.findOne({ watchname });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({ watchname });
    res.status(200).json({ message: 'Contact removed' });
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
