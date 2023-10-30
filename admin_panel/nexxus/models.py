from django.db import models

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    avatar_filename = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True)
    modification_date = models.DateTimeField(auto_now=True)
    password = models.CharField(max_length=255)
    registration_date = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=5, choices=[('ADMIN', 'Admin'), ('USER', 'User')])
    username = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    def __str__(self):
        return self.username

class Note(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=255)
    creation_date = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255)
    modification_date = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    class Meta:
        db_table = 'notes'
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
    def __str__(self):
        return self.title