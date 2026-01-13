"use client"

import { useForm } from "react-hook-form"
import '@/Utils/styles/form.css'
import { toast } from "sonner";

interface userInfo {
    name: string;
    email: string;
    password: string;
    photo: FileList;
    phone: string;
    address: string;
}

export default function RegistrationForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<userInfo>()
  const formSubmit = async (data: userInfo) => {
    if (!data?.photo) {
      toast.error("Image not found!");
      return;
    }
    const formData = new FormData();
    formData.append("file", data?.photo?.[0]);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_Cloudinary_Upload_Preset}`);
    formData.append("folder", "user_images");
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
    //   const res = await registerUser(data);
    //   if (res.success) toast.success(res.message as string || "Successfully registered user");
    //   else toast.error(res.message as string || "Something went wrong!");
      reset();
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong!");
    }
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="w-full">
        {errors.name ? <p className="text-sm text-rose-600">{errors.name.message as string}</p> : <label htmlFor="name">Name :</label>}
        <input type="text" {...register("name", { required: "Name is required" })} placeholder="Enter your name" id="name" />
      </div>
      <div className="w-full">
        {errors.email ? <p className="text-sm text-rose-600">{errors.email.message as string}</p> : <label htmlFor="email">Email :</label>}
        <input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter your email" id="email" />
      </div>
      <div className="w-full">
        {errors.phone ? <p className="text-sm text-rose-600">{errors.phone.message as string}</p> : <label htmlFor="phone">phone :</label>}
        <input type="tel" {...register("phone", { required: "Phone number is required" })} placeholder="Enter phone" id="phone" />
      </div>
      <div className="w-full">
        {errors.photo ? <p className="text-sm text-rose-600">{errors.photo.message as string}</p> : <label htmlFor="photo">Photo :</label>}
        <input type="file" accept="image/*" {...register("photo", { required: "Photo is required" })} placeholder="Enter photo" id="photo" />
      </div>
      <div className="w-full">
        {errors.password ? <p className="text-sm text-rose-600">{errors.password.message as string}</p> : <label htmlFor="password">password :</label>}
        <input type="password" {...register("password", { required: "Password is required" })} minLength={8} placeholder="Enter password" id="password" />
      </div>
      <div className="w-full">
        {errors.address ? <p className="text-sm text-rose-600">{errors.address.message as string}</p> : <label htmlFor="address">Address :</label>}
        <textarea {...register("address", { required: "Address is required" })} placeholder="Enter your address" id="address" />
      </div>
      <button disabled={isSubmitting} className={`btn trns btn-primary rounded-md`}>{isSubmitting ? "Registering..." : "Register"}</button>
    </form>
  )
}