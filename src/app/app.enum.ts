export enum EnumRegExp {
  EMAIL_REGEXP = '^(?=^.{6,25}$)(\\D)+(\\w)*((\\.(\\w)+)?)+@(\\D)+(\\w)*((\\.(\\D)+(\\w)*)+)?(\\.)[a-z]{2,4}$',
  PASSWORD_REGEXP = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
}

export enum ProductFormat {
  full = 'full',
  short = 'short'
}

export enum NotificationType {
  success = 'success',
  warning = 'warning',
  error =  'error',
  info = 'info'
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}
