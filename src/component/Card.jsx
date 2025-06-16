import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import Tooltip from '../Portal/Tooltip';

export default function Card(props) {
  return (
     <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
     <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-slate-700/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group h-32 hover:-translate-y-2 hover:scale-[1.03]">
          <div className="flex items-center justify-between my-3">
          <div className="flex items-center space-x-3">
               <div className="w-12 h-12  rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    
                    <img src={props.element.image} alt="" />
               </div>
               <div>
                    <h3 className="text-base font-semibold text-white">{props.element.name}</h3>
                    <p className="text-xs text-slate-400">{props.element.symbol}</p>
               </div>
          </div>
          <div className="text-right">
               <div className="text-xs text-slate-400">Rank #{props.element.market_cap_rank}</div>
          </div>
          </div>
          <div className="flex justify-between items-center">
               <Tooltip content={`Get ${props.element.name} details`}>
                    <Link to={`/coins/${props.element.id}`} className="text-sm text-slate-400 hover:underline">View All details &#8599;</Link>
               </Tooltip>
          </div>
     </div>
     </motion.div>
  )
}