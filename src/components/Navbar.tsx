import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useState } from "react"
import XButton from "../utilities/XButton"
import MenuButton from "../utilities/MenuButton"

interface MenuItemProps {
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    menuItems: { path: string, name: string }[]
    showMenu: boolean
    setOtherShowMenu: React.Dispatch<React.SetStateAction<boolean>>
    allType: string
}

const MenuItem: React.FC<MenuItemProps> = ({ setShowMenu, title, menuItems, showMenu, setOtherShowMenu, allType }) => {
    
    const handleMenu = (setShowMenu: React.Dispatch<React.SetStateAction<boolean>>) => {
        return () => {
            setShowMenu(!showMenu)
            setOtherShowMenu(false)
        }
    }

    const handleMouseLeave = (setShowMenu: React.Dispatch<React.SetStateAction<boolean>>) => {
        return () => {
            setShowMenu(false)
        }
    }
    
    return (
        <div className="">
            <button
                className="flex text-gray-400 text-base lg:text-xl cursor-pointer transition-all hover:text-red-600"
                onClick={handleMenu(setShowMenu)}
            >
                {title}
                <svg 
                    className="w-2.5 h-2.5 ms-3 mt-3" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 10 6"
                >
                    <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {showMenu && (
                <div onMouseLeave={handleMouseLeave(setShowMenu)} className="w-64 text-gray-400 absolute  top-full right-0 md:left-0 bg-black rounded shadow-lg md:mt-6 p-0">
                    <Link to={`/search/${allType}`} className="block py-2 px-2 hover:bg-gray-700">All</Link>
                    {menuItems.map((category) => (
                        <Link to={`/search/${allType}?filter=${category.path}`} key={category.path} className="block rounded-sm py-2 px-2 hover:bg-gray-700">{category.name}</Link>
                    ))}
                </div>
            )}
        </div>
    )
}

const Navbar = () => {
    const [showMovieMenu, setShowMovieMenu] = useState(false)
    const [showTvMenu, setShowTvMenu] = useState(false)
    const tvCategories = [{ path: 'popular', name: 'Popular' }, { path: 'top_rated', name: 'Top Rated' }]
    const movieCategories = [{ path: 'popular', name: 'Popular' }, { path: 'top_rated', name: 'Top Rated' }, { path: 'upcoming', name: 'Upcoming' }]
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bg-black bg-opacity-95 top-0 flex items-center justify-between p-4 z-[100] w-full">
            <Link to="/">
                <h1 className="text-base sm:text-base md:text-2xl lg:text-4xl ml-4 md:ml-20 text-red-600 font-bold cursor-pointer ">SHOWFLICKS</h1>
            </Link>
            <div className="items-center gap-x-12 hidden md:flex md:relative">
                <MenuItem
                    setShowMenu={setShowMovieMenu}
                    title="Movies"
                    menuItems={movieCategories}
                    showMenu={showMovieMenu}
                    setOtherShowMenu={setShowTvMenu}
                    allType="movies"
                    
                />
                <MenuItem
                    setShowMenu={setShowTvMenu}
                    title="TV Shows"
                    menuItems={tvCategories}
                    showMenu={showTvMenu}
                    setOtherShowMenu={setShowMovieMenu}
                    allType="tv"
                />
                {/* Add more MenuItem components for other menu items if needed */}
            </div>
            <SearchBar />
            <div className="md:hidden block">
                <div className="flex w-[75px] justify-end md:hidden">
                    <button className="text-white" onClick={toggleNavbar}>
                        {isOpen ? <XButton /> : <MenuButton /> }
                    </button>
                </div>
                {isOpen && (
                    <div className="md:hidden  items-center bg-black rounded-lg mt-2 p-2">
                        <div className="items-center ">
                            <MenuItem
                                setShowMenu={setShowMovieMenu}
                                title="Movies"
                                menuItems={movieCategories}
                                showMenu={showMovieMenu}
                                setOtherShowMenu={setShowTvMenu}
                                allType="movies"
                            />
                            <MenuItem
                                setShowMenu={setShowTvMenu}
                                title="TV Shows"
                                menuItems={tvCategories}
                                showMenu={showTvMenu}
                                setOtherShowMenu={setShowMovieMenu}
                                allType="tv"
                            />
                            {/* Add more MenuItem components for other menu items if needed */}
                        </div>   
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar