import { userService } from "../services/user";
import { useQuery } from "react-query";

const User = ({ user }) => {
  const result = useQuery(
    "userNotes",
    () => userService.getAllUserNotes(user),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log("USER BACKEND", result);
  return <div>User</div>;
};

export default User;
