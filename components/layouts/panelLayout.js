'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PanelLayout({
  children
}) {
  const [isMenu, setIsMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMenu(false)
  }, [pathname])

  const menu = [
    {
      title: "Home",
      icon: '/icons/dashboard.svg',
      link: `/dashboard`
    },
    {
      title: "Course",
      icon: '/icons/course.svg',
      link: `/course`
    },
    {
      title: "Students",
      icon: '/icons/students.svg',
      link: `/students`
    },
    {
      title: "Payment",
      icon: '/icons/payment.svg',
      link: `/payment`
    },
    {
      title: "Report",
      icon: '/icons/report.svg',
      link: `/report`
    },
    {
      title: "Settings",
      icon: '/icons/settings.svg',
      link: `/settings`
    },
  ]

  return (
    <body className='overscroll-none bg-white'>
      <div className="flex w-[100vw] relative">
        {isMenu && <div onClick={() => { setIsMenu(false) }} className="w-[100vw] h-[100vh] bg-black/[0.5] z-20 absolute top-0 right-0 md:hidden">
        </div>}
        <div className={"z-30 flex-shrink-0 w-[80vw] md:w-[270px] h-screen bg-crap pt-5 md:block absolute top-0 md:static duration-300 " + (isMenu ? 'left-0' : '-left-[80vw]')}>
          <div className='font-bold flex items-center justify-center relative'>
            <h1 className='px-[10px] text-xl border-l-[4px] leading-6 border-secondary'>MANAGE COURSES</h1>
            <div onClick={() => { setIsMenu(false) }} className="absolute right-0 top-1/2 -translate-y-1/2 px-3 cursor-pointerc md:hidden">
              <Image alt="close" src='/icons/close.svg' width={24} height={24} />
            </ div>
          </div>
          <div className="flex flex-col h-[90vh] flex-grow justify-between">
            <div>
              <div className="flex items-center justify-center gap-x-4 mt-8 md:flex-col">
                <div className="md:mt-6 md:mb-3">
                  <Image className="md:block hidden mx-auto rounded-full" alt="avatar" src='/images/avatar.png' width={128} height={128} />
                  <Image className="md:hidden rounded-full" alt="avatar" src='/images/avatar.png' width={48} height={48} />
                </div>
                <div className="flex flex-col justify-center items-center gap-y-[10px] ">
                  <h3 className="font-bold text-[17px]">John Doe</h3>
                  <p className="text-primary font-medium text-sm">Admin</p>
                </div>
              </div>
              <div className=" flex flex-col gap-y-4 mt-12">
                {
                  menu.map((item, index) => {
                    return (
                      <Link className=" w-[193px] mx-auto" key={index} href={item.link}>
                        <div className={"py-3 pl-10 mx-auto rounded text-sm duration-300 font-medium hover:bg-primary/[0.5] " + (pathname === item.link ? ' bg-primary ' : '')} >
                          <div className="flex gap-x-3">
                            <span className="w-[20px]"><img src={item.icon} /></span><p>{item.title}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
            <div>
              <Link href={`/`}>
                <div className="flex gap-x-4 justify-center">
                  <p>Logout</p><img alt="logout" src='/icons/logout.svg' />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-screen">
          <div className="md:hidden">
            <div className="h-16 relative">
              <div onClick={() => { setIsMenu(true) }} className=" absolute top-1/2 -translate-y-1/2 left-5 text-white">
                <Image width={24} height={24} alt="menu" src='/icons/menu.svg' />
              </div>
              <div className="text-center text-xl bg-secondary text-white h-full flex items-center justify-center">
                <h2>
                  {menu.filter((item) => { return pathname === item.link })[0].title}
                </h2>
              </div>
            </div>
          </div>
          <div className="h-[64px] mx-[30px] justify-between items-center hidden md:flex">
            <img alt="back" onClick={() => router.push('/dashboard')} className="cursor-pointer" src='/icons/back.svg' />
            <img alt="notification" className="cursor-pointer" src='/icons/bell.svg' />
          </div>
          {children}
        </div>
      </div>
    </body>
  )
}