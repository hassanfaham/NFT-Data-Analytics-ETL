from django_elasticsearch_dsl_drf.filter_backends import (
    CompoundSearchFilterBackend, DefaultOrderingFilterBackend,
    FilteringFilterBackend, OrderingFilterBackend, SearchFilterBackend)
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet

from DjangoApp.documents import *
from DjangoApp.serializers import *


class CollectionViewSet(DocumentViewSet):
    document = CollectionDocument
    serializer_class = CollectionDocumentSerializer
 
    filter_backends = [
        FilteringFilterBackend,
 
        CompoundSearchFilterBackend
    ]
 
    # Define search fields
    search_fields = (
        'name',
        'blockchain',
        'currency'

    )
    multi_match_search_fields = (  
        'name',
        'blockchain',
        'currency'
        )
    # Filter fields
    filter_fields = {
        'name':'name',
        'blockchain': 'blockchain',
        'currency': 'currency',
        'volume': 'volume',
        'floor_price': 'floor_price',
        'Owners': 'Owners',
        'items': 'items',
         
    }
 

class NftViewSet(DocumentViewSet):
    document = NftDocument
    serializer_class = NftDocumentSerializer
 
    # lookup_field = 'name'
    filter_backends = [
        FilteringFilterBackend,
    
        CompoundSearchFilterBackend
    ]
 
    # Define search fields
    search_fields = (
        'name',
        'blockchain',
        'currency',
        'collection'

    )
    multi_match_search_fields = (  
        'name',
        'blockchain',
        'currency',
        'collection'
        )
    # Filter fields
    filter_fields = {
            'name':'name',
            'collection':'collection',
            'last_price':'last_price',
            'currency':'currency',
            'blockchain':'blockchain',
            'id':'id'
         
    }
 


class BlockchainViewSet(DocumentViewSet):
    document = BlockchainDocument
    serializer_class = BlockchainDocumentSerializer
 
    # lookup_field = 'name'
    filter_backends = [
        FilteringFilterBackend,
     
        CompoundSearchFilterBackend
    ]
 
    # Define search fields
    search_fields = (
        'name',


    )
    multi_match_search_fields = (  
        'name',

        )
    # Filter fields
    filter_fields = {
        'name':'name',
        'id': 'id',

         
    }
 


