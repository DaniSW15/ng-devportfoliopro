import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = localStorage.getItem('devportfolio_api_key');
  console.log('API Key Interceptor: Retrieved API key from localStorage:', apiKey); // Debugging log
  if (apiKey) {
    const clonedReq = req.clone({
      setHeaders: {
        'x-api-key': apiKey
      }
    });
    console.log('API Key Interceptor: Added API key to request headers:', clonedReq); // Debugging log
    return next(clonedReq);
  }
  return next(req);
};
