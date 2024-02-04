import { GetProjectByIdResponse, Permission } from "../project-services/Helper";

interface PermissionDetails {
  id: number;
  permission: {
    name: string;
    json: Permission;
  };
}

const projectName = "NTHTRACK.ProjectDetails";
const permissionName = "NTHTRACK.ProjectPermission";

const sessionServices = {
  setProjectDetails: (project: GetProjectByIdResponse["data"]) => {
    sessionStorage.setItem(projectName, JSON.stringify(project));
  },
  getProjectDetails: (): null | GetProjectByIdResponse["data"] => {
    const project = sessionStorage.getItem(projectName);

    if (project) return JSON.parse(project);

    return null;
  },
  removeProject: () => sessionStorage.removeItem(projectName),
  setProjectPermission: (permissionDetails: PermissionDetails) => {
    sessionStorage.setItem(permissionName, JSON.stringify(permissionDetails));
  },
  getProjectPermission: (): null | PermissionDetails => {
    const permissionDetails = sessionStorage.getItem(permissionName);

    if (permissionDetails) return JSON.parse(permissionDetails);

    return null;
  },
  removeProjectPermission: () => sessionStorage.removeItem(permissionName),
};
export default sessionServices;
