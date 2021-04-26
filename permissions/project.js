const { ROLE } = require("../data");

const canViewProject = (user, project) => {
  // console.log(user.role, project.userID);
  return (
    user.role === ROLE.ADMIN || project.userID === user.id
   )
};

const scopedProject = (user, projects) => {
  if(user.role === ROLE.ADMIN) {
    return projects;
  } 
  return projects.filter(project => project.userID === user.id);
};

const canDeleteProject = (user, project) => {
  return project.userID === user.id;
}

module.exports = {
  canViewProject,
  scopedProject,
  canDeleteProject
};