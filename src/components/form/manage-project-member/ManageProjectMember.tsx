import { Box, Button, Stack } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { useManageProjectMember } from "./Helper";
import dataServices from "../../../services/data-services/DataServices";
import RhfSelectComponent from "../../common/textfield/select/RhfSelectComponent";
import AsynchronousRhfAutocomplete from "../../common/textfield/autocomplete/AsynchronousRhfAutocomplete";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";
import { useProjectContext } from "../../../utils/helpers/context/project-context/ProjectContext";

const ManageProjectMember: FC<{
  refresh: Dispatch<SetStateAction<boolean | undefined>>;
}> = ({ refresh }) => {
  const { control, handleDialogClose, handleSubmit, onSubmit } =
    useManageProjectMember(refresh);
  const { project } = useProjectContext();
  return (
    <Stack
      gap={1}
      p={{ md: 2 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AsynchronousRhfAutocomplete
        control={control}
        name="userId"
        label="User"
        required
        apiDetails={{
          api: dataServices.getUsers,
          params: { projectId: project?.id },
        }}
        sx={{ minWidth: { xs: 230, md: 300 } }}
      />
      <RhfSelectComponent
        control={control}
        name="permissionId"
        label="Permission"
        size="small"
        apidetails={{
          api: dataServices.getPermissions,
        }}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap={1}
        mt={2}
      >
        <Button
          onClick={handleDialogClose}
          color="error"
          variant="outlined"
          fullWidth
        >
          Cancel
        </Button>
        <SubmitButtonComponent title="Create" onClick={() => {}} fullWidth />
      </Box>
    </Stack>
  );
};

export default ManageProjectMember;
