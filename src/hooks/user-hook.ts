import React from "react";
import { IUserContext, UserContext } from "../contexts/user-context";

const useUser = () => React.useContext<IUserContext | any>(UserContext);

export default useUser;
