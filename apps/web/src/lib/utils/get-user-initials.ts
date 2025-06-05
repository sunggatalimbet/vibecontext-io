interface GetUserInitialsParams {
  fullName: string | undefined
  email: string | undefined
}

export const getUserInitials = ({ fullName, email }: GetUserInitialsParams) => {
  if (!fullName && !email) return 'U'

  if (fullName) {
    const nameParts = fullName.split(' ')
    const initials = nameParts
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
    return initials
  }

  if (email) {
    return email.charAt(0).toUpperCase()
  }
}
