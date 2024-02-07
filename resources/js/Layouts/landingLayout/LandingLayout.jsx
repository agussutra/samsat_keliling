import Header from "./master/Header";

const LandingLayout = ({ children }) => {
    return (
        <>
            {/* <Header /> */}
            <div className="mt-2 w-full">
                {children}
            </div>
        </>
    )
};
export default LandingLayout;