import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: number;
  userRole: string;
  userLogin: string;
}

export default () => {
  const cookie = Cookies.get("authToken");
  if (cookie) {
    const token = cookie.split(" ")[1];
    const { userId, userRole, userLogin }: JwtPayload = jwtDecode(token);
    return { userId, userRole, userLogin };
  }
  return { userId: 0, userRole: "", userLogin: "" };
};
