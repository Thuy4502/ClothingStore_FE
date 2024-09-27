import React from 'react'
import { useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const navigate = useNavigate();


  return (
    <div><main id="content" role="main" class="w-full  max-w-md mx-auto">
    <div className=" bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Confirm OTP</h1>
          <p className="block text-lg text-gray-800 dark:text-white">Enter OTP we just sent you</p>
        </div>
        <div class="mt-5">
          <form>
            <div className="grid gap-y-4">
              <div>
                <label for="otp" class="block text-sm font-bold ml-1 mb-2 dark:text-white">OTP</label>
                <div className="relative">
                  <input type="text" id="otp" name="otp" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error"/>
                </div>
               
              </div>
              <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main></div>
  )
}

export default OTPForm