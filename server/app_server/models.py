from django.db import models
from django.contrib.auth.models import (AbstractUser)
import random

# Create your models here.
class AppUser(AbstractUser):
    """
    user account
    """
    email = models.EmailField(
        
        max_length=255,
        unique=True,
    )

    wealth = models.PositiveBigIntegerField()
    picture = models.PositiveSmallIntegerField()
    # random.randint(1, 826)

    # A user account must be active to log in, etc.
    is_active =  models.BooleanField(
       default=True,
       help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

