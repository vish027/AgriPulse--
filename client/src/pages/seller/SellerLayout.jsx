import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {

    const { axios, navigate } = useAppContext();


    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/seller/logout`,
                { withCredentials: true }
            );

            if (data.success) {
                toast.success(data.message)
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        /* 1. Main container set to flex-col and occupy at least full viewport height */
        <div className="flex flex-col min-h-screen">
            {/* Header is a standard row element */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/'>
                    {/* FIX: Added h-12 and object-contain to force the logo to a reasonable height */}
                    <img src={assets.logo2} alt="log" className="cursor-pointer w-34 md:w-38 h-12 object-contain" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>

            {/* 2. This container is the sidebar + content. flex-grow makes it take ALL remaining vertical space */}
            <div className="flex flex-grow">
                {/* Sidebar Container: h-full makes it fill the parent's height (which is the remaining space) */}
                <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white"
                                }`
                            }
                        >
                            <img src={item.icon} alt="" className="w-7 h-7" />
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                {/* Content Container: flex-grow makes it take all remaining horizontal space, h-full for vertical fill, overflow-y-auto for content scrolling */}
                <div className="flex-grow overflow-y-auto h-full p-4 md:p-8">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default SellerLayout;