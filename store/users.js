import create from 'zustand';

export const useUsersStore = create(
  (set) => ({
    users: [],
    setUsers: (payload) => set(_ => ({ users: payload })),
    pageInfo: {},
    setPageInfo: (payload) => set(_ => ({ pageInfo: payload })),
    deletedUsers: [],
    setDeletedUsers: (payload) => set(_ => ({ deletedUsers: payload })),
  }),
  { name: 'usersStore' }
);

export const useModalStore = create(
  (set) => ({
    userModalData: null,
    setUserModalData: (payload) => set(_ => ({ userModalData: payload})),
    deleteModalData: null,
    setDeleteModalData: (payload) => set(_ => ({ deleteModalData: payload })),
  }),
  { name: 'modalStore' }
);