const Property = require('../models/Property');

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, type, location, contactDetails, amenities, images } = req.body;

    const newProperty = new Property({
      owner: req.user.id,
      title,
      description,
      price,
      type,
      location,
      contactDetails,
      amenities,
      images
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProperty = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        property = await Property.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await property.deleteOne();
        res.json({ message: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
