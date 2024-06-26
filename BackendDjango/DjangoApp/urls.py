from django.urls import re_path as url
from DjangoApp import views 

urlpatterns = [ 
    url('search_blockchain/',views.BlockchainViewSet.as_view({'get':'list'})),
    url('search_collection/',views.CollectionViewSet.as_view({'get':'list'})),
    url('search_nft/',views.NftViewSet.as_view({'get':'list'})),
] 