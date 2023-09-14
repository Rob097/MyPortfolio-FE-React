import { useEffect, useState } from "react";

export default function NoSSR(props) {
    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
        setCanRender(true);
    }, []);

    return canRender ? props.children : <span></span>;
}
