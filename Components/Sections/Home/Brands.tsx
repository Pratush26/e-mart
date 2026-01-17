"use client"

import * as React from "react"
import AutoScroll from 'embla-carousel-auto-scroll'

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/Components/ui/carousel"
import Image from "next/image"

interface dataType {
    name: string,
    logo: string,
    productCount: number
}
export default function BrandsSection({ brandData }: { brandData: dataType[] }) {
    const plugin = React.useRef(
        AutoScroll({
            playOnInit: true,
            stopOnInteraction: false,
            speed: 1
        })
    )

    return (
        <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[plugin.current]}
            className="w-full my-8"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
        >
            <CarouselContent>
                {brandData?.map((e, i) => (
                    <CarouselItem key={i} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex flex-col items-center justify-center gap-4 p-6 bg-secondary rounded-lg text-center mx-8">
                        <div className="relative aspect-square h-[10vh]">
                            <Image src={e.logo} fill loading='lazy' alt="brand photo" className='aspect-square rounded-xl object-center object-cover' />
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-3">
                            <h6 className='text-2xl font-bold'>{e.name}</h6>
                            <p>Available Product: {e.productCount}</p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}