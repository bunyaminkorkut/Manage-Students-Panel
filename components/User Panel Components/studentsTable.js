import { StudentsTableItem } from "./studentsTableItem"
import { useModalStore, useUsersStore } from "@/store/users"
import { MobileStudentsTableItem } from "./mobileStudentsTableItem"

export const StudentsTable = ({ data = [] }) => {
  const deletedUsers = useUsersStore((state) => state.deletedUsers)
  const setUserModalData = useModalStore((state) => state.setUserModalData)
  const setDeleteModalData = useModalStore((state) => state.setDeleteModalData)

  const editItem = (data) => {
    setUserModalData(data)
  }

  return (
    <>
      {/* ////desktop */}
      <table className="w-full md:table hidden">
        <thead className="">
          <tr className="text-melikea text-xs text-left font-semibold">
            <th></th>
            <th className="py-[22px]">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-left">
          {data?.map((item, index) => {
            if (deletedUsers?.includes(item.id)) {
              return null
            }
            return <StudentsTableItem editItem={editItem} deleteItem={setDeleteModalData} key={index} user={item} />
          })}
        </tbody>
      </table>
      {/* //////mobile */}
      <div className="md:hidden block">
        {data?.map((item, index) => {
          if (deletedUsers.includes(item.id)) {
            return null
          }
          return <MobileStudentsTableItem editItem={editItem} deleteItem={setDeleteModalData} key={index} user={item} />
        })}
      </div>
    </>
  )
}