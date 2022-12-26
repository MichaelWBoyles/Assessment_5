from django.db import models
from django.contrib.auth.models import (AbstractUser)

# Create your models here.
class AppUser(AbstractUser):
    """
    user account
    """
    email = models.EmailField(
        
        max_length=255,
        unique=True,
    )

    # A user account must be active to log in, etc.
    is_active =  models.BooleanField(
       default=False,
       help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

