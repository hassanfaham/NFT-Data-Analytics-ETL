from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from DjangoApp.documents import *
from DjangoApp.models import *
 

class BlockchainDocumentSerializer(DocumentSerializer):
    class Meta:
        model=Blockchain
        document = BlockchainDocument
        fields = (
            'name',
            'id'
        )

        def get_location(self,obj):
            try:
                return obj.location.to_dict()
            except:
                return{}

class CollectionDocumentSerializer(DocumentSerializer):
    class Meta:
        model=Collection
        document = CollectionDocument
        fields = (
            'name',
            'volume',
            'floor_price',
            'Owners',
            'items',
            'blockchain',
            'currency',
            'id'
        )

        def get_location(self,obj):
            try:
                return obj.location.to_dict()
            except:
                return{}


class NftDocumentSerializer(DocumentSerializer):
    class Meta:
        model=Nft
        document = NftDocument
        fields = (
            'name',
            'collection',
            'last_price',
            'currency',
            'blockchain',
            'id'
        )

        def get_location(self,obj):
            try:
                return obj.location.to_dict()
            except:
                return{}