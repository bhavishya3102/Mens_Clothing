
'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

// { name: 'Brand 1', logo: '/placeholder.svg?height=80&width=120' },
// { name: 'Brand 2', logo: '/placeholder.svg?height=80&width=120' },
// { name: 'Brand 3', logo: '/placeholder.svg?height=80&width=120' },
// { name: 'Brand 4', logo: '/placeholder.svg?height=80&width=120' },
// { name: 'Brand 5', logo: '/placeholder.svg?height=80&width=120' },
// { name: 'Brand 6', logo: '/placeholder.svg?height=80&width=120' },
const BRANDS = [
  { name: 'Brand 1', logo: 'https://picsum.photos/800/1200?random=2' },
  { name: 'Brand 2', logo: 'https://picsum.photos/800/1200?random=5' },
  { name: 'Brand 3', logo: 'https://picsum.photos/800/1200?random=7' },
  { name: 'Brand 4', logo: 'https://picsum.photos/800/1200?random=2' },
  { name: 'Brand 5', logo: 'https://picsum.photos/800/1200?random=7' },
  { name: 'Brand 6', logo: 'https://picsum.photos/800/1200?random=9' },

]

export function InfiniteSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let animationId: number
    let startX: number
    let scrollLeft: number
    let isDown: boolean = false

    const scroll = () => {
      if (!slider) return
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0
      } else {
        slider.scrollLeft += 1
      }
      animationId = requestAnimationFrame(scroll)
    }

    const startScrolling = () => {
      animationId = requestAnimationFrame(scroll)
    }

    const stopScrolling = () => {
      cancelAnimationFrame(animationId)
    }

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
      stopScrolling()
    }

    const onMouseUp = () => {
      isDown = false
      startScrolling()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 2
      slider.scrollLeft = scrollLeft - walk
    }

    slider.addEventListener('mousedown', onMouseDown)
    slider.addEventListener('mouseleave', onMouseUp)
    slider.addEventListener('mouseup', onMouseUp)
    slider.addEventListener('mousemove', onMouseMove)

    startScrolling()

    return () => {
      stopScrolling()
      slider.removeEventListener('mousedown', onMouseDown)
      slider.removeEventListener('mouseleave', onMouseUp)
      slider.removeEventListener('mouseup', onMouseUp)
      slider.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-10">
      <div className="relative w-full">
        <div
          ref={sliderRef}
          className="flex w-max animate-slide cursor-grab active:cursor-grabbing"
        >
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div
              key={index}
              className="w-[200px] flex-shrink-0 px-4"
            >
              <div className="rounded-lg p-3 bg-white shadow">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={150}
                  height={50}
                  className="mx-auto aspect-square"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

