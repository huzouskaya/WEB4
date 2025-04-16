from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
import json 

from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth import authenticate, login, logout
from .forms import CreateUserForm

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@ensure_csrf_cookie
@require_http_methods(['GET'])
def set_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})


@require_http_methods(['POST'])
def login_view(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        email = data['email']
        password = data['password']
        username = data['username']

    except json.JSONDecodeError:
        return JsonResponse(
            {'success': False, 'message': 'Invalid JSON'}, status=400
        )
    
    user = authenticate(request, username=username, email=email, password=password)

    if user:
        login(request, user)
        return JsonResponse({'success': True})
    return JsonResponse(
        {'success': False, 'message': 'Invalid credentials'}, status=401
    )


def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})


@require_http_methods(['GET'])
def user(request):
    if request.user.is_authenticated:
        return JsonResponse(
            {'username': request.user.username, 'email': request.user.email, 'password': request.user.password}
        )
    return JsonResponse(
        {'message': 'Not logged in'}, status=401
    )


@require_http_methods(['POST'])
def register(request):
    data = json.loads(request.body.decode('utf-8'))
    form = CreateUserForm(data)
    if form.is_valid():
        form.save()
        User.objects.add_user(data["email"], data["username"])
        return JsonResponse({'success': 'User registered successfully'}, status=201)
    else:
        errors = form.errors.as_json()
        return JsonResponse({'error': errors}, status=400)
    

@require_http_methods(['POST'])
def score(request):
    data = json.loads(request.body.decode('utf-8'))
    print("Raw body:", data)
    if request.user.is_authenticated:
        username = request.user.username
        user = User.objects.get(username=username)
        print("Data keys:", data.keys())
        user.score = user.score + data["score"]
        user.save()

        return JsonResponse({'success': 'Score updated successfully'}, status=201)

    return JsonResponse({'message': 'Not logged in'}, status=401)


@require_http_methods(['GET'])
def get_score(request):
    if request.user.is_authenticated:
        username = request.user.username
        user = User.objects.get(username=username)
        print("Raw body:", user.score)
        return JsonResponse(
            {'score': user.score}
        )
    
    return JsonResponse(
        {'message': 'Not logged in'}, status=401
    )
