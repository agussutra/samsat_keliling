import { Link } from "@inertiajs/react";
const Header = () => {
    return (
        <header className="flex items-center gap-2 w-full">
            <div className="container mx-20 mt-4 bg-slate-100 rounded-md">
                <div className="flex items-center justify-between">
                    <div className="flex justify-center items-center ml-10">
                        <img src="image/logo.png" width="80px" height="80px" alt="" />
                    </div>
                    <div className="flex gap-8">
                        <div>
                            <Link className="font-bold text-c-brown hover:bg-c-brown hover:text-white p-2 rounded-md">Home</Link>
                        </div>
                        <div>
                            <Link className="font-bold hover:bg-c-brown hover:text-white p-2 rounded-md">Explore</Link>
                        </div>
                        <div>
                            <Link className="font-bold hover:bg-c-brown hover:text-white p-2 rounded-md">Room</Link>
                        </div>
                        <div>
                            <Link className="font-bold hover:bg-c-brown hover:text-white p-2 rounded-md">About</Link>
                        </div>
                        <div>
                            <Link className="font-bold hover:bg-c-brown hover:text-white p-2 rounded-md">Contact</Link>
                        </div>
                    </div>
                    <div>
                        <div className="bg-c-brown py-2 px-5 text-white rounded-md cursor-pointer hover:bg-yellow-700 mr-10">
                            Book Now
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};
export default Header;