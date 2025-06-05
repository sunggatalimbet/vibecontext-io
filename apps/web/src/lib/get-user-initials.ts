interface GetUserInitialsParams {
  fullName: string
  email: string
}

export const getUserInitials = ({ fullName, email }: GetUserInitialsParams) => {
  if (fullName) {
    const nameParts = fullName.split(' ')
    const initials = nameParts
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
    return initials
  }

  return email.charAt(0).toUpperCase() || 'U'
}
