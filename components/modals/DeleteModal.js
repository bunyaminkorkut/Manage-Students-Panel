'use client'
import ModalLayout from "./ModalLayout";
import Sheet from 'react-modal-sheet';
import { useModalStore, useUsersStore } from "@/store/users";
import Image from "next/image";
import { Button } from "../button";
import { deleteUsers } from "@/lib/services/users";


const DeleteModalContent = () => {
  const deleteModalData = useModalStore((state) => state.deleteModalData)
  const setDeleteModalData = useModalStore((state) => state.setDeleteModalData)
  const setDeletedUsers = useUsersStore((state) => state.setDeletedUsers)
  const deletedUsers = useUsersStore((state) => state.deletedUsers)
  const user = deleteModalData
  const deleteItem = (id) => {
    deleteUsers({ id: id }).then((res) => {
      if (res) {
        setDeletedUsers([...deletedUsers, id])
      }
      setDeleteModalData(null)
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <div className="relative">
      <h2 className="text-xl relative">Are you sure to delete student?
      </h2>
      <div onClick={() => setDeleteModalData(null)} className="text-ikena right-0 top-0 absolute p-1 cursor-pointer hidden md:block">
        X
      </div>
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center px-6 justify-between">
        <div className="flex items-center gap-x-2">
          <div className="w-[65px] h-[55px] overflow-hidden flex justify-center items-center ">
            <Image className="rounded-lg" alt={user?.id} src={user?.image} width={65} height={55} />
          </div>
          <div className="pl-2">
            <p>{user?.firstName}{' '}{user?.lastName}</p>
          </div>
        </div>

      </div>
      <div className={"transition-all overflow-hidden  duration-300 ease-in-out px-6 py-3 mt-1"}>
        <div className="flex flex-col">
          <p><span className="text-solitude">Name:</span> {user?.firstName}{' '}{user?.lastName}</p>
          <p><span className="text-solitude">Email:</span> {user?.email}</p>
          <p><span className="text-solitude">Phone:</span> {user?.phone}</p>
          <p><span className="text-solitude">Website:</span> {user?.domain}</p>
          <p><span className="text-solitude">Company:</span> {user?.company.name}</p>
        </div>
        <div className="flex gap-x-4 justify-between mt-3">
          <Button onClick={() => { setDeleteModalData(null) }} fullWidth className={"py-2 md:block hidden"}>Cancel</Button>
          <Button onClick={() => { deleteItem(user.id) }} fullWidth className={"py-2 bg-red-600"}>Delete Student</Button>
        </div>
      </div>    </div>
  )
}

const DeleteModal = () => {
  const deleteModalData = useModalStore((state) => state.deleteModalData)
  const setDeleteModalData = useModalStore((state) => state.setDeleteModalData)


  return <>
    <div className="hidden md:block">
      <ModalLayout
        modalStyle={{ maxWidth: '400px' }}
        show={deleteModalData}
        outsideClick={() => setDeleteModalData(null)}
      >
        <DeleteModalContent />
      </ModalLayout>
    </div>
    <div className="">
      <Sheet
        className="md:hidden"
        isOpen={deleteModalData} onClose={() => setDeleteModalData(null)}
        snapPoints={[400]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content disableDrag className="mx-4 mb-4">
            <DeleteModalContent />
          </Sheet.Content>
        </Sheet.Container>
        {deleteModalData &&
          <Sheet.Backdrop onClick={() => { setDeleteModalData(null) }}>
          </Sheet.Backdrop>}
      </Sheet>
    </div>
  </>
}

export default DeleteModal
