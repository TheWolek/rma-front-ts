import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: number;
  userRole: string;
}

export default () => {
  const cookie = Cookies.get("authToken");
  if (cookie) {
    const token = cookie.split(" ")[1];
    const { userId, userRole }: JwtPayload = jwtDecode(token);
    return { userId, userRole };
  }
  return { userId: 0, userRole: "" };
};
