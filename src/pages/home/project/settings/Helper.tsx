/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDialogContext } from "../../../../utils/helpers/context/dialog-context/DialogContext";
import { useProjectContext } from "../../../../utils/helpers/context/project-context/ProjectContext";
import { useParams } from "react-router-dom";
import { useProjectContextHelpers } from "../../../../utils/helpers/context/project-context/Helper";
import ProjectMemberTableComponent from "../../../../components/table/project-member-table/ProjectMemberTableComponent";
import ProjectLabelTableComponent from "../../../../components/table/project-label-table/ProjectLabelTableComponent";
import ProjectStatusTableComponent from "../../../../components/table/project-status-table/ProjectStatusTableComponent";
import { useUserPermissionHelpers } from "../../../../utils/helpers/context/user-permission-context/Helper";
import DangerZoneSection from "../../../../components/danger-zone-section/DangerZoneSection";
import { useRefreshContext } from "../../../../utils/helpers/context/refresh-context/RefreshContext";
import { useComponentPermissionContext } from "../../../../utils/helpers/context/component-permission-context/ComponentPermissionContext";
import { useUserPermissionContext } from "../../../../utils/helpers/context/user-permission-context/UserPermissionContext";
import { usePermissionHook } from "../../../../utils/helpers/hooks/ValidatePermission";
import { permissionJSON } from "../../../../utils/helpers/constants/Constants";

export type PermissionJSONType = {
  [key: string]: { permission: string; permitted: boolean };
};

export interface PanelInterface {
  label: string;
  component: JSX.Element;
}

export const useManageProjectSettings = () => {
  // Destructuring and initializing state and context hooks
  const params = useParams();
  const { setDialog } = useDialogContext();
  const { project } = useProjectContext();
  const { fetchProjectById } = useProjectContextHelpers();
  const { refresh } = useRefreshContext();
  const { componentPermission, setComponentPermission } =
    useComponentPermissionContext();
  const { fetchUserProjectPermission } = useUserPermissionHelpers();
  const { permission } = useUserPermissionContext();
  const { validatePermissionWithPermissionJSON } = usePermissionHook();

  const projectId = params.projectId && parseInt(params.projectId);
  const [reload, setReload] = useState<boolean>();
  const [initialRender, setInitialRender] = useState<boolean>();
  const [tab, setTab] = useState("0");
  const [panels, setPanels] = useState<PanelInterface[]>([]);

  const fullPanels: PanelInterface[] = [
    {
      label: "Members",
      component: <ProjectMemberTableComponent setReload={setReload} />,
    },
    {
      label: "Labels",
      component: <ProjectLabelTableComponent />,
    },
    {
      label: "Statuses",
      component: <ProjectStatusTableComponent />,
    },
    {
      label: "Danger Zone",
      component: <DangerZoneSection />,
    },
  ];

  // Function to handle tab changes
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  // Function to build and update panels based on permissions
  const buildPanels = (permission: PermissionJSONType) => {
    // Initialize an array to store updated panels
    const updatedPanel: PanelInterface[] = [];

    // Iterate through each panel in the fullPanels list
    fullPanels.forEach((panel) => {
      let key;
      switch (true) {
        // Set key based on panel label for mapping with permissions
        case panel.label === "Members":
          key = "viewMembers";
          break;
        case panel.label === "Labels":
          key = "viewLabels";
          break;
        case panel.label === "Statuses":
          key = "viewStatuses";
          break;
        case panel.label === "Danger Zone":
          key = "dangerZone";
          break;
      }

      // Check if a valid key is set
      if (key) {
        // Special handling for "Danger Zone" panel
        if (key.includes("dangerZone")) {
          const deleteProjectPermission = permission["deleteProject"];
          const updateProjectPermission = permission["updateProject"];

          // Include the "Danger Zone" panel if either delete or update project permission is permitted
          if (
            deleteProjectPermission?.permitted ||
            updateProjectPermission?.permitted
          ) {
            updatedPanel.push(panel);
          }
        } else {
          // Include the panel if the corresponding permission is permitted
          const currentPermission = permission[key];
          if (currentPermission?.permitted) updatedPanel.push(panel);
        }
      }
    });

    // Update state with the filtered panels
    setPanels(updatedPanel);
  };

  // useEffect to handle initial render and refresh
  useEffect(() => {
    // Check if refresh is not triggered and it's the initial render
    if (refresh.reload === false && initialRender === undefined) {
      setInitialRender(false); // Marking initial render as complete
    }

    // Check if refresh is triggered and it's not the initial render
    if (refresh.reload && !initialRender) {
      setReload((prevState) => (prevState === undefined ? true : !prevState)); // Toggle reload state
    }
  }, [refresh]);

  // useEffect to manage project-related data and permissions on reload
  useEffect(() => {
    // Check if projectId is available
    if (projectId) {
      // Fetch project by projectId if it doesn't exist in the state
      if (project === null) {
        fetchProjectById({ projectId });
      }

      // If reload state is either false or true, update component permissions
      if (reload === false || reload === true) {
        setComponentPermission({}); // Reset component permissions
        fetchUserProjectPermission({ projectId }); // Fetch user project permissions
      }
    }
  }, [reload]);

  // useEffect to validate and update component permissions based on the received permission
  useEffect(() => {
    // Check if permission is available and component permissions are not set
    if (permission && Object.entries(componentPermission).length === 0) {
      // Validate and set component permissions based on permission and permissionJSON
      const newPermission = validatePermissionWithPermissionJSON({
        permission: permission.permission.json,
        permissionJSON,
      });
      setComponentPermission(newPermission);
    }
  }, [permission]);

  // useEffect to build and update panels based on component permissions
  useEffect(() => {
    // Check if component permissions are available
    if (Object.entries(componentPermission).length > 0) {
      buildPanels(componentPermission); // Build and update panels based on component permissions
    }
  }, [componentPermission]);

  return {
    setDialog,
    handleTabChange,
    tab,
    panels,
  };
};
