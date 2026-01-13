import { signOut } from "@/auth"
 
export function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="btn btn-primary trns rounded-lg">Sign Out</button>
    </form>
  )
}