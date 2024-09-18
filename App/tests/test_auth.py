from urllib.parse import urljoin

from django.contrib.auth.hashers import check_password
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token


class TestAuth(StaticLiveServerTestCase):
  def singup(self, data) -> User:
    self.client.post(urljoin(self.live_server_url, 'singup'), data=data)
    user = User.objects.filter(username=data['username']).first()
    self.assertIsNotNone(user)
    db_pass = user.password
    self.assertEqual(data['username'], user.username)
    self.assertTrue(check_password(data['password'], db_pass))
    return user

  def test_singup(self):
    data = {
      'username': 'test',
      'password': 'test_pass'
    }
    self.singup(data)

  def test_login(self):
    data = {
      'username': 'test_login',
      'password': 'test_login_pass'
    }
    new_user = self.singup(data)
    response = self.client.post(urljoin(self.live_server_url, 'login'), data=data)
    self.assertEqual(response.status_code, 200)
    res_json = response.json()
    self.assertIn('token', res_json)
    self.assertEqual(res_json['token'], Token.objects.get(user=new_user).key)

    headers = {
      'Authorization': f'Token {res_json["token"]}',
      'Content-Type': 'application/json'
    }
    response = self.client.get(urljoin(self.live_server_url, 'test_token'), headers=headers)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.json(), 'passed!')
    # python manage.py test App.tests.test_auth.TestAuth.test_login
