export default function ({ store }) {
  if (!store.state.auth.user && localStorage.getItem('token')) {
    return store.dispatch('auth/authMe');
  }
}