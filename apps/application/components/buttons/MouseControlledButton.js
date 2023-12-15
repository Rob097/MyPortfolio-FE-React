import { Typography } from "@mui/material";
import Link from "next/link";
import { useCallback, useState } from "react";

const MouseControlledButton = (props) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    function throttle(func, delay) {
        let lastCall = 0
        return (...args) => {
            const now = new Date().getTime()
            if (now - lastCall < delay) {
                return
            }
            lastCall = now
            return func(...args)
        }
    }

    const onMouseMove = useCallback(
        throttle((e) => {
            const card = e.currentTarget;
            const box = card.getBoundingClientRect();
            const x = e.clientX - box.left;
            const y = e.clientY - box.top;
            const centerX = box.width / 2;
            const centerY = box.height / 2;
            const rotateX = (y - centerY) / 7;
            const rotateY = (centerX - x) / 7;

            setRotate({ x: rotateX, y: rotateY });
        }, 100),
        []
    );

    const onMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <Link href={props.href} >
            <div
                className="card relative h-52 w-fit rounded-xl transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
                onMouseMove={props.noTilt ? undefined : onMouseMove}
                onMouseLeave={props.noTilt ? undefined : onMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
                    transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
                }}
            >
                <div className="pulse absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-75 blur-xl"
                    style={{
                        // background: 'url(https://source.unsplash.com/E8Ufcyxz514/2400x1823) center / cover no-repeat fixed',
                        backgroundColor: 'hsla(38,0%,100%,1)',
                        // backgroundImage: 'radial-gradient(at 17% 75%, hsla(38,100%,45%,1) 0px, transparent 50%), radial-gradient(at 69% 21%, hsla(217,100%,30%,1) 0px, transparent 50%)'
                        backgroundImage: 'radial-gradient(at 0% 19%, hsla(217,100%,30%,1) 0px, transparent 50%), radial-gradient(at 100% 85%, hsla(217,100%,30%,1) 0px, transparent 50%), radial-gradient(at 11% 100%, hsla(38,100%,45%,1) 0px, transparent 50%), radial-gradient(at 83% 0%, hsla(38,100%,45%,1) 0px, transparent 50%)'
                    }}
                />
                <div className="relative flex flex-col sm:flex-row h-full w-full px-10 select-none items-center justify-center rounded-lg text-sm font-light text-slate-950"
                    style={{ backdropFilter: 'blur(15px) saturate(1)' }}
                >
                    {props.icon}
                    <Typography variant="h5" fontWeight="bold" className="text-center text-xl">
                        {props.text}
                    </Typography>
                </div>
            </div>
        </Link>
    );
};

export default MouseControlledButton;