interface GetUserInitialsParams {
  fullName: string | undefined
  email: string | undefined
}

export const getUserInitials = ({
  fullName,
  email,
}: GetUserInitialsParams): string => {
  const trimmedFullname = fullName?.trim()
  const trimmedEmail = email?.trim()

  if (!trimmedFullname && !trimmedEmail) return 'U'

  if (trimmedFullname) {
    const fullNameParts = trimmedFullname.split(' ')
    const initials = fullNameParts
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
    return initials
  }

  if (trimmedEmail) {
    return trimmedEmail.charAt(0).toUpperCase()
  }

  return 'U'
}
