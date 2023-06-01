from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class LoginAPIViewTestCase(APITestCase):
    url = reverse('login')

    def test_view_shall_return_redirect_url_on_get_request(self):
        r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)

    def test_view_shall_return_bad_request_when_code_is_invalid(self):
        r = self.client.post(self.url, data={'code': 'ThisCodeIsFake'})
        self.assertEqual(r.status_code, status.HTTP_400_BAD_REQUEST)

