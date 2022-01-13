import { handleErrors } from '@src/utils/fetchHelper';

export const signup = (e, params, errorCB, history) => {
  if (e) { e.preventDefault(); }
  console.log(JSON.stringify({
    user: params
  }))

  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      user: params
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleErrors)
  .then(response => {
    console.log(params)
    login(e, params, null, history)
  })
  .catch(error => {
    if (errorCB) errorCB(error)
  })
}
export const login = (e, params, errorCB, history) => {
  if (e) { e.preventDefault(); }

  console.log(params.username)
  fetch('api/sessions', {
    method: 'POST',
    body: JSON.stringify({
      user: params
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(handleErrors)
  .then(response => {
    history.push("/tweets")
  })
  .catch(error => {
    if (errorCB) errorCB(error);
  })
}
