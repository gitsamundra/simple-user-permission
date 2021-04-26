const { authUser } = require('../authUser');
const { projects } = require('../data');
const filterProject = require('../permissions/project');

const router = require('express').Router();

const authGetProject = (req, res, next) => {
  if(!filterProject.canViewProject(req.user, req.project)) {
    res.status(401).json('Not allowed')
  }
  next();
};

const authDeleteProject = (req, res, next) => {
  if(!filterProject.canDeleteProject(req.user, req.project)) {
    res.status(401).json('Not allowed');
  }
  next();
};




const setProject = (req, res, next) => {
  const projectID = parseInt(req.params.projectID);
  
  req.project = projects.find(project => project.id === projectID);
  
  if(req.project === null) {
    res.status(404).json('Not allowed');
  }
  next();
};

router.get('/', (req, res) => {
  res.status(200).json(filterProject.scopedProject(req.user, projects));
});

router.get('/:projectID', setProject, authUser, authGetProject, (req, res) => {
  res.status(200).json(req.project);
});

router.delete('/:projectID', setProject, authUser, authDeleteProject, (req, res) => {
  res.status(200).json('Deleted project');
});

module.exports = router;