import type { ReactNode } from "react";
const FullScreenLoaderWrapper = ({children}: {children: ReactNode}) => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            {children}
        </div>
    )
}

export default FullScreenLoaderWrapper;