from rest_framework import serializers
from .models import Item
from django.contrib.auth.models import User


from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # More custom claims can be added here

        return token
    
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # Create PasswordResetForm with the provided email
        self.reset_form = PasswordResetForm(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_("Error"))

        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_("Invalid email"))

        return value

    def save(self):
        request = self.context.get('request')
        # Set some options to pass to the password reset form.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'email_template_name': 'password_reset_email.html',
            'request': request,
        }
        print('request', request)
        self.reset_form.save(**opts)

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'sku', 'name', 'category', 'tags', 'stock_status', 'available_stock']
