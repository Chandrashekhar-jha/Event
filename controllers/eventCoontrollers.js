const Events = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
    try {

        const filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.date) {
            filters.date = { $gte: new Date(req.query.date) };
        }
        if (req.query.location) {
            filters.location = req.query.location;
        }

        const events = await Events.find(filters);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createEvent = async (req, res) => {
    const = { title, description, date, location, category, totalseats, availableseats, price, imageUrl } = req.body;
    try {
        const event = await Ebemt.createEvent({
        title,
        description,
        date,
        location,
        category,
        totalseats,
        availableseats,
        price,
        imageUrl,
        createdBy: req.user._id
    });
        const newEvent = new Events(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }   
};