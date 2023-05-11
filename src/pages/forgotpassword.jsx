import { useState } from "react"
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function Forgotpass() {
  const [email, setEmail] = useState(" ");
  function onChange(e){
setEmail(e.target.value);
  }
  async function Forgotpass(e){
e.preventDefault()
try {
  const auth = getAuth()
  await sendPasswordResetEmail(auth, email)
  toast.success("Email was sent")
} catch (error) {
  toast.error("Could not reset your password")
}
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:bd-6">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80" alt="keys"
           className="w-full rounded-xl"/>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={Forgotpass}>
             <input 
             className="w-full px-4 text-md bg-white text-gray-400 rounded border-gray-400 mb-6
             transition ease-in-out"
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange} 
              placeholder="Email address...."
              />
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-md">
                <p 
                className="mb-6"
                >Have an account?
                  <Link to="/sign-in" className="text-red-600 hover:text-red-700
                  cursor-pointer transition-300 ease-in-out ml-1">Sign In</Link>
                </p>
                <p>
                  <Link to="/sign-up"
                  className="text-blue-600 hover:text-blue-800 transition-300 ease-in-out">Register instead</Link>
                </p>
            </div> 
            <div>
              <button 
              className="w-full bg-blue-500 text-sm py-4 text-white font-medium rounded uppercase
              hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
              type="submit"> Send Reset password</button>
              <div className="flex items-center my-4 before:border-t before:flex-1
                before:border-gray-400 after:border-t after:border-gray-400 after:flex-1 ">
                  <p className="text-center font-semibold mx-4">OR</p>
                </div>
             </div>
             <OAuth/>
            </form>    
        </div>
      </div>
    </section>
  )
}
