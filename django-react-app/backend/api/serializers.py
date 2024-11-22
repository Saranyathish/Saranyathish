from rest_framework import serializers
from .models import UserRegister

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegister
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Optionally hash the password before saving
        user = UserRegister.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],  # You may hash the password here
        )
        return user
