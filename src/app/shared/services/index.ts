import { HttpService } from './http.service';
import { LocalStorageService } from '../services/web-storage/local-storage.service';
import { ProductService } from './product.service';
import { ScrollService } from './scroll.service';
import { ReviewService } from './review.service';
import { AuthService } from './auth.service';
import { ErrorsHandler } from './errors.handler';
import { LoaderInterceptor } from './loader.interceptor';
import { ModalService } from './modal-service';
import { ProductResolver } from './product.resolver';

export {
  HttpService,
  LocalStorageService,
  ProductService,
  ScrollService,
  ReviewService,
  AuthService,
  ErrorsHandler,
  LoaderInterceptor,
  ModalService,
  ProductResolver
};
