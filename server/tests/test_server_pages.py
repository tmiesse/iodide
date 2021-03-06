import json
import re

import pytest
from django.urls import reverse

from server.base.models import User
from server.notebooks.models import (Notebook,
                                     NotebookRevision)


def _get_page_data(page_content_str):
    m = re.search(r'<script id="pageData" type="application/json">(\{.*\})</script>',
                  str(page_content_str))
    return json.loads(m.group(1))


def test_index_view(client, two_test_notebooks):
    resp = client.get(reverse('index'))
    assert resp.status_code == 200
    assert set(_get_page_data(str(resp.content)).keys()) == set(['userInfo',
                                                                 'notebookList'])


@pytest.mark.parametrize("logged_in", [True, False])
def test_index_view_with_gravatar(client, fake_user, logged_in):
    if logged_in:
        client.force_login(fake_user)
    resp = client.get(reverse('index'))
    assert resp.status_code == 200
    expected_user_info = {
        'name': fake_user.username,
        'avatar': 'http://www.gravatar.com/avatar/eaee5961bc7ad96538a4933cb069fda9?d=identicon'
    } if logged_in else {}
    assert _get_page_data(str(resp.content))['userInfo'] == expected_user_info


@pytest.mark.parametrize("username", ['testuser', 'test-user', 'testuser@foo.com'])
def test_user_view_with_different_names(transactional_db, client, username):
    test_user = User.objects.create(
        username=username,
        email="user@foo.com",
        password="123")
    notebook = Notebook.objects.create(owner=test_user,
                                       title='Fake notebook')
    NotebookRevision.objects.create(notebook=notebook,
                                    title="First revision",
                                    content="*fake notebook content*")
    resp = client.get(reverse('user', kwargs={'name': test_user.username}))
    assert resp.status_code == 200
    assert set(_get_page_data(str(resp.content)).keys()) == set(
        ['userInfo', 'notebookList', 'thisUser'])
