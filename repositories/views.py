from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime, timedelta
from rest_framework import generics
from rest_framework import status
from django.conf import settings
from django.db.models import Q
import requests

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer
from .pagination import DefaultPagination


class CommitListView(generics.ListAPIView):
    serializer_class = CommitSerializer
    pagination_class = DefaultPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Commit.objects.all()
        repository_name = self.request.query_params.get('repository')
        author = self.request.query_params.get('author')

        if repository_name:
            queryset = queryset.filter(repository__name__icontains=repository_name)
        if author:
            queryset = queryset.filter(Q(author__icontains=author))

        return queryset

class RepositoryCreateView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        repositories = Repository.objects.all()
        serializer = RepositorySerializer(repositories, many=True)
        return Response(serializer.data)


    def post(self, request):
        user = request.data['user']
        repository_name = request.data['repository']
        url = settings.GITHUB_API_BASE_URL + '/repos/' + user + '/' + repository_name
        headers = settings.GITHUB_API_BASE_HEADER

        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise ValidationError('Repository not found')

        data = {'name': repository_name}
        serializer = RepositorySerializer(data=data)
        serializer.is_valid(raise_exception=True)
        repository = serializer.save()

        self.create_commits(user, repository)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def create_commits(self, user, repository, page=1):
        current_date = datetime.now().isoformat()
        last_month_date = (datetime.now() - timedelta(days=30)).isoformat()
        url = settings.GITHUB_API_BASE_URL + '/repos/' + user + '/' + repository.name + '/commits'
        headers = settings.GITHUB_API_BASE_HEADER
        params = {
            'per_page': 100,
            'page': page,
            'since': last_month_date,
            'until': current_date,
        }

        response = requests.get(
            url,
            headers=headers,
            params=params
        )

        if response.status_code != 200:
            raise Exception('Error retrieving commits')

        commits = response.json()

        if len(commits) == 0:
            return True

        for item in commits:
            commit = Commit(
                message=item['commit']['message'],
                sha=item['sha'],
                author=item['commit']['author']['name'],
                url=item['url'],
                date=datetime.fromisoformat(item['commit']['committer']['date']),
                avatar=item['author']['avatar_url'],
                repository=repository
            )
            commit.save()

        page += 1
        self.create_commits(user, repository, page)
