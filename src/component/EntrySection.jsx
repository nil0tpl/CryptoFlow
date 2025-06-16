import React from 'react'

export default function EntrySection() {
  return (
    <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 mb-8 border border-slate-700/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"></div>
            <div className="relative z-10 text-center">
                <div className="inline-block p-4 bg-slate-800/50 rounded-2xl mb-6 animate-float">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-2xl font-bold">
                        ₿
                    </div>
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Real-time Crypto Market Intelligence
                </h2>
                <p className="text-xl text-slate-300 mb-6">
                    Track, analyze, and trade cryptocurrencies with advanced tools and real-time data
                </p>
                 
            </div>
            {/* Floating crypto symbols */}
            <div className="absolute top-4 right-4 text-4xl opacity-20 animate-bounce-slow">₿</div>
            <div className="absolute bottom-4 left-4 text-3xl opacity-20 animate-float">Ξ</div>
            <div className="absolute top-1/2 right-8 text-2xl opacity-20 animate-pulse">◎</div>
        </div>
  )
}
