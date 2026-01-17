import Card from "@/Components/Card";
import BannerSection from "@/Components/Sections/Home/Banner";
import BrandsSection from "@/Components/Sections/Home/Brands";
import { connectDB } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Link from "next/link";

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

const brandData = [
  {
    "name": "Quantum",
    "logo": "https://images.unsplash.com/photo-1719630786712-fbb098007ca1?q=80&w=1090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "productCount": 456
  },
  {
    "name": "Nexus",
    "logo": "https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "productCount": 389
  },
  {
    "name": "AudioWave",
    "logo": "https://plus.unsplash.com/premium_photo-1679814561282-2f735b0ce81f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "productCount": 278
  },
  {
    "name": "TechPro",
    "logo": "https://plus.unsplash.com/premium_photo-1681400580406-2ea0387c3946?q=80&w=919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "productCount": 412
  },
  {
    "name": "HyperX",
    "logo": "https://images.unsplash.com/photo-1610547112565-d8e2f3a493fb?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "productCount": 195
  },
  {
    "name": "LogiTech",
    "logo": "https://images.unsplash.com/photo-1566709603547-638aba3dbbc0?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "productCount": 324
  }
]

interface catergoryType {
  _id: ObjectId;
  name: string;
}
interface ItemType {
  _id: ObjectId;
  title: string;
  description: string;
  category: string;
  photo: string;
  price: number;
}
export default async function Home() {
  let categories: catergoryType[] = [];
  let items: ItemType[] = [];

  try {
    const { db } = await connectDB();
    items = await db.collection<ItemType>("items")
      .find({}, { projection: { title: 1, description: 1, _id: 1, category: 1, price: 1, photo: 1 } })
      .limit(8)
      .sort({ createdAt: -1 })
      .toArray();
    categories = await db.collection<catergoryType>("categories").find({}).limit(12).toArray();
  } catch (err) {
    console.error("FETCH_ERROR:", err);
  }
  return (
    <main>
      <section className="w-11/12 mx-auto">
        <BannerSection bannerData={bannerData} />
      </section>
      <h2 className="text-3xl font-bold text-center mt-16 m-8">All Items</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center-safe justify-items-center-safe gap-5 w-11/12 mx-auto">
        {items.map((item) => <Card key={item._id.toString()} e={item} />)}
      </section>
      <div className="w-fit mx-auto my-6">
        <Link href={"/all-items"} className="btn btn-primary trns rounded-full" >Show All</Link>
      </div>
      <h3 className="text-3xl font-bold mt-16 m-8 w-11/12 mx-auto text-center">Our Product Categories</h3>
      <section className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 place-content-center-safe gap-4">
        {
          categories?.map(e => (
            <div
              key={e._id.toString()}
              className="p-6 bg-secondary rounded-lg text-center font-semibold capitalize trns hover:inset-shadow-sm/20 hover:shadow-lg/20 inset-shadow-primary shadow-primary"
            >
              {e.name}
            </div>
          ))
        }
      </section>
      <section className="w-11/12 mx-auto my-20">
        <h3 className="text-2xl font-bold mt-16 m-8 w-11/12 mx-auto text-center">Top Brands</h3>
        <BrandsSection brandData={brandData} />
      </section>
    </main>
  );
}
