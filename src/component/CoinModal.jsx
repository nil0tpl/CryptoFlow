import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BaseURL from "../API/BaseURL";
import LoadingBar from "react-top-loading-bar";
import { motion } from "framer-motion";

export default function CoinModal() {
	const { coinID } = useParams();
	const [coinData, setCoinData] = useState([]);
	const loadingBarRef = useRef(null);
	const [hasError, setHasError] = useState({
		error: false,
		status: "",
		message: "",
	});

	useEffect(()=>{
		document.title = `CryptoFlow - ${coinData.name}`;
	}, []);

	const fetchCoinDetails = async () => {
		try {
			loadingBarRef.current?.continuousStart();
			const response = await BaseURL(
				`/${coinID}?localization=false&sparkline=false&tickers=false`
			);
			setCoinData(response.data);
			setHasError({ error: false, message: "" });
		} catch (error) {

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
		fetchCoinDetails();
	}, [coinID]);

	function formatCurrency(value, decimals = 2) {
		if (value === null || value === undefined || isNaN(value)) return 'N/A';

		let formatted = '';

		if (value >= 1e12) formatted = (value / 1e12).toFixed(decimals) + 'T';
		else if (value >= 1e9) formatted = (value / 1e9).toFixed(decimals) + 'B';
		else if (value >= 1e6) formatted = (value / 1e6).toFixed(decimals) + 'M';
		else if (value >= 1e3) formatted = (value / 1e3).toFixed(decimals) + 'K';
		else formatted = value.toFixed(decimals);

		if (decimals === 0) return formatted;
		return formatted.replace(/\.00$/, '');
	}

	const supplyFormat = (value1, value2) => {
		if (!value1 || !value2) return 0;
		return ((value1 / value2) * 100).toFixed(2);
	};

	if (hasError.error === true) {
		return (
			<div id="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
				<div className="animate-fadeScaleIn bg-gradient-to-br from-purple-800 via-slate-900 to-purple-900 text-white rounded-2xl shadow-2xl border border-purple-500/30 w-full max-w-xl p-6 sm:p-8">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl sm:text-2xl font-semibold text-pink-400">
							Error {hasError.status}
						</h2>
						<button onClick={() => window.history.back()} className="text-purple-300 hover:text-white transition-colors text-xl"aria-label="Close">
							✕
						</button>
					</div>

					<p className="text-slate-300 text-sm sm:text-base mb-8">
						{hasError.message}
					</p>

					<div className="flex flex-col sm:flex-row justify-end gap-4">
						<button onClick={() => window.history.back()} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors text-white text-sm font-medium shadow-sm shadow-purple-500/20">
							Go Back
						</button>
						<button onClick={() => window.location.reload()} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors text-white text-sm font-medium shadow-sm shadow-pink-500/30">
							Reload
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (coinData.length === 0)
		return <LoadingBar color="#FF85DE" height={3} ref={loadingBarRef} />;

	return (
		<motion.div
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<div>
				{/* <!-- Modal Backdrop --> */}
				<div
					id="modal"
					className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" 
				>
					{/* <!-- Modal Container --> */}
					<div className="bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl shadow-purple-500/20 max-w-6xl w-full max-h-[90vh] m-4 border border-purple-500/20 overflow-y-auto">
						{/* <!-- Modal Header --> */}
						<div className="flex items-center justify-between p-6 border-b border-purple-500/20">
							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 rounded-full flex items-center justify-center">
									<img
										src={coinData.image.large}
										alt=""
									/>
								</div>
								<div>
									<h2 className="text-2xl font-bold text-white">
										{coinData.name}
									</h2>
									<span className="text-gray-400 text-sm">
										{coinData.symbol.toUpperCase()}{" "}
										• Rank #
										{coinData.market_cap_rank}
									</span>
								</div>
							</div>
							<Link
								to="/"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</Link>
						</div>

						{/* <!-- Modal Content --> */}
						<div className="p-6 space-y-6">
							{/* <!-- Price Section --> */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
									<div className="text-gray-400 text-sm mb-1">
										Current Price
									</div>
									<div className="text-2xl font-bold text-white">
										${coinData.market_data.current_price.usd}
									</div>
									<div className={`text-sm font-medium ${coinData.market_data.price_change_percentage_24h_in_currency.usd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
										{coinData.market_data.price_change_percentage_24h_in_currency.usd >= 0 ? `+${coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%` : `${coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%`}
									</div>
								</div>
								<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
									<div className="text-gray-400 text-sm mb-1">
										Market Cap
									</div>
									<div className="text-xl font-bold text-white">
										${formatCurrency(coinData.market_data.market_cap.usd)}
									</div>
									<div className="text-gray-400 text-xs">
										Rank #{coinData.market_cap_rank}
									</div>
								</div>
								<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
									<div className="text-gray-400 text-sm mb-1">
										24h Volume
									</div>
									<div className="text-xl font-bold text-white">
										${formatCurrency(coinData.market_data.total_volume.usd)}
									</div>
								</div>
								<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
									<div className="text-gray-400 text-sm mb-1">
										Circulating Supply
									</div>
									<div className="text-lg font-bold text-white">
										{formatCurrency(coinData.market_data.circulating_supply)} {coinData.symbol.toUpperCase()}
									</div>
									<div className="text-gray-400 text-xs">
										{supplyFormat(coinData.market_data.circulating_supply, coinData.market_data.max_supply)}% of max
									</div>
								</div>
							</div>

							{/* <!-- Price History --> */}
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
									<h3 className="text-white font-semibold mb-4">
										Price Performance
									</h3>
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												1h
											</span>
											<span className={`text-sm font-medium ${coinData.market_data.price_change_percentage_1h_in_currency.usd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
												{coinData.market_data.price_change_percentage_1h_in_currency.usd >= 0 ? `+${coinData.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%` : `${coinData.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%`}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												24h
											</span>
											<span className={`font-medium ${coinData.market_data.price_change_percentage_24h_in_currency.usd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
  												{`${coinData.market_data.price_change_percentage_24h_in_currency.usd > 0 ? '+' : ''}${coinData.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%`}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												7d
											</span>
											<span className={coinData.market_data.price_change_percentage_7d_in_currency.usd >= 0 ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
  												{coinData.market_data.price_change_percentage_7d_in_currency.usd >= 0 ? `+${coinData.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)}%` : `${coinData.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)}%`}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												30d
											</span>
											<span className={`font-medium ${coinData.market_data.price_change_percentage_30d_in_currency.usd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
  												{`${coinData.market_data.price_change_percentage_30d_in_currency.usd >= 0 ? '+' : ''}${coinData.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2)}%`}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												1y
											</span>
											<span className={`font-medium ${coinData.market_data.price_change_percentage_1y_in_currency.usd >= 0 ? 'text-green-400' : 'text-red-400'}`}>
  												{`${coinData.market_data.price_change_percentage_1y_in_currency.usd >= 0 ? '+' : ''}${coinData.market_data.price_change_percentage_1y_in_currency.usd.toFixed(2)}%`}
											</span>
										</div>
									</div>
								</div>

								<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
									<h3 className="text-white font-semibold mb-4">
										Key Statistics
									</h3>
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												All-Time High
											</span>
											<span className="text-white font-medium">
												${formatCurrency(coinData.market_data.ath.usd)}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												All-Time Low
											</span>
											<span className="text-white font-medium">
												${formatCurrency(coinData.market_data.atl.usd)}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												Total Supply
											</span>
											<span className="text-white font-medium">
												{formatCurrency(coinData.market_data.total_supply)} {coinData.symbol.toUpperCase()}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												Max Supply
											</span>
											<span className="text-white font-medium">
												{formatCurrency(coinData.market_data.max_supply, 0)} {coinData.symbol.toUpperCase()}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-400">
												Fully Diluted
												Valuation
											</span>
											<span className="text-white font-medium">
												${formatCurrency(coinData.market_data.fully_diluted_valuation.usd)}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* <!-- About Section --> */}
							<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
								<h3 className="text-white font-semibold mb-4">
									About {coinData.name}
								</h3>
								<p className="text-gray-300 leading-relaxed">
									{coinData.description.en}
								</p>
							</div>

							{/* <!-- Action Buttons --> */}
							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								<a href={coinData.links.repos_url.github[0]} target="_blank" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
									GitHub Repository
								</a>
								<a href={coinData.links.homepage[0]} target="_blank" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
									Official Website
								</a>
								<a href={coinData.links.blockchain_site[0]} target="_blank" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105">
									Blockchain Site
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}