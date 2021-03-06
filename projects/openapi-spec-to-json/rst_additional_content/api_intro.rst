.. _admin-api:

========================
Realm Administration API
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: twocols-rootonly

{+service+} provides an API for programmatically performing administrative
tasks outside of the {+ui+}. This includes tasks such as
modifying authentication providers, creating rules, and defining
functions. Client applications should not use the admin API. Instead,
use one of the Client SDKs for tasks like authenticating users,
calling functions, and interacting with services.

.. _realm-api-authentication:

API Authentication
------------------

Every request to the {+service-short+} Admin API must include a valid and current
authorization token from the MongoDB Cloud API as a bearer token in the
``Authorization`` header. You will need a valid :atlas:`programmatic API
key </configure-api-access#programmatic-api-keys>` for MongoDB Atlas to
get a token.

Once you have an API key pair, call the authentication endpoint:

.. code-block:: shell

   curl --request POST \
     --header 'Content-Type: application/json' \
     --header 'Accept: application/json' \
     --data '{"username": "<Public API Key>", "apiKey": "<Private API Key>"}' \
     https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login

If authentication succeeds, {+backend+} returns an access token as part of
the JSON response document:

.. code-block:: json
   :emphasize-lines: 2

   {
     "access_token": "<access_token>",
     "refresh_token": "<refresh_token>",
     "user_id": "<user_id>",
     "device_id": "<device_id>"
   }

The ``access_token`` represents a limited-time authorization to interact
with the Admin API. To authenticate a request, include the token in a
:mdn:`Bearer token <Web/HTTP/Authentication>` ``Authorization`` header.

.. code-block:: http

   Authorization: Bearer <access_token>

.. _realm-api-project-and-application-ids:

Project & Application IDs
-------------------------

.. note::

   The terms *Project ID* and *Group ID* are interchangeable.

{+service-short+} APIs frequently require two parameters: your |atlas|
*Project/Group ID*, and your {+service-short+} *Application ID*.

.. _realm-api-project-id:

Project ID
~~~~~~~~~~

You can find your Project ID from your {+atlas+} Dashboard.

.. seealso::

   :ref:`Find a Project ID <find-your-project-id>`


.. _realm-api-application-id:

Application ID
~~~~~~~~~~~~~~

To find an Application ID, make a request to the {+service-short+}
`GET /groups/{groupid}/apps <{+base-url+}{+admin-api-page+}get-/groups/{groupid}/apps>`_ API endpoint.

This request has the following format, referencing the ``access_token`` and the Group ID:

.. code-block:: sh

   curl --request GET \
     --header 'Authorization: Bearer <access_token>' \
     https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps

This will return a list of objects describing each {+app+} in the provided
group. For Admin API requests, your Application ID is the ObjectId value in the
``_id`` field, *not* the ``client_app_id``.

.. example::

   .. code-block:: json
      :emphasize-lines: 3
      
      [
        {
            "_id": "5997529e46224c6e42gb6dd9",
            "group_id": "57879f6cc4b32dbe440bb8c5",
            "domain_id": "5886619e46124e4c42fb5dd8",
            "client_app_id": "myapp-abcde",
            "name": "myapp",
            "location": "US-VA",
            "deployment_model": "GLOBAL",
            "last_used": 1615153544,
            "last_modified": 0,
            "product": "standard",
            "environment": ""
        }
      ]

Example
-------

.. _admin-api-pagination:

Pagination with the Logging API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Logging endpoint returns up to 100 log entries per page. If the
query matches more than 100 entries, the result will be :wikipedia:`paginated <Pagination>`.
Such a result will contain two pieces of information that you will need to request
the next page of entries for the same query: the ``nextEndDate`` and ``nextSkip`` fields.

Paginated results always contain the ``nextEndDate`` field. A paginated
result will also contain the ``nextSkip`` field if the timestamp of the
first entry on the next page is identical to the timestamp of the last
entry on the current page.

To request the first page of up to 100 log entries, use the endpoint as usual:

.. code-block:: sh

   curl --request GET \
     --header 'Authorization: Bearer <access_token>' \
     'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/logs'

To request the next page of up to 100 log entries, pass the values of ``nextEndDate``
and ``nextSkip`` as the ``end_date`` and ``skip`` parameters, respectively:

.. code-block:: sh

   curl --request GET \
     --header 'Authorization: Bearer <access_token>' \
     'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/logs?end_date={nextEndDate of previous response}&skip={nextSkip of previous response}'

Repeat this step to get more pages until the response does not have a ``nextEndDate`` field.
This signifies that you have reached the last page.

For more information, see `GET /groups/{groupId}/apps/{appId}/logs <{+base-url+}{+admin-api-page+}get-/groups/{groupId}/apps/{appId}/logs>`_.

.. _admin-api-draft-deploy:

Draft and Deploy a Group of Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can :ref:`deploy <application-deployment>` a group of application changes together
by creating and deploying a draft. To create and deploy a set of draft
changes:


## TODO: .. include:: /includes/steps/admin-api-deploy-a-draft.rst

.. _asset-metadata-document:

Asset Metadata Document Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Asset metadata documents describe hosted asset files.

.. code-block:: json
   
   {
      "path": "<Asset Resource Path>",
      "hash": "<Asset MD5 Checksum Hash>",
      "size": <File size in bytes>,
      "attrs": [
         {
            "name": "<Metadata Attribute Name>",
            "value": "<Metadata Attribute Value>",
         }
      ]
   }
