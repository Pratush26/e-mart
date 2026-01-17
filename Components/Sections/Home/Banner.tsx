"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/Components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

interface dataType {
    _id: number,
    title: string,
    subtitle: string,
    image: string,
    ctaText: string,
    ctaLink: string,
    badge: string
}
export default function BannerSection({ bannerData }: { bannerData: dataType[] }) {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full my-8"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
        >
            <CarouselContent>
                {bannerData?.map(e => (
                    <CarouselItem key={e._id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center-safe justify-items-center-safe text-center mx-8">
                        <div className="relative aspect-square h-[70vh]">
                            <Image src={e.image} fill loading='lazy' alt="banner photo" className='aspect-square rounded-xl object-center object-cover' />
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-3">
                            <h6 className='text-2xl font-bold'>{e.title}</h6>
                            <span className="bg-secondary px-4 py-1.5 rounded-full text-sm font-medium">{e.badge}</span>
                            <p>{e.subtitle}</p>
                            <Link href={e.ctaLink} className="btn btn-primary trns rounded-full" >{e.ctaText}</Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}