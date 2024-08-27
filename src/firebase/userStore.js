import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

export const useUserStore = create((set) => ({
    currentUser: null,
    // isLoading : 
    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null });
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data() });
            } else {
                set({ currentUser: null });
            }
        } catch (err) {
            console.log(err);
            return set({ currentUser: null });
        }
    },
}));