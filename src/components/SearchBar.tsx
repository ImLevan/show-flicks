import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate()
    const location = useLocation();

    const handleQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const searchPath = location.pathname.includes('/tv') ? 'tv' : 'movies';
        navigate(`/search/${searchPath}?q=${query}`);
    }

    return (
        <form onSubmit={handleQuerySubmit}  className="min-w-[90px] w-1/4 md:w-1/6 flex bg-gray-950 px-4 py-2 focus-within:bg-gray-800 rounded-3xl">
            <button>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="icon icon-tabler icon-tabler-search text-gray-400 mt-1 mr-2" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path 
                        stroke="none" 
                        d="M0 0h24v24H0z" 
                        fill="none" 
                    />
                    <path 
                        d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" 
                    />
                    <path 
                        d="M21 21l-6 -6" 
                    />
                </svg>
            </button>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-950 text-white rounded mr-4 focus:outline-none focus:bg-gray-800"
            />
        </form>
    )
}

export default SearchBar