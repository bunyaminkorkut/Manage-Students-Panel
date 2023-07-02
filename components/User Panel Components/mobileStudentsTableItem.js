import Image from "next/image"
import { Button } from "../button"
import { useRef, useState } from "react"

export const MobileStudentsTableItem = ({ user, deleteItem, editItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const userInfoRef = useRef(null)

  return (
    <>
      <div className="bg-white py-3 my-2 rounded-lg">
        <div onClick={() => setIsOpen(!isOpen)} className="flex items-center px-6 justify-between">
          <div className="flex items-center gap-x-2">
            <div className="w-[65px] h-[55px] overflow-hidden flex justify-center items-center ">
              <Image className="rounded-lg" alt={user.id} src={user.image} width={65} height={55} />
            </div>
            <div className="pl-2">
              <p>{user.firstName}{' '}{user.lastName}</p>
            </div>
          </div>
          <div style={{ transform: (isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)') }} className={"duration-300 "}>
            <Image alt="open" src={'/icons/arrow.svg'} width={24} height={24} />
          </div>
        </div>
        <div ref={userInfoRef} style={{ height: isOpen ? userInfoRef?.current?.scrollHeight : '0px' }} className={"transition-all overflow-hidden  duration-300 ease-in-out px-6 pt-3" + (isOpen ? " border-t mt-1 border-cream" : "")}>
          <div className="flex flex-col">
            <p><span className="text-solitude">Name:</span> {user.firstName}{' '}{user.lastName}</p>
            <p><span className="text-solitude">Email:</span> {user.email}</p>
            <p><span className="text-solitude">Phone:</span> {user.phone}</p>
            <p><span className="text-solitude">Website:</span> {user.domain}</p>
            <p><span className="text-solitude">Company:</span> {user.company.name}</p>
          </div>
          <div className="flex gap-x-4 justify-between mt-3">
            <Button onClick={() => { editItem(user) }} fullWidth className={"py-2"}>Edit Student</Button>
            <Button onClick={() => { deleteItem(user) }} fullWidth className={"py-2 bg-red-600"}>Delete Student</Button>
          </div>
        </div>
      </div>
    </>
  )
}