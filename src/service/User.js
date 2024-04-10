import firebase from "firebase/compat/app";

const userAPI = {
  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.id,
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }, 500);
    });
  },
};

export default userAPI;
