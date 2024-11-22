from django.contrib import admin
from django.urls import path, include
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



from django.urls import path
from api import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/user/register/', views.UserRegisterView.as_view(), name='user_register'),
    path('api/user/login/', views.UserLoginView.as_view(), name='user_login'),
    path('upload-file/',views.UploadExcel.as_view(),name="upload_excel"),
    path('upload-error/',views.UploadExcel.as_view(),name="upload_excel")
]
