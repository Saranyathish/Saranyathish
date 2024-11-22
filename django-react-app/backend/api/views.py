from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import pandas as pd
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserRegisterSerializer
from .models import UserRegister

class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new user and return a success response
            user = serializer.save()
            return Response(
                {"message": "User registered successfully!", "user_id": user.id},
                status=status.HTTP_201_CREATED
            )

        # If data is invalid, return an error response
        return Response(
            {"message": "Registration failed", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        print(f"Email: {email}, Password: {password}")

        if not email or not password:
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if the email and password combination exists
        user = UserRegister.objects.filter(email=email, password=password).first()

        if user:
            return Response(
                {"success": "Login successful", "username": user.username},
                status=status.HTTP_202_ACCEPTED
            )
        else:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

class UploadExcel(APIView):
    # print("hello")
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print("post Successfully")
        file_obj = request.FILES.get('file')

        # Check if a file is uploaded
        if not file_obj:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Read the Excel file
            data = pd.read_excel(file_obj)

            # Validate for null or zero values in any column
            self.errors = []
            for index, row in data.iterrows():
                # print(index,row)
                for col in data.columns:
                    # print(col)
                    if pd.isnull(row[col]) or row[col] == 0:
                        self.errors.append({
                            "row": index + 1,
                            "column": col,
                            "value": row[col],
                            "error": "Value is null or zero"
                        })

            # Return the data and validation errors
            response = {
                "data": data.to_dict(orient="records"),  # Convert data to JSON
                "errors": self.errors
            }
            # print(errors)

            return Response(response, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        # Example data to send to React
        data = {
            "message": "Test message from Django",
        }
        return Response(data, status=status.HTTP_200_OK)



