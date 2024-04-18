export default function ({ redirect }) {
  if (!window.localStorage.getItem('token')) {
    return redirect('/login')
  }
  return
}
