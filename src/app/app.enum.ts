export enum EnumRegExp {
  EMAIL_REGEXP = '^(?=^.{6,25}$)(\\D)+(\\w)*((\\.(\\w)+)?)+@(\\D)+(\\w)*((\\.(\\D)+(\\w)*)+)?(\\.)[a-z]{2,4}$'
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

export enum ImagePlaceholder {
  IMAGE_NOT_FOUND = '../../../assets/server-data/images/image-not-found.png'
}
