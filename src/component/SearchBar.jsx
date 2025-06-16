import React, { useContext, useState } from "react";
import { SearchContext } from "./Context";

export default function SearchBar() {
	const [query, setQuery] = useState("");
	const { setValue } = useContext(SearchContext);

	const handleSearch = () => {
		if (query.trim() !== "") {
			setValue(query);
		} else {
			alert("Please enter a query");
		}
	};

	return (
		<div className="mb-8">
			<div className="max-w-2xl mx-auto relative">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSearch();
					}}
					placeholder="Search cryptocurrencies..."
					className="w-full bg-slate-800/50 backdrop-blur-md border border-slate-700/30 rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:border-purple-500/50 transition-all duration-300 text-lg"
				/>
				<button
					onClick={handleSearch}
					className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl px-4 py-2 font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
				>
					Search
				</button>
			</div>
		</div>
	);
}
