//* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import Image from '@/components/ui/image'
import { LucideX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const AuctionImageBox = ({ images }: { images: string[] }) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
    setIsSwiping(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (Math.abs(e.touches[0].clientX - touchStart) > 10) {
      setIsSwiping(true)
    }
  }

  const handleTouchEnd = () => {
    if (!isSwiping) {
      setIsFullScreen(true)
    }
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel opts={{ loop: true }} className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem
              key={i}
              className="relative w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => setIsFullScreen(true)}
            >
              <Image
                src={img}
                alt="Product Image"
                width={400}
                height={400}
                priority
                className="aspect-square w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-2 left-2 rounded bg-gray-800 bg-opacity-50 p-2 py-1 text-primary-foreground">
          {current}/{images.length}
        </div>
      </Carousel>

      {isFullScreen &&
        createPortal(
          <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center bg-black bg-opacity-80 align-middle">
            <Button
              className="absolute right-4 top-4 p-0 text-primary-foreground"
              variant={'ghost'}
              onClick={() => setIsFullScreen(false)}
            >
              <LucideX className="!size-8" />
            </Button>
            <div className="m-auto max-h-full max-w-4xl">
              <Carousel
                opts={{ loop: true, startIndex: current }}
                className="w-full"
              >
                <CarouselContent>
                  {images.map((img, i) => (
                    <CarouselItem key={i} className="relativew-full">
                      <Image
                        src={img}
                        alt="Product Image Fullscreen"
                        width={600}
                        height={600}
                        priority
                        className="aspect-square w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="fixed left-0" />
                <CarouselNext className="fixed right-0" />
              </Carousel>
            </div>
          </div>,
          document.body
        )}
      {/* Dialog để hiển thị ảnh full màn hình với Carousel */}
      <Dialog open={isFullScreen && false} onOpenChange={setIsFullScreen}>
        <DialogContent className="w-full max-w-4xl border-none p-0">
          <DialogTitle />
          <DialogDescription />
          <div className="inset-0 flex w-full items-center justify-center bg-black bg-opacity-90">
            <Carousel
              opts={{ loop: true, startIndex: current }}
              className="w-full"
            >
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i} className="relativew-full">
                    <Image
                      src={img}
                      alt="Product Image Fullscreen"
                      width={600}
                      height={600}
                      className="aspect-square w-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="fixed left-0" />
              <CarouselNext className="fixed right-0" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuctionImageBox
