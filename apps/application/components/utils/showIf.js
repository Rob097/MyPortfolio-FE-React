// import { useGlobalState } from "@utilities/global-state";

export default function ShowIf(props) {
    // const [globalState, dispatch] = useGlobalState();

    const not = props.not ? true : false;

    // props.condition accetta solo valori booleani o undefined (quando la condizione non è presente)
    if (props.condition !== false && props.condition !== true && props.condition !== undefined) {
        throw new Error('ShowIf - condition must be a boolean or undefined. Value: ' + JSON.stringify(props.condition));
    }

    // Se è specificata una condizione, deve essere vera
    if ((props.condition === false && !not) || (props.condition === true && not)) {
        return null;
    }

    /* Se è specificata una lista di ruoli, quello selezionato deve essere uno di quelli elencati
    if (props.roles) {
        let roles = props.roles;
        if (typeof roles == 'string') {
            roles = [roles];
        }
        const includesRole = roles.includes(globalState.currentRole);
        if ((!includesRole && !not) || (includesRole && not)) {
            return null;
        }
    }*/

    /* Se è specificata una lista di permessi, l'utente deve possederli tutti
    if (props.permissions) {
        let permissions = props.permissions;
        if(typeof permissions == 'string') {
            permissions = [permissions];
        }
        let hasPermissions = true;
        for (let permission of permissions) {
            if (!globalState.hasPermission(permission)) {
                hasPermissions = false;
                break;
            }
        }
        if ((!hasPermissions && !not) || (hasPermissions && not)) {
            return null;
        }
    }*/

    /* Controllo se l'utente ha un permesso in uno qualunque dei suoi ruoli
    if (props.permissionsInAnyRole) {
        let permissions = props.permissionsInAnyRole;
        if(typeof permissions == 'string') {
            permissions = [permissions];
        }
        let hasPermissions = true;
        for (let permission of permissions) {
            if (!globalState.hasPermissionInAnyRole(permission)) {
                hasPermissions = false;
                break;
            }
        }
        if ((!hasPermissions && !not) || (hasPermissions && not)) {
            return null;
        }
    }*/

    return props.children || null;
}