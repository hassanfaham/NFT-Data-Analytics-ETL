# from django.db import models
from djongo import models
class Blockchain(models.Model):
    name = models.CharField(max_length=255)
    id = models.IntegerField(primary_key=True)
 
class Collection(models.Model):
    name = models.CharField(max_length=255)
    volume = models.DecimalField(max_digits = 9,decimal_places = 4)
    floor_price = models.DecimalField(max_digits = 9,decimal_places = 4)
    Owners = models.IntegerField()
    items = models.IntegerField()
    blockchain = models.CharField(max_length=255)
    currency = models.CharField(max_length=255)
    id = models.IntegerField(primary_key=True)

class Nft(models.Model):
    name = models.CharField(max_length=455)
    collection = models.CharField(max_length=255)
    last_price = models.DecimalField(max_digits = 9,decimal_places = 4)
    currency = models.CharField(max_length=255)
    blockchain = models.CharField(max_length=255)
    id = models.IntegerField(primary_key=True)

