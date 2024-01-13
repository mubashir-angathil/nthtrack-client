import { socket } from "../services/api-instance/Instance";
import { useAuthContext } from "../utils/helpers/context/auth-context/AuthContext";

const useSocketHelpers = () => {
  // Accessing authentication details from the context
  const { authDetails } = useAuthContext();

  // Authentication helper function
  const authenticate = () => {
    return authDetails.auth && authDetails.user.id
      ? authDetails.user.id
      : false;
  };

  // Join room helper function
  const joinRoom = ({ roomIds }: { roomIds: number[] }) => {
    const userId = authenticate();

    // Check if the user is authenticated before joining the room
    if (userId) {
      // Emit a "join-room" event to the server with roomIds and userId
      socket.emit("join-room", { roomIds, userId });
    }
  };

  // Push notification helper function
  const pushNotification = ({
    message,
    broadcastId,
  }: {
    broadcastId: number;
    message: string;
  }) => {
    const userId = authenticate();

    // Check if the user is authenticated before sending a push notification
    if (userId) {
      // Replace ":author" in the message with the user's username
      message = message.replace(":author", `${authDetails.user.username}`);

      // Emit a "push-notification" event to the server with message, userId, and broadcastId
      socket.emit("push-notification", {
        content: message,
        author: userId,
        broadcastIds: [broadcastId],
      });
    }
  };

  // Return the helper functions as an object
  return {
    joinRoom,
    pushNotification,
  };
};

// Export the custom hook
export default useSocketHelpers;
