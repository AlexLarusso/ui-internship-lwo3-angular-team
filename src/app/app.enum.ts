export enum EnumRegExp {
  EMAIL_REGEXP = '^(?=^.{6,25}$)(\\D)+(\\w)*((\\.(\\w)+)?)+@(\\D)+(\\w)*((\\.(\\D)+(\\w)*)+)?(\\.)[a-z]{2,4}$',
  PASSWORD_REGEXP = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
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
  IMAGE_NOT_FOUND = 'src/assets/img/image-not-found.png'
}

export enum ToastrMessage {
  error = 'Error',
  internetError = 'No internet connection!',
  internalError = 'An internal error',
  emptyWishList = 'Your Wishlist is currently empty',
  productAddedToCart = 'Product has been added to card',
  paymentSeccessfull = 'Payment successful!',
  paymentFaild = 'Something went wrong, please try again',
  filterFail = 'No products found for these requirements'
}
