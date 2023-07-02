import Link from "next/link"

export const DashboardCard = ({ className, icon, text, title, style, link }) => {

  return (
    <Link className="md:flex-1  " href={link? link:'/'}>
      <div style={style} className={"flex justify-between p-5 rounded-lg h-[157px] " + className}>
        <div>
          <div className="flex flex-col gap-y-4">
            {icon}
            {title}
          </div>
        </div>
        <div className="self-end">
          <h2 className="font-bold flex items-end text-[30px]">
            {text}
          </h2>
        </div>
      </div>
    </Link>
  )
}