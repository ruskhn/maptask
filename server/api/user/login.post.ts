export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  if (email === 'example@gmail.com' && password === 'administrator') {
    return {
      token: 'anytoken'
    }
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'invalid login or pass'
    })
  }
});