import axios from "axios";

const baseURL = "https://dummyjson.com"

export const getUsers = async ({ search, limit, skip } = {}) => {
  console.log(search, limit, skip);
  try {
    const res = await axios({
      method: "GET",
      url: baseURL + ((search === undefined || search === '') ? `/users?limit=${limit}&skip=${skip}&select=firstName,lastName,email,phone,domain,company,image` : `/users/search?q=${search}&limit=${limit}&skip=${skip}&select=firstName,lastName,email,phone,domain,company,image`),
    })
    return res.data;
  } catch (error) {
    throw (error)
  }
}

export const deleteUsers = async ({ id } = {}) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: baseURL + `/users/${id}`,
    })
    return res.data.isDeleted;
  } catch (error) {
    throw (error)
  }
}

export const addUser = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: baseURL + `/users/add`,
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
    return res
  } catch (error) {
    throw (error);
  }
}
export const updateUser = async ({data,id}) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: baseURL + `/users/${id}`,
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
    return res
  } catch (error) {
    throw (error);
  }
}
