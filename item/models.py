from django.db import models
from jsonfield import JSONField

# class Category(models.Model):
#     name = models.CharField(max_length=255)

# class Tag(models.Model):
#     name = models.CharField(max_length=255)

class Item(models.Model):
    sku = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    tags = JSONField()
    stock_status = models.BooleanField() # True for in stock, False for out of stock
    available_stock = models.IntegerField()

    def __str__(self):
        return self.name
