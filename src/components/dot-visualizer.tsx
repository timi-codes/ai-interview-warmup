import React, { useRef } from "react";


const DotVisualizer = () => { 
    const dotRefs = [useRef(null), useRef(null), useRef(null)];

    return (
        <div className="flex justify-center items-center space-x-1 bg-black w-10 h-10 rounded-full px-2 py-1">
            {dotRefs.map((ref, index) => (
                <div
                    key={index}
                    ref={ref}
                    className="w-1 h-1 bg-white rounded-full transition-transform duration-100 ease-linear"
                />
            ))}
        </div>
    );
};

export default DotVisualizer;