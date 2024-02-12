# item/utils.py

from rest_framework_jwt.settings import api_settings

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            # Add any additional user information you want to include in the token response
        }
    }
