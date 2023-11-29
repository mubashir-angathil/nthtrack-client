import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";
import { useManageProjectMember } from "./Helper";
import dataServices from "../../../services/data-services/DataServices";
import RhfSelectComponent from "../../common/textfield/select/RhfSelectComponent";
import AsynchronousRhfAutocomplete from "../../common/textfield/autocomplete/AsynchronousRhfAutocomplete";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";

const ManageProjectMember: FC = () => {
  const { control, handleDialogClose, handleSubmit, onSubmit } =
    useManageProjectMember();
  return (
    <Stack gap={1} p={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <AsynchronousRhfAutocomplete
        control={control}
        name="userId"
        label="User"
        required
        apiDetails={{
          api: dataServices.getUsers,
        }}
        sx={{ minWidth: 300 }}
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
      <Box display="flex" flexDirection="row" justifyContent="center" gap={1}>
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
