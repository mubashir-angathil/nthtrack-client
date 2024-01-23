/* eslint-disable no-unused-vars */
export type PermissionJSONType = {
  [key: string]: { permission: string; permitted: boolean };
};

export enum MessageHelper {
  reSignInAlert = "Your authentication token expired, please login agin for further usage",
}

export enum TitleHelper {
  appName = "QuickPulse",
}

// Component permission JSON
export const permissionJSON: PermissionJSONType = {
  updateProject: {
    permitted: false,
    permission: "project.id.PUT",
  },
  deleteProject: {
    permitted: false,
    permission: "project.id.DELETE",
  },
  viewTasks: {
    permitted: false,
    permission: "project.task.all.GET",
  },
  viewTask: {
    permitted: false,
    permission: "project.task.id.GET",
  },
  addNewTask: {
    permitted: false,
    permission: "project.task.id.POST",
  },
  updateTask: {
    permitted: false,
    permission: "project.task.id.PUT",
  },
  deleteTask: {
    permitted: false,
    permission: "project.task.id.DELETE",
  },
  viewMembers: {
    permitted: false,
    permission: "project.member.all.GET",
  },
  addNewMember: {
    permitted: false,
    permission: "project.member.id.POST",
  },
  updateMember: {
    permitted: false,
    permission: "project.member.id.PUT",
  },
  deleteMember: {
    permitted: false,
    permission: "project.member.id.DELETE",
  },
  viewLabels: {
    permitted: false,
    permission: "project.label.all.GET",
  },
  addNewLabel: {
    permitted: false,
    permission: "project.label.id.POST",
  },
  updateLabel: {
    permitted: false,
    permission: "project.label.id.PUT",
  },
  deleteLabel: {
    permitted: false,
    permission: "project.label.id.DELETE",
  },
  viewStatuses: {
    permitted: false,
    permission: "project.status.all.GET",
  },
  addNewStatus: {
    permitted: false,
    permission: "project.status.id.POST",
  },
  updateStatus: {
    permitted: false,
    permission: "project.status.id.PUT",
  },
  deleteStatus: {
    permitted: false,
    permission: "project.status.id.DELETE",
  },
};
