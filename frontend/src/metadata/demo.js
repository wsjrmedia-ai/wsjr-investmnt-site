'use client'
import { useEffect, useRef } from 'react'

const tickerData = [
  { pair: 'USDZAR', value: '18.09800', change: '+0.01 (+0.05%)', color: 'text-green-400' },
  { pair: 'USDMXN', value: '19.09800', change: '+0.01 (+0.05%)', color: 'text-red-400' },
  { pair: 'USDJPY', value: '154.251', change: '+0.02 (+0.01%)', color: 'text-green-400' },
  { pair: 'EURUSD', value: '1.0934', change: '+0.005 (+0.46%)', color: 'text-green-400' },
  { pair: 'GBPUSD', value: '1.2701', change: '-0.002 (-0.16%)', color: 'text-red-400' },
  { pair: 'AUDUSD', value: '0.6672', change: '+0.001 (+0.15%)', color: 'text-green-400' },
]

export default function TickerTape() {
  const containerRef = useRef(null)
  const tickerRef = useRef(null)
  const animationRef = useRef(null)
  const clonedTickerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const ticker = tickerRef.current
    
    if (!container || !ticker) return

    // Clone the ticker for seamless looping
    clonedTickerRef.current = ticker.cloneNode(true)
    container.appendChild(clonedTickerRef.current)

    const tickerWidth = ticker.scrollWidth
    let position = 0
    const speed = 1.5 // pixels per frame - adjust for speed

    const animate = () => {
      position -= speed
      
      // When first ticker moves completely left, reset position
      if (position <= -tickerWidth) {
        position = 0
      }
      
      // Apply the same transform to both tickers
      ticker.style.transform = `translateX(${position}px)`
      clonedTickerRef.current.style.transform = `translateX(${position + tickerWidth}px)`
      
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
      if (clonedTickerRef.current && container.contains(clonedTickerRef.current)) {
        container.removeChild(clonedTickerRef.current)
      }
    }
  }, [])

  const renderTickerItems = () => (
    tickerData.map((item, index) => (
      <div className="flex items-center space-x-2 px-4" key={`${item.pair}-${index}`}>
        <span className="text-white font-semibold">{item.pair}</span>
          <span className="text-[#FFFFFF]">{item.value}</span>
        <span className={`${item.color}`}>{item.change}</span>
        <span className="text-white px-2">|</span>
      </div>
    ))
  )

  return (
<div
  className=" mt-[-120px] h-[120px] lg:mt-[-170px] lg:h-[170px] pt-[20px] bottom-0 left-0 right-0 bg-[linear-gradient(to_right,rgba(7,30,47,0.5)_0%,rgba(7,30,47,0)_100%)] backdrop-blur-[20px] flex overflow-hidden z-40 bg-no-repeat bg-cover "
  style={{ backgroundImage: "url('/Hero/ticket.png')" }}
>

      <div 
        ref={containerRef}
        className="relative flex whitespace-nowrap w-full h-full"
      >
        <div 
          ref={tickerRef}
          className="flex absolute left-0"
        >
          {renderTickerItems()}
        </div>
      </div>
    </div>
  )
}