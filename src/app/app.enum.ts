export enum EnumRegExp {
  EMAIL_REGEXP = '^(?=^.{6,25}$)(\\D)+(\\w)*((\\.(\\w)+)?)+@(\\D)+(\\w)*((\\.(\\D)+(\\w)*)+)?(\\.)[a-z]{2,4}$'
}

export enum ProductFormat {
  full = 'full',
  short = 'short'
}

export enum URLs {
  products = 'https://gaboo-project-server.herokuapp.com/products',
  images = 'https://gaboo-project-server.herokuapp.com/images',
  productImage = 'https://res.cloudinary.com/dr8z1kafr/image/upload/v1572252362/Interns/gaboo/products'
}

export enum ImagePlaceholder {
  IMAGE_NOT_FOUND = '../../../assets/img/image-not-found.png'
}
