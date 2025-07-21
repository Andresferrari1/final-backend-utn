export const validatePassword = (password) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/g
  return regex.test(password)
}
