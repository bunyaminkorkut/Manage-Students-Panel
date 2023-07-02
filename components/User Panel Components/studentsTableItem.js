import Image from "next/image"

export const StudentsTableItem = ({ user, deleteItem,editItem }) => {
  return (
    <>
      <tr className="bg-white text-back text-sm">
        <td className="py-[15px] rounded-l-lg pl-[13px]">
          <div className="w-[65px] h-[55px] overflow-hidden flex justify-center items-center ">
            <Image className="rounded-lg" alt={user.id} src={user.image} width={65} height={55} />
          </div>
        </td>
        <td>
          <div className="pl-2">
            <p>{user.firstName}{' '}{user.lastName}</p>
          </div>
        </td>
        <td>
          <div className="pl-2">
            <p>{user.email}</p>
          </div>
        </td>
        <td>
          <div className="pl-2">
            <p>{user.phone}</p>
          </div>
        </td>
        <td>
          <div className="pl-2">
            <p>{user.domain}</p>
          </div>
        </td>
        <td>
          <div className="pl-2">
            <p>{user.company.name}</p>
          </div>
        </td>
        <td className="text-right rounded-r-lg">
          <div className="flex justify-end mr-5">
            <div onClick={()=>{ editItem(user) }} className={"mr-[33px] w-[19px] h-[19px] cursor-pointer"}><Image alt="edit" src={"/icons/pen.svg"} width={19} height={19} /></div>
            <div onClick={() => { deleteItem(user) }} className={"cursor-pointer w-[16px] h-[18px]"}><Image alt="delete" src={"/icons/trash.svg"} width={16} height={18} /></div>
          </div>
        </td>
      </tr >
      <tr className="h-[10px]">
      </tr>
    </>
  )
}