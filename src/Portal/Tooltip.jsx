import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

export default function Tooltip({ children, content }) {
     const [coords, setCoords] = useState({top: 0, left: 0});
     const [visible, setVisible] = useState(false);
     const ref = useRef(null);
     
     const tooltip = document.getElementById('tooltip-root');

     useEffect(()=>{
          const handleMouseEvent = (e) =>{
               setCoords({top: e.clientY + 10, left: e.clientX + 10});
          }

          if(visible){
               document.addEventListener('mousemove', handleMouseEvent);
          }
          else{
               document.removeEventListener('mousemove', handleMouseEvent);
          }

          return ()=> document.removeEventListener('mousemove', handleMouseEvent);
     }, [visible]);
return (
     <>
          <span ref={ref} onMouseEnter={()=> setVisible(true)} onMouseLeave={()=> setVisible(false)} className='cursor-pointer'>
               {children}
          </span>

          {visible && tooltip && 
               ReactDOM.createPortal(
                    <div className="bg-gradient-to-br from-[#2b0a3d] to-[#431c69] text-[#eecfff] text-sm px-4 py-2 rounded-lg shadow-lg max-w-xs transition-opacity duration-200 z-[999]" style={{ position: 'fixed', top: coords.top, left: coords.left }}>
                         {content}
                    </div>,
                    tooltip
               )
          }
     </>
)
}
