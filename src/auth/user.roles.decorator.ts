import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.interface";

export const UserRoles = createParamDecorator((data, req): any[] => {
    return req.user.roles;
});