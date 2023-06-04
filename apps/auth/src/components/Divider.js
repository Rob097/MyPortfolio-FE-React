const Divider = (props) => (
    <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
        </div>
        {
            props.text &&
            <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">{props.text}</span>
            </div>
        }
    </div>
);

export default Divider;