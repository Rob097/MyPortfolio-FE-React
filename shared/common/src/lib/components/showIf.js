export default function ShowIf(props) {
    const not = props.not ? true : false;

    // props.condition accetta solo valori booleani o undefined (quando la condizione non è presente)
    if (props.condition !== false && props.condition !== true && props.condition !== undefined) {
        throw new Error('ShowIf - condition must be a boolean or undefined. Value: ' + props.condition);
    }

    // Se è specificata una condizione, deve essere vera
    if ((props.condition === false && !not) || (props.condition === true && not)) {
        return null;
    }

    return props.children || null;
}