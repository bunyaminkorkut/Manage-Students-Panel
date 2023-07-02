'use client'
import { DashboardCard } from "@/components/User Panel Components/dashboardCard"
import Image from "next/image"


export default function Page() {
  const dashboardItems = [
    {
      title: <p className="text-solitude text-sm font-medium">Students</p>,
      icon: <Image alt="students" src="/icons/student-dashboard.svg" width={48} height={38} />,
      text: '243',
      className: 'bg-oceanLignht',
      link: '/students'
    },
    {
      title: <p className="text-solitude text-sm font-medium">Course</p>,
      icon: <Image alt="courses" src="/icons/courses-dashboard.svg" width={28} height={35} />,
      text: '13',
      className: 'bg-strowberry',
      link: '/courses'
    },
    {
      title: <p className="text-solitude text-sm font-medium">Payments</p>,
      icon: <Image alt="payment" src="/icons/payment-dashboard.svg" width={35} height={40} />,
      text: <>556,000<span className="text-base pb-1"> &#8378;</span></>,
      className: 'bg-pee',
      link: '/payments'
    },
    {
      title: <p className="text-white text-sm font-medium">Users</p>,
      icon: <Image alt="users" src="/icons/users-dashboard.svg" width={34} height={34} />,
      text: '3',
      className: 'bg-oceanLignht',
      style: { background: 'linear-gradient(134deg, #FEAF00 0%, #F8D442 100%)' },
      link: '/users'
    },

  ]

  return (
    <div className="flex md:flex-wrap md:flex-row  overflow-auto h-[calc(100%-64px)] flex-col gap-y-3 gap-x-4 px-4 pt-4 pb-16 ">
      {dashboardItems.map((item, index) => {
        return (
          <DashboardCard
            key={index}
            title={item.title}
            icon={item.icon}
            text={item.text}
            className={item.className}
            style={item.style}
            link={item.link}
          />
        )
      })}
    </div>
  )
}