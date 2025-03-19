import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  if (user === false) {
    router.push("/login");
    return null;
  }

  return children;
}
