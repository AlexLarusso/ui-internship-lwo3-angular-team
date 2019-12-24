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
  productImage = 'https://res.cloudinary.com/dr8z1kafr/image/upload/v1572252362/Interns/gaboo/products',
  productVideo = 'https://res.cloudinary.com/dr8z1kafr/video/upload/v1572252362/Interns/gaboo/products/',
  limitCondition = '?limit=100',
  productReview = 'https://gaboo-project-server.herokuapp.com/reviews',
  authorization = 'https://gaboo-project-server.herokuapp.com'
}

export enum ImagePlaceholder {
  IMAGE_NOT_FOUND = '/assets/img/image-not-found.png'
}

export enum ToastrMessage {
  error = 'Error',
  internetError = 'No internet connection!',
  internalError = 'An internal error',
  emptyWishList = 'Your Wishlist is currently empty',
  productAddedToCart = 'Product has been added to card',
  filterFail = 'No products found for these requirements',
  paymentSuccessful = 'Payment successful!',
  paymentFailed = 'Something went wrong, please try again',
  invalidModal = 'modal must have an id',
  loginFailed = 'Incorrect email and/or password.',
  signUpFailed = 'That email is already in use.',
  accessDenied = 'To see cart page, login first',
  successfulFeedback = 'Your feedback has been sent successfully',
  incorrectFeedback = 'Please enter message or rate product',
  userNameError = 'Enter your name'
}
