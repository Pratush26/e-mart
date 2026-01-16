"use client"
import { useForm } from "react-hook-form"
import '@/Utils/styles/form.css'
import { toast } from "sonner"

const categoryList = [
  {
    _id: 1,
    name: "grocery"
  },
  {
    _id: 2,
    name: "perfume"
  }
]
interface dataType {
  title: string;
  description: string;
  category: string;
  photo: FileList;
  price: number;
  stock: number;
  unit: string;
}
export default function AddItemsForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<dataType>()

  const formSubmit = async (data: dataType) => {
    if (!data?.photo) {
      toast.error("Image not found!");
      return;
    }
    const formData = new FormData();
    formData.append("file", data?.photo?.[0]);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_Cloudinary_Upload_Preset}`);
    formData.append("folder", "product_images");
    try {
      const ImgRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloudinary_CloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadResult = await ImgRes.json();
      if (!uploadResult?.secure_url) {
        toast.error("Image upload failed!");
        return;
      }
      data.photo = uploadResult.secure_url;
      const res = await fetch("/api/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Successfully created your product");
        reset();
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err)
      toast.error((err as Error)?.message || "Something went wrong!");
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="w-full">
        {errors.title ? <p className="text-sm text-rose-600">{errors.title.message as string}</p> : <label htmlFor="title">Title :</label>}
        <input type="text" {...register("title", { required: "title is required" })} placeholder="Enter product title" id="title" />
      </div>
      <div className="w-full">
        {errors.description ? <p className="text-sm text-rose-600">{errors.description.message as string}</p> : <label htmlFor="description">Description :</label>}
        <textarea {...register("description", { required: "description is required" })} placeholder="Enter product description" id="description" />
      </div>
      <div className="w-full">
        {errors.price ? <p className="text-sm text-rose-600">{errors.price.message as string}</p> : <label htmlFor="price">Price :</label>}
        <input type="number" {...register("price", { required: "price is required" })} placeholder="Enter product unit price" id="price" />
      </div>
      <div className="w-full">
        {errors.stock ? <p className="text-sm text-rose-600">{errors.stock.message as string}</p> : <label htmlFor="stock">Stock :</label>}
        <input type="number" {...register("stock", { required: "stock is required" })} placeholder="Enter stock available" id="stock" />
      </div>
      <div className="w-full">
        {errors.unit ? <p className="text-sm text-rose-600">{errors.unit.message as string}</p> : <label htmlFor="unit">Unit :</label>}
        <select defaultValue="" {...register("unit", { required: "unit is required" })} name="unit" id="unit">
          <option value="" disabled>N/A</option>
          <option value="kg">kg</option>
          <option value="pcs">pcs</option>
          <option value="ml">ml</option>
          <option value="liter">liter</option>
        </select>
      </div>
      <div className="w-full">
        {errors.photo ? <p className="text-sm text-rose-600">{errors.photo.message as string}</p> : <label htmlFor="photo">Photo :</label>}
        <input type="file" {...register("photo", { required: "photo is required" })} id="photo" />
      </div>
      <div className="w-full">
        {errors.category ? <p className="text-sm text-rose-600">{errors.category.message as string}</p> : <label htmlFor="category">Category :</label>}
        <input type="text" {...register("category", { required: "category is required" })} list="categories" placeholder="Enter product category" id="category" />
        <datalist id="categories">
          {
            categoryList?.map(e => <option key={e._id} value={e.name} className="capitalize">{e.name}</option>)
          }
        </datalist>
      </div>
      <button disabled={isSubmitting} className={`btn trns btn-primary mt-3 rounded-md`}>{isSubmitting ? "Creating..." : "Create"}</button>
    </form>
  )
}