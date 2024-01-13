/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import NotificationPanelComponent from "../../../components/common/notification/notification-panels/NotificationPanelComponent";
import { usePushNotificationContext } from "../../../utils/helpers/context/push-notification-context/PushNotificationContext";

const PageNotification: React.FC = () => {
  const { pushNotification, setPushNotification } =
    usePushNotificationContext();
  const [refresh, setRefresh] = useState<boolean>();
  const [initialRender, setInitialRender] = useState<true>();

  useEffect(() => {
    if (pushNotification.count !== 0) {
      setInitialRender(true);
      setPushNotification({ count: 0 });
    }
  }, []);

  useEffect(() => {
    if (pushNotification.count !== 0 && initialRender) {
      setRefresh((prevState) => !prevState);
      setPushNotification({ count: 0 });
    }
  }, [pushNotification]);

  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <NotificationPanelComponent refresh={refresh} />
      </Grid>
    </Grid>
  );
};

export default PageNotification;
