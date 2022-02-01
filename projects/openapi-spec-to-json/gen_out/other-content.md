MongoDB Realm provides an API for programmatically performing
administrative tasks outside of the Realm UI. This includes tasks such
as modifying authentication providers, creating rules, and defining
functions. Client applications should not use the admin API. Instead,
use one of the Client SDKs for tasks like authenticating users, calling
functions, and interacting with services.

## API Authentication

Every request to the Realm Admin API must include a valid and current
authorization token from the MongoDB Cloud API as a bearer token in the
`Authorization` header. You will need a valid `programmatic API key </configure-api-access#programmatic-api-keys>` for MongoDB Atlas to
get a token.

Once you have an API key pair, call the authentication endpoint:

```shell
curl --request POST \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --data '{"username": "<Public API Key>", "apiKey": "<Private API Key>"}' \
  https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login
```

If authentication succeeds, MongoDB Realm returns an access token as
part of the JSON response document:

```json
{
  "access_token": "<access_token>",
  "refresh_token": "<refresh_token>",
  "user_id": "<user_id>",
  "device_id": "<device_id>"
}
```

The `access_token` represents a limited-time authorization to interact
with the Admin API. To authenticate a request, include the token in a
[Bearer token](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
`Authorization` header.

```http
Authorization: Bearer <access_token>
```

## Project & Application IDs

**Note**: The terms _Project ID_ and _Group ID_ are interchangeable.

Realm APIs frequently require two parameters: your Atlas _Project/Group
ID_, and your Realm _Application ID_.

### Project ID

You can find your Project ID from your MongoDB Atlas Dashboard. [Learn how to find a Project ID](/realm/get-started/find-your-project-or-app-id#std-label-find-your-project-id).

### Application ID

To find an Application ID, make a request to the Realm `GET /groups/{groupid}/apps`
API endpoint.

This request has the following format, referencing the `access_token`
and the Group ID:

```sh
curl --request GET \
  --header 'Authorization: Bearer <access_token>' \
  https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps
```

This will return a list of objects describing each Realm app in the
provided group. For Admin API requests, your Application ID is the
ObjectId value in the `_id` field, _not_ the `client_app_id`.

```json
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
```

## Pagination with the Logging API

The Logging endpoint returns up to 100 log entries per page. If the
query matches more than 100 entries, the result will be
[paginated](https://en.wikipedia.org/wiki/Pagination). Such a result
will contain two pieces of information that you will need to request the
next page of entries for the same query: the `nextEndDate` and
`nextSkip` fields.

Paginated results always contain the `nextEndDate` field. A paginated
result will also contain the `nextSkip` field if the timestamp of the
first entry on the next page is identical to the timestamp of the last
entry on the current page.

To request the first page of up to 100 log entries, use the endpoint as
usual:

```sh
curl --request GET \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/logs'
```

To request the next page of up to 100 log entries, pass the values of
`nextEndDate` and `nextSkip` as the `end_date` and `skip` parameters,
respectively:

```sh
curl --request GET \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/logs?end_date={nextEndDate of previous response}&skip={nextSkip of previous response}'
```

Repeat this step to get more pages until the response does not have a
`nextEndDate` field. This signifies that you have reached the last page.

For more information, see `GET /groups/{groupId}/apps/{appId}/logs`.

## Draft and Deploy a Group of Changes

You can [deploy](/realm/manage-apps/deploy#std-label-application-deployment) a
group of application changes together by creating and deploying a draft.
To create and deploy a set of draft changes:

### 1. Create a New Draft

A draft represents a group of application changes that you can deploy or
discard as a single unit. To create a draft, send a `POST` request to
the drafts endpoint:

```shell
curl --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/drafts'
```

**See Also**: [API Deployment Endpoints](undefinedapplication-deployment-apis)

#### One Draft Per User

Each user can only create a single draft at a time, either through the
UI or the Admin API. If you already have an existing draft, you can
discard the changes associated with it by sending a `DELETE` request to
the draft's endpoint:

```shell
curl --request DELETE \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/drafts/{draftId}'
```

### 2. Make Changes to Your Application

Once you've created a draft, make all of the changes that you want to
include in the draft. Realm adds any application changes that you make
to the draft so that you can deploy them together.

### 3. Deploy the Draft

After you've made all the changes that you want to include in the
deployment, deploy the draft by sending a `POST` request to that draft's
deployment endpoint:

```shell
curl --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access_token>' \
  'https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/drafts/{draftId}/deployment'
```

#### Draft Conflicts

If you deploy changes through the API but have conflicting changes in a
draft in the UI, your UI draft will become invalid and you will not be
able to deploy it. You can download your UI draft by reviewing the draft
in the `Deployment` page. You can use the download to deploy your
changes in the `realm-cli` or as a reference as you reapply changes in
the UI.

</div>

## Asset Metadata Document Example

Asset metadata documents describe hosted asset files.

```json
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
```
