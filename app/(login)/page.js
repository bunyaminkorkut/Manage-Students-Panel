'use client'
import Input from '@/components/input'
import { Button } from '@/components/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({ email: false, password: false })
  const router = useRouter()

  const handleLogin = () => {
    setError({ email: false, password: false })
    if (email === 'admin@admin.com' && password === 'admin') {
      console.log("Login Success");
      router.push(`/dashboard`)
      return
    }
    if (email !== 'admin@admin.com') {
      setError(error => ({ ...error, email: "Please enter a valid email address" }))
    }
    if (password !== 'admin') {
      setError(error => ({ ...error, password: "Please enter a valid password" }))
    }

  }
  return (
    <div className='flex justify-center items-center w-screen h-screen overflow-auto'>
      <div className='w-screen h-screen md:h-auto bg-white md:max-w-[475px] py-11 px-[30px] md:rounded-[20px]'>
        <div className='font-bold flex items-center justify-center'>
          <h1 className='px-3 text-2xl md:text-3.5xl border-l-[6px] border-secondary'>MANAGE COURSES</h1>
        </div>
        <div className='flex flex-col items-center gap-y-2 mt-11 mb-12'>
          <h2 className='text-[22px] font-semibolds'>Sign In</h2>
          <p className='text-sm md:text-left text-center text-solitude'>Enter your credentials to access your account</p>
        </div>
        <div className='flex flex-col gap-y-5'>
          <Input error={error.email} onChange={(e) => { setEmail(e.target.value) }} value={email} className={'md:w-[415px]'} type='email' label="Email" placeholder="Enter your email" />
          <Input error={error.password} onChange={(e) => { setPassword(e.target.value) }} value={password} className={'md:w-[415px]'} type='password' label="Password" placeholder="Enter your password" />
        </div>
        <div className='mt-7'>
          <Button className={'py-3'} onClick={handleLogin} fullWidth>Sign In</Button>
        </div>
        <div className='text-sm mt-7 flex justify-center items-center'>
          <p>Forgot your password? <span className='text-primary underline cursor-pointer'>Reset Password</span> </p>
        </div>
      </div>
    </div >
  )
}
