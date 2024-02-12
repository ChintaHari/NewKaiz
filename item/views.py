from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from item.models import Item
from item.serializers import ItemSerializer
from .serializers import PasswordResetSerializer
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_decode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from item.models import Item
from item.serializers import ItemSerializer
from .serializers import PasswordResetSerializer
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _
from django.utils.encoding import force_str
import base64
from django.utils.encoding import force_bytes



class UserCreate(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("Password reset e-mail has been sent.")}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class PasswordResetConfirmView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         try:
#             uid = urlsafe_base64_decode(request.data.get('uid')).decode()
#             user = User.objects.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             user = None

#         if user is not None and default_token_generator.check_token(user, request.data.get('token')):
#             user.set_password(request.data.get('password'))
#             user.save()
#             return Response({'detail': 'Password has been reset.'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'detail': 'Invalid token or user ID'}, status=status.HTTP_400_BAD_REQUEST)
    

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Extract token, uid, and new password from the request
        print('hiiiii')
        token = request.data.get("token")
        uidb64 = request.data.get("uid")
        print('encode: ',urlsafe_base64_encode(force_bytes(1)))
        encoded_value = urlsafe_base64_encode(force_bytes(1))
        uid_decoded = force_str(urlsafe_base64_decode(uidb64))
        print('decoded: ',uid_decoded)
        #print(int.from_bytes(uid_decoded, byteorder='big'))
        # print(base64.urlsafe_b64decode(uidb64))
        new_password = request.data.get("new_password")

        print(f"UID: {uidb64}, Token: {token}, New Passworddd: {new_password}")

        try:
            # uid = force_str(urlsafe_base64_decode(uidb64).decode())
            # uid = base64.urlsafe_b64decode(uidb64)
            print('Entered try')
            user = User.objects.get(pk=uid_decoded)
            print(user)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
            # print(urlsafe_base64_decode(uidb64).decode())
            print("User not found")

        if user is not None: #and default_token_generator.check_token(user, token):
            print("Token is valid")
            user.set_password(new_password)
            user.save()
            return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid token or user ID"}, status=status.HTTP_400_BAD_REQUEST)    

class ItemList(APIView):
    def get_queryset(self):
        queryset = Item.objects.all()
        print("Filter")
        stock_status = self.request.query_params.get('stock_status')
        if stock_status:
            queryset = queryset.filter(stock_status=stock_status)
        # You can add more filtering logic based on other request parameters as needed
        return queryset

    def get(self, request):
        print("Get")
        queryset = self.get_queryset()
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        item_id = request.data.get('id')
        try:
            item = Item.objects.get(pk=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        item_id = request.data.get('id')
        try:
            item = Item.objects.get(pk=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def dummy_password_reset_confirm(request, uidb64, token):
    # This view will not be used since the frontend handles password reset confirmation.
    return HttpResponse('This page does not exist.', status=404)
