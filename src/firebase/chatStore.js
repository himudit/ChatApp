import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isRecieverBlocked: false,

    // isLoading : 
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser

        // CHECK IF CURRENT USER IS BLOCKED
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isRecieverBlocked: false,
            });
        }
        // CHECK IF RECIEVER USER IS BLOCKED
        if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isRecieverBlocked: true,
            });
        }

        changeBlock: () => {
            set(state => ({
                ...state,
                isRecieverBlocked: !state.isReceiverBlocked
            }));
        }
    }
}));