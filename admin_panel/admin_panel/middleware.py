
class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        authorization_header = request.headers.get('Authorization')
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split('Bearer ')[1]
            user = authenticate(request, token=token)
            if user:
                request.user = user
        return self.get_response(request)
