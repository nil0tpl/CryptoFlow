import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import BaseURL from "../API/BaseURL";
import Card from "./Card";
import LoadingBar from "react-top-loading-bar";
import { SearchContext } from './Context'
import { AuthContext } from "./Auth/AuthContext";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

const initialPage = {
	page: 1,
};

const perPage = 12;

function pageReducer(state, action) {
	switch (action.type) {
		case "PREVIOUS":
			return { page: Math.max(1, state.page - 1) };
		case "NEXT":
			return { page: state.page + 1 };
		default:
			return state;
	}
}

export default function MainContent() {
	const { form } = useContext(AuthContext);
	const { value } = useContext(SearchContext);
	const loadingBarRef = useRef(null);

     const [hasNextPage, sethasNextPage] = useState(true)
	const [baseData, setBaseData] = useState([]);
	const [pageState, dispatch] = useReducer(pageReducer, initialPage);
	const [hasError, setHasError] = useState({
			error: false,
			status: "",
			message: "",
	});

     const fetchBaseData = async () => {
          try {
               loadingBarRef.current?.continuousStart();
			
               const baseResponse = await BaseURL(
                    `/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${pageState.page}`
               );

			let filtered = baseResponse.data;

			if (value.trim() !== "") {
				filtered = baseResponse.data.filter((coin) => coin.name.toLowerCase().includes(value.toLowerCase()) || coin.symbol.toLowerCase().includes(value.toLowerCase())
				);
			}

               setBaseData(filtered);
               sethasNextPage(baseResponse.data.length === perPage);

          } catch (error) {
               console.error(error);

			if (error.response) {
				setHasError({
					error: true,
					status: `Error ${error.status}: `,
					message: `${error.response.data.error}`,
				});
			} else if (error.request) {
				setHasError({
					error: true,
					status: `Error ${error.status}: `,
					message: `No Response Recieved from the Server`,
				});
			} else {
				setHasError({
					error: true,
					status: `Error ${error.status}: `,
					message:
						error.message || "An Unexpected Error Occurred",
				});
			}
          } finally {
               loadingBarRef.current?.complete();
          }
     };

	useEffect(() => {
		fetchBaseData();
	}, [pageState.page, value]);

	if (hasError.error === true) {
		return (
			<div id="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
				<div className="animate-fadeScaleIn bg-gradient-to-br from-purple-800 via-slate-900 to-purple-900 text-white rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-xl p-6 sm:p-8">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl sm:text-2xl font-semibold text-pink-400">
							Error {hasError.status}
						</h2>
						<button onClick={() => setHasError({...hasError, error: false})} className="text-purple-300 hover:text-white transition-colors text-xl"aria-label="Close">
							✕
						</button>
					</div>

					<p className="text-slate-300 text-sm sm:text-base mb-8">
						{hasError.message}
					</p>

					<div className="flex flex-col sm:flex-row justify-end gap-4">
						<button onClick={() => window.location.reload()} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors text-white text-sm font-medium shadow-sm shadow-pink-500/30">
							Reload
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-slate-900/20 pt-8 pb-4 px-4 rounded-2xl">
			<LoadingBar color="#FF85DE" height={3} ref={loadingBarRef} />
			<ErrorBoundary fallback={<h2>Error Fetching Data</h2>}>
				{form.loginState === true ? (
					<div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{baseData.length === 0 && (
								<div className="text-gray-400 italic">
									No Data to show
								</div>
							)}

							{baseData.map((element) => {
								return <Card key={element.id} element={element} />
							})}
						</div>

						<div className="w-full flex justify-end px-6 mt-10">
							<div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
								<button
									disabled={pageState.page === 1}
									onClick={() => dispatch({ type: "PREVIOUS" })}
									className={`px-6 py-2 rounded-xl font-semibold shadow-md transition duration-300 ${
										pageState.page === 1
											? "bg-[#361d44] text-[#8d4d7b] italic cursor-not-allowed"
											: "bg-[#2B0A3D] hover:bg-[#FF85DE] text-[#F472D0] hover:text-[#2B0A3D] cursor-pointer"
									}`}
								>
									← Previous
								</button>

								<button 
									disabled={!hasNextPage}
									onClick={() => dispatch({ type: "NEXT" })}
									className={`px-6 py-2 rounded-xl font-semibold shadow-md transition duration-300 ${!hasNextPage ? "bg-[#361d44] text-[#8d4d7b] italic cursor-not-allowed" : "bg-[#2B0A3D] hover:bg-[#FF85DE] text-[#F472D0] hover:text-[#2B0A3D] cursor-pointer"}`}
								>
									Next →
								</button>
							</div>
						</div>
					</div>) : (
					<div className="text-gray-400 italic">
							Signup or Login
						</div>
				)}
			</ErrorBoundary>
		</div>
	);
}
