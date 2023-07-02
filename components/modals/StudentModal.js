'use client'
import ModalLayout from "./ModalLayout";
import Sheet from 'react-modal-sheet';
import { Button } from "../button";
import { useModalStore } from "@/store/users";
import Input from "../input";
import { addUser, updateUser } from "@/lib/services/users";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";

const StudentModalContent = () => {
  const userModalData = useModalStore((state) => state.userModalData)
  const setUserModalData = useModalStore((state) => state.setUserModalData)
  const inputError = 'This field cannot be left blank'

  const { register, handleSubmit, clearErrors, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    clearErrors()
    if (userModalData?.id) {
      setValue('firstName', userModalData.firstName)
      setValue('lastName', userModalData.lastName)
      setValue('email', userModalData.email)
      setValue('phone', userModalData.phone)
      setValue('website', userModalData.domain)
      setValue('companyName', userModalData.company.name)
    } else {
      setValue('firstName', '')
      setValue('lastName', '')
      setValue('email', '')
      setValue('phone', '')
      setValue('website', '')
      setValue('companyName', '')
    }
  }, [userModalData])

  const onSubmit = (data) => {
    clearErrors()
    const dataToSend = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      domain: data.website,
      company: {
        name: data.companyName
      }
    }
    if (!userModalData?.id) {
      addUser(dataToSend).then((res) => {
        setUserModalData(null)
      }).catch((err) => {
        alert(err)
      })
    } else if (userModalData?.id) {
      updateUser({ data: dataToSend, id: userModalData.id }).then((res) => {
        setUserModalData(null)
      }).catch((err) => {
        alert(err)
      })
    }
  }

  return (
    <div>
      <div className="flex justify-between items-start">
        <div onClick={() => setUserModalData(null)} className="text-ikena right-2 top-2 absolute p-2 cursor-pointer hidden md:block">
          X
        </div>
      </div>
      <h1 className="font-semibold text-left pb-4">
        {userModalData?.id ? 'Edit Student' : 'Add New Student'}
      </h1>
      {userModalData?.id &&
        <Image className="mx-auto" alt={userModalData?.id} src={userModalData?.image} width={65} height={55} />
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex w-full items-start gap-x-[14px]">
            <Input className='w-full' label='First Name' placeholder={'Jhon'}
              error={errors.firstName?.message}
              {...register("firstName", {
                required: inputError,
                minLength: {
                  value: 3,
                  message: "This value is too short",
                },
              })}
            />
            <Input className='w-full' label='Last Name' placeholder={'Doe'}
              error={errors.lastName?.message}
              {...register("lastName", {
                required: inputError,
                minLength: {
                  value: 3,
                  message: "This value is too short",
                },
              })}
            />
          </div>
          <div>
            <Input label='Email' placeholder={'jhon@doe.com'}
              error={errors.email?.message}
              {...register("email", {
                required: inputError,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                }
              })}
            />
          </div>
          <div>
            <Input label='Phone' placeholder={'+905555...'}
              error={errors.phone?.message}
              {...register("phone", {
                required: inputError,
                pattern: {
                  value: /^(?=.*[0-9])[- +()0-9]+$/gm,
                  message: "Please enter a valid phone number",
                },
                minLength: {
                  value: 5,
                  message: "This value is too short",
                },
              })}
            />
          </div>
          <div>
            <Input label='Website' placeholder={'jhondoe.com'}
              error={errors.website?.message}
              {...register("website", {
                required: inputError,
                pattern: {
                  value: /\S+\.\S+/,
                  message: "Entered value does not match website format",
                }
              })}
            />
          </div>
          <div>
            <Input label='Company Name' placeholder={'Jhons Inc'}
              error={errors.companyName?.message}
              {...register("companyName", {
                required: inputError,
                minLength: {
                  value: 3,
                  message: "This value is too short",
                }
              })}
            />
          </div>
        </div>
        <div className="md:mt-6 md:flex mt-2 gap-x-2">
          <Button
            className={"md:block hidden"}
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              setUserModalData(null)
            }
            }
          >
            Cancel
          </Button>
          <Button
            fullWidth
            className={'py-3 text-base'}
            type="submit"
          >
            {userModalData?.id ? 'Edit' : 'Add'}
          </Button>
        </div>
      </form>
    </div>
  )
}

const StudentModal = () => {
  const userModalData = useModalStore((state) => state.userModalData)
  const setUserModalData = useModalStore((state) => state.setUserModalData)

  return <>
    <div className="hidden md:block">
      <ModalLayout
        modalStyle={{ maxWidth: '400px' }}
        show={userModalData}
        outsideClick={() => setUserModalData(null)}
      >
        <StudentModalContent />
      </ModalLayout>
    </div>
    <div className="">
      <Sheet
        className="md:hidden"
        isOpen={userModalData} onClose={() => setUserModalData(null)}
        snapPoints={[800]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content disableDrag className="mx-4 mb-4">
            <StudentModalContent />
          </Sheet.Content>
        </Sheet.Container>
        {userModalData &&
          <Sheet.Backdrop onClick={() => { setUserModalData(null) }}>
          </Sheet.Backdrop>}
      </Sheet>
    </div>
  </>
}

export default StudentModal
