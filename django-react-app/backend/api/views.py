from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
import pandas as pd
from rest_framework.parsers import MultiPartParser, FormParser



class UserRegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        print(username,password)
        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)

class UploadExcel(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        print("Request received")
        
        # Get the uploaded file
        file_obj = request.FILES.get('file')
        print(f"File received: {file_obj}")

        # Check if a file is uploaded
        if not file_obj:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate file type
        if not file_obj.name.endswith(('.xlsx', '.xls')):
            return Response({"error": "Unsupported file type. Please upload an Excel file."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            # Attempt to read the Excel file
            data = pd.read_excel(file_obj)
            print("Excel file read successfully")

            # Initialize error tracking
            errors = []
            for index, row in data.iterrows():
                for col in data.columns:
                    if pd.isnull(row[col]) or row[col] == 0:
                        errors.append({
                            "row": index + 1,
                            "column": col,
                            "value": row[col],
                            "error": "Value is null or zero"
                        })

            # Prepare the response data
            response_data = {
                "data": data.to_dict(orient="records"),  # Convert DataFrame to JSON
                "errors": errors
            }

            # Return the response
            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error occurred: {e}")
            return Response({"error": f"Failed to process file: {str(e)}"}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
