import { ReactNode, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
export const RequireAuth = ({
  children,
}: {
  children: ReactNode;
}): ReactElement | null => {
  const JWT = useSelector((state:RootState) =>state.user.jwt);
  if (!JWT) {
    return <Navigate to="/auth/login" />;
  }
  return children as ReactElement;
};
