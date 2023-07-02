'use client'
import { Button } from "@/components/button"
import Input from "@/components/input"
import { PageSelect } from "@/components/User Panel Components/pageSelect"
import { StudentsTable } from "@/components/User Panel Components/studentsTable"
import { getUsers } from "@/lib/services/users"
import { useModalStore, useUsersStore } from "@/store/users"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { use, useEffect, useRef, useState } from "react"
import { set } from "react-hook-form"

const getUserList = async ({ limit, skip, search }) => {
  const res = await getUsers({ limit: limit, skip: skip, search: (search ? search : '') })
  return res
}

export default function Page() {

  const users = useUsersStore((state) => state.users)
  const setUsers = useUsersStore((state) => state.setUsers)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlLimit = searchParams.get('limit')
  const urlSkipped = searchParams.get('skipped')
  const urlSearch = searchParams.get('search')
  const [skipped, setSkipped] = useState(urlSkipped ? parseInt(urlSkipped) : 0)
  const itemOnScreen = Math.floor((window.innerHeight - 254) / 96)
  const itemCount = (itemOnScreen <= 5 ? 5 : (itemOnScreen >= 15 ? 15 : itemOnScreen))
  const [limit, setLimit] = useState(urlLimit ? parseInt(urlLimit) : itemCount)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState(urlSearch)
  const setUserModalData = useModalStore((state) => state.setUserModalData)
  const searchRef = useRef(null)
  const [timer, setTimer] = useState(null)
  const [loading, setLoading] = useState(false)

  const options = []
  for (let index = 5; index < 21; index++) {
    options.push({ value: index, label: index })
  }
  const searchChanged = e => {
    setLoading(true)
    setSearch(e)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      getUserList({ limit: (itemCount), skip: skipped, search: e }).then(res => {
        setUsers(res.users);
        setLimit(res.limit);
        setTotal(res.total);
        setSkipped(res.skip);
      }).finally(() => {
        setLoading(false)
        router.push(`${pathname}?limit=${limit}&skipped=${skipped}&search=${(e ? e : '')}`);
      }).catch((err) => {
        alert(err)
      })
    }, 500)
    setTimer(newTimer)
  }


  const previous = () => {
    if (limit > skipped) {
      setSkipped(0)
    } else {
      setSkipped(skipped - limit);
    }
  }
  const next = () => {
    if (skipped + 2 * limit > total) {
      setLoading(true)
      getUserList({ search: (urlSearch ? urlSearch : ''), limit: (total - skipped - limit), skip: (skipped + limit) }).then(res => {
        setUsers(res.users);
        setTotal(res.total);
        setSkipped(res.skip);
      }).finally(() => {
        setLoading(false);
        router.push(`${pathname}?limit=${total - skipped - limit}&skipped=${skipped + limit}&search=${(urlSearch ? urlSearch : '')}`);
      }).catch((err) => {
        alert(err)
      })
    }
    setSkipped(skipped + limit)
  }

  useEffect(() => {
    if ((skipped + limit <= total || total === 0)) {
      setLoading(true)
      getUserList({ limit: limit, skip: skipped, search: search }).then(res => {
        setUsers(res.users);
        setLimit(res.limit);
        setTotal(res.total);
        setSkipped(res.skip);
      }).finally(() => {
        setLoading(false)
        router.push(`${pathname}?limit=${limit}&skipped=${skipped}&search=${(search ? search : '')}`);
      }).catch((err) => {
        alert(err)
      })
    }
  }, [limit, skipped])


  return (
    <div className="flex w-full overflow-auto h-[calc(100%-64px)] bg-milk px-[30px]">
      <div className="w-full">
        <div className="flex md:flex-row flex-col border-b border-cream justify-between items-center w-full mt-4 md:mt-0">
          <h1 className="text-[22px] font-bold">Students List</h1>
          <div className="flex w-full md:w-auto justify-between md:justify-end gap-x-2 md:gap-x-6 py-3">
            <Input ref={searchRef} value={search} onChange={(e) => { searchChanged(e.target.value) }} inputClassName={"pr-8"} icon={<Image alt="search-icon" src={"/icons/search.svg"} height={14} width={14} />} placeholder={"Search..."} />
            <Button onClick={() => { setUserModalData({}) }}>ADD NEW STUDENT</Button>
          </div>
        </div>
        {loading ?
          <div className="flex justify-center items-center h-[calc(100vh-254px)]">
            <Image alt="loading" src={"/icons/loading.svg"} width={50} height={50} />
          </div> :
          <>
            {total === 0 && <p className="text-melikea mt-4 text-center text-2xl font-semibold">
              Your search - {search} - did not match any students.
            </p>}
            {total > 0 &&
              <div>
                <StudentsTable data={users} />
                <div className="flex items-center justify-between md:justify-end md:gap-x-12 md:pb-5 pb-20 mt-5">
                  <div className="flex items-center">
                    <p className="text-sm text-ash font-[mulish]">Rows per page:</p>
                    <PageSelect value={limit ? options.filter((item) => item.value === limit) : null} options={options} onChange={(e) => { setLimit(e.value) }} />
                  </div>
                  <div className="flex items-center md:gap-x-6">
                    <p className="text-sm text-ash font-[mulish]">{skipped + 1}-{(skipped + limit > total ? total : skipped + limit)} of {total}</p>
                    <div className="flex gap-x-3">
                      {skipped !== 0 && <div onClick={previous} className={(loading ? 'opacity-40 pointer-events-none' : 'cursor-pointer')}>
                        <Image alt="pagePrevious" src={"/icons/left-arrow.svg"} width={24} height={24} />
                      </div>}
                      {skipped + limit < total && <div onClick={next} className={(loading ? 'opacity-40 pointer-events-none' : 'cursor-pointer')}>
                        <Image alt="pageNext" src={"/icons/right-arrow.svg"} width={24} height={24} />
                      </div>}
                    </div>
                  </div>
                </div>
              </div>}
          </>}
      </div>
    </div>
  )
}