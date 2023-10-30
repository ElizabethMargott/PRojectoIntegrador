# admin.py
from django.contrib import admin
from django.shortcuts import render
import requests
from .models import User, Note

admin.site.register(User)
admin.site.register(Note)

class MyAdminSite(admin.AdminSite):
    def index(self, request, extra_context=None):
        response = requests.get(
            'http://localhost:8080/api/v1/notes',
            headers={'Authorization': f'Bearer {request.user.jwt_token}'}
        )
        notes = response.json() if response.status_code == 200 else []
        extra_context = {'notes': notes}
        return render(request, 'admin/index.html', extra_context)

my_admin_site = MyAdminSite()
