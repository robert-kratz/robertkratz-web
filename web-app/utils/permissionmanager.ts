import { UserDocument } from '../types/UserDocument';

export default class PermissionManager {
    permissions: string[];
    groups: string[];
    user: UserDocument;

    constructor(user: UserDocument) {
        this.permissions = user.permissions || [];
        this.groups = user.roles || [];

        this.user = user;
    }

    hasPermission(permission: string) {
        if (this.permissions.includes('*')) {
            return true;
        }
        if (this.groups.includes('root')) return true;

        return this.permissions.includes(permission);
    }

    hasGroup(group: string) {
        if (this.groups.includes('*')) return true;
        if (this.groups.includes('root')) return true;

        return this.groups.includes(group);
    }

    hasAnyPermission(permissions: string[]) {
        if (this.permissions.includes('*')) return true;
        if (this.groups.includes('root')) return true;

        return permissions.some((permission: string) => this.permissions.includes(permission));
    }

    hasAnyGroup(groups: string[]) {
        if (this.groups.includes('*')) return true;
        if (this.groups.includes('root')) return true;

        return groups.some((group: string) => this.groups.includes(group));
    }
}
