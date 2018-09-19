from django.urls import include, path
from .views import django_rest_auth_null, VerifyEmailView

urlpatterns = [
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('verify-email/', VerifyEmailView.as_view(), name='account_confirm_email'),  # Url for email link, which redirect to forntend url.
    path('verify-email-frontent/', VerifyEmailView.as_view(), name='account_confirm_email'),  # API endpoint for check whether email verification code is correct.
    path('rest-auth/registration/account-email-verification-sent/', django_rest_auth_null, name='account_email_verification_sent'),

]
