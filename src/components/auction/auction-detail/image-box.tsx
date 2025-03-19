/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  Carousel,
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
import { useState } from 'react'

const AuctionImageBox = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
    setIsSwiping(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (Math.abs(e.touches[0].clientX - touchStart) > 10) {
      setIsSwiping(true)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent, i: number) => {
    if (!isSwiping) {
      setIndex(i)
      setIsFullScreen(true)
    }
  }

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-4">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem
              key={i}
              className="relative h-96 w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => handleTouchEnd(e, i)}
              onClick={() => setIsFullScreen(true)}
            >
              <Image
                src={img}
                alt="Product Image"
                fill
                className="cursor-pointer rounded-xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Dialog để hiển thị ảnh full màn hình với Carousel */}
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent>
          <DialogTitle />
          <DialogDescription />
          <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-90">
            <Carousel
              opts={{ loop: true, startIndex: index }}
              className="w-full max-w-4xl"
            >
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i} className="relative h-[80vh] w-full">
                    <Image
                      src={img}
                      alt="Product Image Fullscreen"
                      fill
                      className="rounded-xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                onClick={() =>
                  setIndex((prev) => (prev - 1 + images.length) % images.length)
                }
              />
              <CarouselNext
                onClick={() => setIndex((prev) => (prev + 1) % images.length)}
              />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuctionImageBox
