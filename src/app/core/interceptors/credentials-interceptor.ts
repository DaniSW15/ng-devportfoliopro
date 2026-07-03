import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({ withCredentials: true }); 
  console.log('Intercepted request:', clonedReq);
  return next(clonedReq);
};
