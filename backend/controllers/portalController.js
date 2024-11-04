const Joi = require("joi");
const Portal = require("../models/Portal");
const Project = require("../models/Project");

exports.getPortals = (req, res) => {
  Portal.find()
    .populate("projects")
    .exec((err, portalData) => {
      if (err) return res.status(500).send("Error fetching portals");
      res.send(portalData);
    });
};

exports.createPortal = (req, res) => {
  Joi.validate(req.body, PortalValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const newPortal = { PortalName: req.body.PortalName, Status: req.body.Status };
    Portal.create(newPortal, (err, portalData) => {
      if (err) return res.status(500).send("Error creating portal");
      res.send(portalData);
    });
  });
};

exports.updatePortal = (req, res) => {
  Joi.validate(req.body, PortalValidation, (err, result) => {
    if (err) return res.status(400).send(err.details[0].message);

    const updatePortal = { PortalName: req.body.PortalName, Status: req.body.Status };
    Portal.findByIdAndUpdate(req.params.id, updatePortal, (err, portal) => {
      if (err) return res.status(500).send("Error updating portal");
      res.send(updatePortal);
    });
  });
};

exports.deletePortal = (req, res) => {
  Portal.findByIdAndRemove(req.params.id, (err, portal) => {
    if (err) return res.status(500).send("Error deleting portal");

    Project.deleteMany({ portals: portal._id }, (err) => {
      if (err) return res.status(500).send("Error deleting related projects");
      res.send(portal);
    });
  });
};
