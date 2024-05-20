import { defineStore } from 'pinia';
import type { User } from 'src/types/model.types';
import {
  getUser,

} from '@/services/user.service'
export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchCurrentUser() {
      this.user = await getUser('1');
    },
  },
});