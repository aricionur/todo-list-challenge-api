import jwt from "jsonwebtoken"

export const checkAuth = auth => {
  const { authHeader } = auth

  if (authHeader) {
    const rawToken = authHeader.split("Bearer")[1]
    const token = rawToken && rawToken.trim()
    if (token) {
      try {
        const user = jwt.verify(token, "THE_SECRET_KEY")
        return user
      } catch (error) {
        throw new Error("Invalid/Expired token")
      }
    }

    throw new Error("Authentication token be 'Bearer [token]'")
  }

  throw new Error("Authorization header must be provided.")
}

export const authMiddleware = next => (parent, args, context) => {
  context.user = checkAuth(context.auth)

  return next(parent, args, context)
}
