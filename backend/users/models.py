from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100, null=True)
    password = models.CharField(max_length=30, null=True)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True , null=True)

    
    class Meta:
        ordering = ["-score", "username"]

    
    def __str__(self):
        return self.username