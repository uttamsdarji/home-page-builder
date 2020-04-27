export function authListener() {
  return (dispatch,getState, { getFirebase } ) => {
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged((user) => {
      dispatch({type: 'SHOW_MAIN_LOADER', show: false});
    })
  }
}

export function login(email,password,cb) {
  return (dispatch,getState,{ getFirebase }) => {
    dispatch({type: 'SHOW_MAIN_LOADER', show: true});
    if(email && password) {
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(email,password).then(user => {
        dispatch({type: 'SHOW_MAIN_LOADER', show: false});
        dispatch({type: 'ADD_LOGIN_ERROR', error: null})
        if(cb) {
          cb();
        }
      }).catch((e) => {
        dispatch({type: 'ADD_LOGIN_ERROR', error: e})
        dispatch({type: 'ADD_USER_DATA', data: null});
        dispatch({type: 'SHOW_MAIN_LOADER', show: false});
      })
    }
  }
}

export function logout(cb) {
  return (dispatch,getState,{ getFirebase }) => {
    dispatch({type: 'SHOW_MAIN_LOADER', show: true});
    const firebase = getFirebase()
    firebase.auth().signOut().then(() => {
      if(cb) {
        cb()
      }
      dispatch({type: 'USER_LOGOUT'});
      dispatch({type: 'SHOW_MAIN_LOADER', show: false});
    });
  }
}

export function signup(email,password,cb) {
  return (dispatch,getState,{getFirebase,getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({type: 'SHOW_MAIN_LOADER', show: true});
    firebase.auth().createUserWithEmailAndPassword(email,password).then((response) => {
      return firestore.collection('users').doc(response.user.uid).set({templates:{}}).then(() => {
        dispatch({type: 'SHOW_MAIN_LOADER', show: false});
        if(cb) {
          cb();
        }
      })
    }).catch((e) => {
      dispatch({type: 'SHOW_MAIN_LOADER', show: false});
    })
  }
}