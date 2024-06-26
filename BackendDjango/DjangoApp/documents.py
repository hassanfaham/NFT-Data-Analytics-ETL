from django_elasticsearch_dsl import Document,Index

from DjangoApp.models import *

PUBLISHER_INDEX_block=Index('blockchain')

PUBLISHER_INDEX_block.settings(
    number_of_shards=1,
    number_of_replicas=1
)
PUBLISHER_INDEX_coll=Index('collection')

PUBLISHER_INDEX_coll.settings(
    number_of_shards=1,
    number_of_replicas=1
)
PUBLISHER_INDEX_nft=Index('nft')

PUBLISHER_INDEX_nft.settings(
    number_of_shards=1,
    number_of_replicas=1
)


@PUBLISHER_INDEX_block.doc_type
class BlockchainDocument(Document):

    class Django :
        model= Blockchain

        fields = [
            'name',
            'id'
        ]


@PUBLISHER_INDEX_coll.doc_type
class CollectionDocument(Document):

    class Django :
        model= Collection

        fields = [
            'name',
            'volume',
            'floor_price',
            'Owners',
            'items',
            'blockchain',
            'currency',
            'id'
        ]

@PUBLISHER_INDEX_nft.doc_type
class NftDocument(Document):

    class Django :
        model= Nft

        fields = [
            'name',
            'collection',
            'last_price',
            'currency',
            'blockchain',
            'id'
        ]

