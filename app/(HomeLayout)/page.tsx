import BannerSection from "@/Components/Sections/Home/Banner";

const bannerData = [
    {
      "_id": 1,
      "title": "Latest Tech Gadgets 2024",
      "subtitle": "Up to 50% Off on Premium Electronics",
      "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w-800&auto=format&fit=crop",
      "ctaText": "Shop Now",
      "ctaLink": "/all-items",
      "badge": "Flash Sale"
    },
    {
      "_id": 2,
      "title": "Smart Home Essentials",
      "subtitle": "Automate Your Life with Cutting-Edge Devices",
      "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w-800&auto=format&fit=crop",
      "ctaText": "Explore Smart Home",
      "ctaLink": "/all-items",
      "badge": "New Arrivals"
    },
    {
      "_id": 3,
      "title": "Gaming Paradise",
      "subtitle": "High-Performance Gear for Pro Gamers",
      "image": "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w-800&auto=format&fit=crop",
      "ctaText": "View Gaming Collection",
      "ctaLink": "/all-items",
      "badge": "Hot Deals"
    }
  ]
export default function Home() {
  return (
    <main>
      <section className="w-11/12 mx-auto">
        <BannerSection bannerData={bannerData} /> 
      </section>
    </main>
  );
}
