const Joi = require('joi');
const Project = require('../models/Project');

// Get all projects
exports.getProjects = (req, res) => {
  Project.find()
    .populate('portals')
    .exec((err, projects) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching projects');
      }
      res.send(projects);
    });
};

// Create a new project
exports.createProject = (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const projectData = {
      ProjectTitle: req.body.ProjectTitle,
      ProjectURL: req.body.ProjectURL,
      ProjectDesc: req.body.ProjectDesc,
      portals: req.body.Portal_ID,
      EstimatedTime: req.body.EstimatedTime,
      EstimatedCost: req.body.EstimatedCost,
      ResourceID: req.body.ResourceID,
      Status: req.body.Status,
      Remark: req.body.Remark,
    };

    Project.create(projectData, (err, project) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error creating project');
      }
      res.send(project);
      console.log('New project saved');
    });
  });
};

// Update an existing project
exports.updateProject = (req, res) => {
  Joi.validate(req.body, ProjectValidation, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err.details[0].message);
    }

    const updateProject = {
      ProjectTitle: req.body.ProjectTitle,
      ProjectURL: req.body.ProjectURL,
      ProjectDesc: req.body.ProjectDesc,
      portals: req.body.Portal_ID,
      EstimatedTime: req.body.EstimatedTime,
      EstimatedCost: req.body.EstimatedCost,
      ResourceID: req.body.ResourceID,
      Status: req.body.Status,
      Remark: req.body.Remark,
    };

    Project.findByIdAndUpdate(
      req.params.id,
      updateProject,
      { new: true },
      (err, project) => {
        if (err) {
          return res.status(500).send('Error updating project');
        }
        res.send(updateProject);
      }
    );
  });
};

// Delete a project
exports.deleteProject = (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (err) {
      console.log('Error deleting project');
      return res.status(500).send('Error deleting project');
    }
    res.send(project);
    console.log('Project deleted');
  });
};
