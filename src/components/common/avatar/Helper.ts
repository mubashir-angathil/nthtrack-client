import { SxProps } from "@mui/system";
import { MemberProfile } from "../card/Helper";

export interface AvatarComponentProps extends MemberProfile {
  profile?: boolean;
  sx?: SxProps;
  width?: number;
  height?: number;
  color?: string;
}
