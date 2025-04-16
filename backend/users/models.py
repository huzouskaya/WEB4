from django.db import models

class UserManager(models.Manager):
    def add_user(self, email, username):
        user = self.create(email=email, username=username)
        return user


class User(models.Model):
    username = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=300, null=True)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True , null=True)

    
    class Meta:
        ordering = ["-score", "username"]

    
    def __str__(self):
        return self.username
    
    @classmethod
    def create(cls, email, username):
        user = cls(email=email, username=username)
        return user
    
    objects = UserManager()